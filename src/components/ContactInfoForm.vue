<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import Multiselect from 'vue-multiselect'
import { ref } from 'vue'
import type { Contact, ContactPayload } from '../types/contacts'
import { useContactStore } from '../store/contacts'
import UiInput from './UiInput.vue'

const props = defineProps<{
  contact?: Contact
}>()
const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'submit', payload: ContactPayload): void
}>()

const schema = toTypedSchema(
  z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty().email(),
    phone: z.string().nonempty().min(17),
  }),
)

const { errors, defineInputBinds, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.contact ?? null,
})

const { allTags } = useContactStore()
const contactTags = ref(allTags)
const tags = ref<string[]>(props.contact ? [...props.contact.tags] : [])
const name = defineInputBinds('name')
const email = defineInputBinds('email')
const phone = defineInputBinds('phone')

function addTag(tag: string) {
  contactTags.value.push(tag)
  tags.value.push(tag)
}

const onSubmit = handleSubmit((values) => {
  emit('submit', { ...values, phone: values.phone.replace(/[^\d]/g, ''), tags: tags.value })
})

function cancel() {
  emit('cancel')
  resetForm()
}
</script>

<template>
  <form class="mt-6 border-t border-gray-100" @submit.prevent="onSubmit">
    <div class="divide-y divide-gray-100">
      <div class="py-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Full name</label>
        <div class="mt-2 sm:col-span-2 sm:mt-0">
          <UiInput
            v-bind="name" type="text"
            name="name" autocomplete="name" :errors="errors.name" required
          />
        </div>
      </div>
      <div class="py-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Phone</label>
        <div class="mt-2 sm:col-span-2 sm:mt-0">
          <UiInput
            v-maska v-bind="phone" data-maska="+998 ## ###-##-##" type="tel"
            name="phone" placeholder="998" autocomplete="tel" :errors="errors.phone" required
          />
        </div>
      </div>
      <div class="py-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Email</label>
        <div class="mt-2 sm:col-span-2 sm:mt-0">
          <UiInput
            v-bind="email" type="text"
            name="email" autocomplete="email" :errors="errors.email" required
          />
        </div>
      </div>
      <div class="py-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label for="tags" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Tags</label>
        <div class="mt-2 sm:col-span-2 sm:mt-0">
          <Multiselect v-model="tags" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" name="tags" :options="contactTags" :multiple="true" :taggable="true" @tag="addTag" />
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="cancel">
        Cancel
      </button>
      <button type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
  </form>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
