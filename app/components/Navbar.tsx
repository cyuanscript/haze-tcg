import Link from "next/link"
import Menu from "./Menu"
import SearchBar from "./SearchBar"


const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
        {/* Mobile View */}
        <div className="h-full flex items-center justify-between md:hidden">
            <Link href="/">
                <div className="text-2xl tracking-wide">HAZETCG</div>
            </Link>
            <Menu />
        </div>
        {/* Larger Screens */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* Left */}
          <div className="w-1/3">
            <Link href="/" className="flex items-center gap-3">
            {/*TODO: Add logo here later */}
            <div className="text-2xl tracking-wide">HAZETCG</div>
            </Link>
          </div>
          {/* Right */}
          <div className="w-2/3 flex items-center justify-between gap-8">
          <SearchBar/>
          </div>          
        </div>
    </div>
  )
}

export default Navbar
