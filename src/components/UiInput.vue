<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import { computed, useSlots } from 'vue'

type InputType = 'text' | 'number' | 'password' | 'email' | 'tel'
interface Props {
  modelValue?: any
  type: InputType
  label?: string
  name: string
  srOnly?: boolean
  errors?: string
  hideErrorBelow?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'text',
  label: '',
  name: '',
  srOnly: false,
  errors: undefined,
  hideErrorBelow: false,
  required: false,
})

const emit = defineEmits(['update:modelValue'])

const slots = useSlots()
const disabledClass = 'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
const errorMessages = computed(() => (props.errors ? props.errors.split(', ') : []))
const iconExists = computed(() => !!slots.icon)

function updateValue(event: any) {
  const value = event?.target?.value
  emit('update:modelValue', props.type === 'number' ? +value : value)
}
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="mb-1 block text-sm font-medium text-gray-700"
      :class="{ 'sr-only': srOnly }"
    >{{ label }} <span v-if="required" class="text-red-500 ml-0.5">*</span></label>
    <div class="relative">
      <input
        :id="name"
        :value="modelValue"
        :type="type"
        :name="name"
        class="peer relative block w-full appearance-none rounded border px-3 py-2 sm:text-sm" :class="[
          { 'pl-10': iconExists },
          disabledClass,
          errors
            ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
            : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500',
        ]"
        v-bind="$attrs"
        @input="updateValue"
      >
      <div
        v-if="iconExists"
        class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3"
      >
        <slot name="icon" />
      </div>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        :class="errors && hideErrorBelow ? 'visible' : 'invisible'"
      >
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <template v-if="errors && !hideErrorBelow">
      <p v-for="error in errorMessages" :key="error" class="mt-1 text-sm text-red-600">
        {{ error }}
      </p>
    </template>
    <slot name="disclaimer" />
  </div>
</template>
