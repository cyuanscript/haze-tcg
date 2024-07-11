"use client";

import { Button } from "@/components/ui/button";
import { SquareMenu } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

const Menu = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Button variant="outline" size="icon">
        <SquareMenu className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}/>
      </Button>
        {
        open && (
            <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100ch-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
                <Link href="/">Home</Link>
                <Link href="/">My Collection</Link>
                <Link href="/">Card Finder</Link>
                <Link href="/">Watchlist</Link>
                <Link href="/">Logout</Link>
            </div>
        )
      }
    </div>
  );
};

export default Menu;
