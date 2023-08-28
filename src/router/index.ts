import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/Home.vue'
import ContactsPage from '../pages/Contacts.vue'
import ContactDetails from '../pages/ContactDetails.vue'
import ContactAddPage from '../pages/ContactAdd.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ContactsPage,
  },
  {
    path: '/contacts/new',
    name: 'Add new contact',
    component: ContactAddPage,
  },
  {
    path: '/contacts/:id',
    name: 'Contact details',
    component: ContactDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
