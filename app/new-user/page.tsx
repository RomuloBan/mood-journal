import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  console.log('USER>>>>>>>>>', user)
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    })
  }
  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()
  return <div>New User Page</div>
}

export default NewUserPage
