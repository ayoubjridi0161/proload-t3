
import { Toggle } from '../ui/toggle'
import { ArrowBigUpDash } from 'lucide-react'
import { updateUpvotes } from '~/lib/data'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from 'auth'

const Upvote = async ({workoutId}:{workoutId:number}) => {
  const session = await auth()
  const userName = session?.user?.name
  if(!userName) throw new Error("no user fetched")
    const updateWithInfo = updateUpvotes.bind(null,userName,workoutId)
  return (
    <form action={updateWithInfo} >
            <Button className='bg-muted' type='submit' name="pressed" value={"true"} >
              <ArrowBigUpDash className="h-5 w-5" />
              <span className="sr-only">Upvote</span>
            </Button>
            </form>
  )
}

export default Upvote