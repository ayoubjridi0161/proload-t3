import { Search, MessagesSquare, Bell } from "lucide-react";
import image from "next/image";
import DropDown from "../DropDown";
import { Input } from "../input";
import React from 'react'
type Props = {
    image : string | null | undefined
    userName : string | null | undefined
    UUID : string | undefined
}
const HeaderUI = (props:Props) => {
  return (
    <section style={{boxShadow: "3px -2px 10px 0px rgba(0,0,0,0.13)"}} className="flex  items-center justify-between px-3 py-2 mt-2">
        
        <h1 className="text-3xl font-bold">Proload.me</h1>
        <div className=" bg-[rgba(230,230,230,0.6)] border-2 border-black/80 flex gap-6 items-center rounded-md w-1/3 h-10 px-3  ">
        <Search size={16} strokeWidth={1} />
        <Input className="border-y-2 border-x-0 rounded-none " placeholder="Search for workouts" />
        </div>
        <div className="flex items-center gap-5">
            <div className="p-2 border-2 border-black" style={{boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.81)"}}>
            <MessagesSquare size={25} strokeWidth={2} />
            </div>
            <div className="p-2 border-2 border-black" style={{boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.81)"}}>
            <Bell size={25} strokeWidth={2} />
            </div>
            <h2 className="text-xl font-semibold">Workout</h2>
            <DropDown image = {props.image || ""} UUID={props.UUID || ""} userName={props.userName || "aaa"}/> 
            </div>
        </section>
  )
}

export default HeaderUI
