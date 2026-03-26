import Image from "next/image"
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="fixed inset-0 bg-muted py-8 sm:py-12 px-4 overflow-auto transform-gpu overscroll-contain z-10">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <Link className="flex justify-center mb-2 items-center gap-2 hover:opacity-80 transition-opacity py-3" href="/">
            <Image src="/icon.png" alt="" width={50} height={50}/>
            <div className="text-4xl tracking-wide font-semibold">Haze TCG</div> 
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Create your account</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Join the premier Pokemon card marketplace</p>          
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 sm:p-8">
          <form className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <div className="relative">
                <input id="username" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" data-form-type="other" className="w-full pl-9 sm:pl-10 pr-10 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 border-border focus:ring-primary/50 focus:border-primary" placeholder="Choose a username" required type="text"></input>
              </div>
            </div>
          </form>  
        </div>
      </div>
    </div>
  )
}

export default SignUpPage