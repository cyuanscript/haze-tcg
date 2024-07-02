"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./DarkModeToggle";
import { Bell, CircleUserRound } from "lucide-react";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const router = useRouter();

  const isLoggedIn = false
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login")
    }
    setIsProfileOpen((prev) => !prev)
  }

  return (
    <div className="flex items-center gap-2 xl:gap-4 relative">
      <Bell className="cursor-pointer"/>
      <CircleUserRound className="cursor-pointer" onClick={handleProfile}/>
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <ModeToggle/>
    </div>
  );
};

export default NavIcons;
