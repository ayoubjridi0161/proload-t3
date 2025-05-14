"use client"
import Image from "next/image"
import { Button } from "../button"
import DropDown from "../DropDown"
import { Notifs } from "./Notifs"
import { MessagesNotif } from "./MessagesNotif"
import Link from "next/link"
import { useState ,useEffect} from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Avatar from "~/components/component/Avatar"
import { Moon, Sun } from "lucide-react"
import { searchUsers } from "~/lib/actions/userActions"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown-menu"
import { Switch } from "@nextui-org/react"
import { cn } from "~/lib/utils"
import './darkSwitch.css'


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
        className="size-5 absolute top-2 left-2 dark:text-zinc-200 text-gray-500"
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
        className="pl-12 pr-2 input dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-400 dark:ring-zinc-200 dark:focus:ring-rose-400 dark:focus:shadow-rose-400 bg-slate-200 focus:border-2 border-1 border-[#4a4a4a] py-1 rounded-sm w-[80%] transition-all focus:w-[100%] outline-none"
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
  const { setTheme } = useTheme()
  return (
    <div className='sticky h-[--header-height] top-0 z-50 w-full flex items-center border-b dark:border-xtraDarkAccent dark:bg-xtraDarkSecondary bg-dashboardBackground px-5'>
      <div className=" mx-auto flex justify-between items-center w-full">
        <Link href={'/home'} className='text-xl flex items-center'>PROLOAD <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png" width={40} height={40}  alt="logo" /></Link>
        <SearchBar />
        <div className="flex gap-2">
            <Notifs/>
            <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} size="icon" className="relative h-10 w-10  rounded-none border-black border-1 p-2">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
{/* <label
  htmlFor="themeToggle"
  className="themeToggle st-sunMoonThemeToggleBtn"
>
  <input type="checkbox" id="themeToggle" className="themeToggleInput" />
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="currentColor"
    stroke="none"
  >
    <mask id="moon-mask">
      <rect x="0" y="0" width="20" height="20" fill="white"></rect>
      <circle cx="11" cy="3" r="8" fill="black"></circle>
    </mask>
    <circle
      className="sunMoon"
      cx="10"
      cy="10"
      r="8"
      mask="url(#moon-mask)"
    ></circle>
    <g>
      <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
      <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
      <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
      <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
      <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
      <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
    </g>
  </svg>
</label> */}

            <DropDown image = {image} UUID={UUID ?? ""} userName={name}/> 
      </div>
        </div>

    </div>
  )
}
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};

export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
        fill="currentColor"
      />
    </svg>
  );
};
export default Header

