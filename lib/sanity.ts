import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'cewogz6l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export const previewClient = createClient({
  projectId: 'cewogz6l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

