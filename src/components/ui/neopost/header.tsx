"use client"
import Image from "next/image"
import { Bell } from "lucide-react"
import { Button } from "../button"
import DropDown from "../DropDown"
import { Notifs } from "./Notifs"
import { MessagesNotif } from "./MessagesNotif"
import Link from "next/link"
import { useState ,useEffect} from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Avatar from "~/components/component/Avatar"
import { searchUsers } from "~/lib/actions/userActions"

type Props = {
    name:string ,
  image: string ;
  UUID?: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<{name:string|null,id:string,image:string|null}[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchHN = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setProfiles([]);
      } else {
        const filteredProfiles = await searchUsers(debouncedSearchTerm.toLowerCase());
        setProfiles(filteredProfiles ?? []);
      }
    };

    void searchHN();
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-1/3">
      <svg
        className="size-5 absolute top-2 left-2 text-gray-500"
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
        className="pl-12 pr-2 input bg-slate-200 focus:border-2 border-1 border-[#4a4a4a] py-1 rounded-sm w-[80%] transition-all focus:w-[100%] outline-none"
        name="search"
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.relatedTarget || !e.relatedTarget.closest("a")) {
            setIsFocused(false);
          }
        }}
      />
      {isFocused && profiles.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
          {profiles.map((profile, index) => (
            <Link
              href={`/profile/${profile.id}`}
              key={index}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setProfiles([]);
              }}
              tabIndex={-1} // Prevents the link from triggering onBlur
            >
              {profile.image && <Avatar image={profile.image} />}
              <span>{profile.name}</span>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

function Header({name,image,UUID}: Props) {
  return (
    <div className='sticky h-[--header-height] top-0 z-50 w-full flex items-center border-b bg-dashboardBackground px-5'>
      <div className=" mx-auto flex justify-between items-center w-full">
        <Link href={'/neopost'} className='text-xl flex items-center'>PROLOAD <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png" width={40} height={40}  alt="logo" /></Link>
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

