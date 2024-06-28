import Link from "next/link";
import Image from "next/image";

const Querylist = () => {
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link href="/test" className="relative w-full h-80">
        <Image src="" alt="" fill sizes="25vw" />
      </Link>
    </div>
  );
};

export default Querylist;
