'use server'
import { auth, signOut } from 'auth';
import Link from 'next/link';
import React from 'react'
import { Button } from './button';
import Image from 'next/image';


export default async function Header() {
    const session = await auth();
  return (
    <header className=''>
        <nav className='flex justify-between'>
            <h1>Proload</h1>
            <div>
                {session?.user ? 
                // <><Image src={session.user.image ?? ''} width={24} height={24} alt='image'/>
                <form action={async()=>{'use server'
                    await signOut();
                }}>
                    <Button>signOut</Button>
                </form>
                 :
                <a href='/api/auth/signin'>Sign In</a>  
            }
            </div>
        </nav>
    </header>
)
}