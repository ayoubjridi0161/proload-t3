"use client"
import React from 'react'
import { Sidebar, SidebarContent } from '../sidebar'

import { Chip } from '@nextui-org/react';
import Image from 'next/image'; 
import { Button } from '@nextui-org/react';
import Container from '../userDashboard/Container';

type Props = {}

export default function RightSidebar({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <Sidebar side='right'  className="border-left-1 px-3 bg-[#f2fcf5] top-[--header-height] !h-[calc(100svh-var(--header-height))]" >
      <SidebarContent className='bg-[#f2fcf5] '>
      {children}
      <div className='px-3 space-y-3'>
                {Array.from({length:3}).map((item,index)=>(
                    <Container className='bg-xtraText space-y-3' key={index}>
                    <div className='flex'>
                        <div>
                        <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg" width={180} height={180} alt='hello'/>
                        </div>
                        <div className='px-5 space-y-1'>
                            <h1 className='text-md font-bold'>Full body Strength</h1>
                            <p className='text-xs'>A comprehensive workout targeting all major muscle groups for overall strength and conditioning</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                    <Chip className='bg-xtraDark text-xtraBG'>Mon</Chip>
                    <Chip className='bg-xtraDark text-xtraBG'>Wed</Chip>
                    <Chip className='bg-xtraDark text-xtraBG'>Fri</Chip>
                    </div>
                    <div className='flex items-center gap-2 justify-between'>
                        <Button size="sm" className='text-xs bg-xtraGreen text-xtraText'>Start Program</Button>
                        <Button size="sm" className='text-xs bg-xtraGreen text-xtraText'>Scheduele Program</Button>
                    </div>
                    </Container>
                ))}
      </div>
      </SidebarContent>
    </Sidebar>
  )
}