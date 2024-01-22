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
  const entry = `Today was a eh, ok day I guess. I found a new coffee shop that was cool but then I got a flat tire. :)`  
  await analize(entry)
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
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
