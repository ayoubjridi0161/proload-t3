"use client"
import Image from "next/image"
import { Bell } from "lucide-react"
import { Button } from "../button"
import DropDown from "../DropDown"
import { Notifs } from "./Notifs"
import { MessagesNotif } from "./MessagesNotif"

type Props = {
    name:string ,
  image: string ;
  UUID?: string;
}

const SearchBar = ()=>{
    return(

<div className="relative w-1/3">
  
  <svg onClick={()=>{alert("hello")}}
    className="size-5 absolute top-2 left-2 text-gray-500 "
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  </svg>
  <input
    placeholder="Search ..."
    className="pl-12 pr-2 input bg-slate-200  focus:border-2 border-1 border-[#4a4a4a] py-1 rounded-sm w-[80%] transition-all focus:w-[100%] outline-none"
    name="search"
    type="search"
  />
</div>

    )
}

function Header({name,image,UUID}: Props) {
  return (
    <div className='p-2 bg-white  h-[--header-height] '>
      <div className="xl:w-2/3 mx-auto flex justify-between items-center">
        <h1 className='text-xl flex items-center'>PROLOAD <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png" width={40} height={40}  alt="logo" /></h1>
        <SearchBar />
        <div className="flex gap-2">
            <MessagesNotif/>
            {/* <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none border-black border-1 p-2">
            <Bell />
            </Button> */}
            <Notifs/>
            <Button variant={"link"} className="text-md">
                My Workout
            </Button>
            <DropDown image = {image} UUID={UUID ?? ""} userName={name}/> 
      </div>
        </div>

    </div>
  )
}

export default Header

