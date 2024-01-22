import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { analize } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  const entry = `I'm going  to give you a journal entry to analyze for a few things.
  I want you to tell me what the subject of the entry is, what the mood of the entry is,
   and whether or not the entry is negative and a color representing the mood of the entry.
  You need to respond back with formated JSON that looks like this:
   { "mood": "", "subject": "", "color": "", "negative": ""}.

  Here's the entry: 
  Today was a really great day. I finally was able  to grab that pair of shoes I've been dying to get.
  `  
  await analize(entry)
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries', entries)
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
