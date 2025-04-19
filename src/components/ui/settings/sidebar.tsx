"use client"
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { PrivacySettings } from "./privacy-settings";
import { GeneralSettings } from "./general-settings";
import { AccountSettings } from "./account-settings";
type Data = {
  name: string;
  image: string;
  email: string;
}

const Settings = ({data}:{data: Data}) => {
  const [selectedTab, setSelectedTab] = useState("general settings");
  const tabItems = [
    "general settings",
    // "account settings",
    "privacy settings"

  ];

  return (
    <Tabs.Root
    defaultValue={"general settings"}
      className="max-w-screen-xl w-full h-[90vh] flex mx-auto mt-4 px-4 md:px-8"
      onValueChange={(val) => setSelectedTab(val)}
      orientation="vertical"
    >
      <Tabs.List
        
        className="hidden border-l flex-col justify-start w-1/4 items-start gap-y-6 text-sm sm:flex"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="text-lg group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
            value={item}
          >
            <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-100 font-medium">
              {item}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="relative text-gray-500 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <select
          value={selectedTab}
          className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600 text-sm"
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {tabItems.map((item, idx) => (
            <option key={idx}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <Tabs.Content className="w-full" value="account settings"><AccountSettings/></Tabs.Content>
      <Tabs.Content className="w-full" value="general settings"><GeneralSettings userData={data}/></Tabs.Content>
      <Tabs.Content className="w-full" value="privacy settings"><PrivacySettings/></Tabs.Content>
      
    </Tabs.Root>
  );
};
export default Settings