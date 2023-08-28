<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  HomeIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'
import AppDesktopSidebar from '../components/AppDesktopSidebar.vue'
import AppMobileSidebar from '../components/AppMobileSidebar.vue'
import AppMobileTopbar from '../components/AppMobileTopbar.vue'

const navigation = [
  { name: 'Dashboard', link: '/', icon: HomeIcon },
  { name: 'Contacts', link: '/contacts', icon: UsersIcon },
  // { name: 'Projects', link: '/projects', icon: FolderIcon },
  // { name: 'Calendar', link: '/calendar', icon: CalendarIcon },
  // { name: 'Documents', link: '/documents', icon: DocumentDuplicateIcon },
  // { name: 'Reports', link: '/reports', icon: ChartPieIcon },
]

const sidebarOpen = ref(false)
const route = useRoute()

watch(() => route.name, () => {
  sidebarOpen.value = false
})

function openSidebar() {
  sidebarOpen.value = true
}
</script>

<template>
  <div class="h-full">
    <AppMobileSidebar :is-sidebar-open="sidebarOpen" :navigation="navigation" @close-sidebar="sidebarOpen = false" />
    <AppDesktopSidebar class="hidden lg:flex" :navigation="navigation" />

    <slot name="topbar" :is-sidebar-open="sidebarOpen" :open-sidebar="openSidebar">
      <AppMobileTopbar :is-sidebar-open="sidebarOpen" @open-sidebar="openSidebar()">
        <slot name="topbar-title">
          {{ route.name }}
        </slot>

        <template #actions>
          <slot name="topbar-actions" />
        </template>
      </AppMobileTopbar>
    </slot>

    <slot />
  </div>
</template>

<style scoped>
</style>
