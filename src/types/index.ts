import type { FunctionalComponent } from 'vue'

export interface NavigationItem {
  name: string
  link: string
  icon: FunctionalComponent<any>
}
