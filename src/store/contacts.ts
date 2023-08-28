import { defineStore } from 'pinia'
import type { Contact, ContactPayload } from '../types/contacts'

interface State {
  contacts: Contact[]
}

export const useContactStore = defineStore('contact', {
  state: (): State => ({
    contacts: [
      {
        id: 1,
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        phone: '998971563637',
        tags: [],
      },
      {
        id: 2,
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        phone: '998971563637',
        tags: [],
      },
      {
        id: 3,
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        phone: '998971563637',
        tags: [],
      },
      {
        id: 4,
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        phone: '998971563637',
        tags: [],
      },
      {
        id: 5,
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        phone: '998971563637',
        tags: [],
      },
      {
        id: 6,
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        phone: '998971563637',
        tags: [],
      },
    ],
  }),
  getters: {
    allTags: (state) => {
      const tags = state.contacts.reduce((acc, curr) => [...acc, ...curr.tags], [] as string[])
      return [...new Set(tags)]
    },
  },
  actions: {
    addContact(contact: ContactPayload) {
      const id = Math.max(...this.contacts.map(item => item.id)) + 1
      this.contacts = [...this.contacts, { ...contact, id }]
    },
    editContact(contact: Contact) {
      this.contacts = this.contacts.map(item => item.id === contact.id ? contact : item)
    },
    deleteContact(id: number) {
      this.contacts = this.contacts.filter(item => item.id !== id)
    },
  },
})
