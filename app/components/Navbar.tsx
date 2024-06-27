import Link from "next/link"
import Image from "next/image"
import Menu from "./Menu"
import SearchBar from "./SearchBar"
import NavIcons from "./NavIcons"


const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
        {/* Mobile View */}
        <div className="h-full flex items-center justify-between md:hidden">
            <Link href="/">
              <Image src="/icon.png" alt="" width={50} height={50}/>
              {/* <div className="text-2xl tracking-wide">HAZETCG</div> */}
            </Link>
            <div>
              <SearchBar/>
            </div>
            <Menu />
        </div>
        {/* Larger Screens */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* Left */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
            <Image src="/icon.png" alt="" width={50} height={50}/>
            <div className="text-2xl tracking-wide">HAZETCG</div>
            </Link>
            <div className="hidden xl:flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/">My Collection</Link>
              <Link href="/">Card Finder</Link>
              <Link href="/">Watchlist</Link>
            </div>
          </div>
          {/* Right */}
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar/>
          <NavIcons/>
          </div>          
        </div>
    </div>
  )
}

export default Navbar
