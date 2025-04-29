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
    <Sidebar side='right' className="border-left-1 px-3 bg-[#f2fcf5] top-[--header-height] !h-[calc(100svh-var(--header-height))] " >
      <SidebarContent className='bg-[#f2fcf5] '>
      {children}
      </SidebarContent>
    </Sidebar>
  )
}