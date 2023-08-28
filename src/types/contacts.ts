export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  tags: string[]
}

export type ContactPayload = Omit<Contact, 'id'>
