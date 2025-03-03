"use client"
import Image from "next/image"
import { Bell } from "lucide-react"
import { Button } from "../button"
import DropDown from "../DropDown"

type Props = {
    name:string ,
  image: string ;
  UUID?: string;
}

const SearchBar = ()=>{
    return(
        /* From Uiverse.io by seyed-mohsen-mousavi */ 
<div className="relative w-1/3">
  
  <svg onClick={()=>{alert("hello")}}
    className="size-6 absolute top-3 left-3 text-gray-500 "
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
    className="pl-12 pr-2 input bg-slate-200  focus:border-2 border-1 border-[#4a4a4a] py-3 rounded-sm w-[80%] transition-all focus:w-[100%] outline-none"
    name="search"
    type="search"
  />
</div>

    )
}

function Header({name,image,UUID}: Props) {
  return (
    <div className='p-6 pb-1 bg-white flex justify-between shadow-bottom'>
        <h1 className='text-3xl flex items-center'>PROLOAD <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png" width={60} height={60}  alt="logo" /></h1>
        <SearchBar />
        <div className="flex gap-2">
            <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none border-black border-1 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            </Button>
            <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none border-black border-1 p-2">
            <Bell />
            </Button>
            <Button variant={"link"} className="text-md">
                My Workout
            </Button>
            <DropDown image = {image} UUID={UUID ?? ""} userName={name}/> 
        </div>

    </div>
  )
}

export default Header

