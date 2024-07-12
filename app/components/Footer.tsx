import Image from "next/image"
import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="my-10 px-4 text-center">
      <div className="flex justify-center mb-2 items-center gap-2">
        <Image src="/icon.png" alt="" width={50} height={50}/>
        <div className="text-2xl tracking-wide">HAZETCG</div>    
      </div>
      <p className="font-bold mt-6 mb-20">See The Value Through the Haze.</p>  
      <small className="mb-2 block text-xs">Copyright &copy; 2024 Christopher Yuan.</small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> all data made avaliable by the&nbsp;
        <Link href="https://pokemontcg.io/" className="font-semibold underline">Pokémon TCG API</Link>.<br/>
        This website is not produced, endorsed, supported, or affiliated with Nintendo or the The Pokémon Company.<br/>
        Built using React, Next.js, TypeScript, and Tailwind CSS.
      </p>
      <div className="flex justify-center">
        <Socials />
      </div>
    </footer>
  );
}