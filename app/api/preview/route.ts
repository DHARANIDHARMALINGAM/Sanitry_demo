import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  draftMode().enable()

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  redirect(`/blog/${slug}`)
}
