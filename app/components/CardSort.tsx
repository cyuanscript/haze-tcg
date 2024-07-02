"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const CardSort = () => {

    const [sortType, setSortType] = useState("Price: High to Low")

  return (
    <div className="flex gap-4 items-center md:mx-12 lg:mx-16 xl:mx-0">
        <p className='text-sm font-semibold'>Sort By:</p>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{sortType}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
                    <DropdownMenuRadioItem value='Price: High to Low'>Price: High to Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Price: Low to High'>Price: Low to High</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default CardSort