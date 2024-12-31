import { redirect } from 'next/navigation'

import { allNotes } from 'src/content/notes'

export const dynamicParams = false

export default function Page() {
  const latestNote = allNotes.at(-1)!
  const latestNoteDate = new Date(latestNote.frontmatter.date)
  const [yyyy, mm] = [
    latestNoteDate.getFullYear(),
    latestNoteDate.getMonth() + 1,
  ]
  redirect(`/notes/${yyyy}-${mm}`)
}
