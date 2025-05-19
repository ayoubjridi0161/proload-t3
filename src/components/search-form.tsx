import React, { useState } from "react";
import { Search } from "lucide-react"

import { Label } from "~/components/ui/label"
import { SidebarInput } from "~/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
  id="search"
  placeholder="Type to search..."
  className="h-8 pl-7"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  aria-label="Search"
/>
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" aria-hidden="true" />
      </div>
    </form>
  )
}

