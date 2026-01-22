import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const draft = await draftMode(); // Await the promise
  draft.enable();     

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  redirect(`/blog/${slug}`)
}
