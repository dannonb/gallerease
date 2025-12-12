// import { Search } from "lucide-react";

// import { Input } from "@/components/ui/input";

import { auth } from "@/auth";
import Navbar from "./navbar";
import UserDropdown from "./user-dropdown";
import AuthButton from "./login-button";
import { ModeToggle } from "./theme-toggle";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md p-4 md:px-6 z-[998] shadow-soft">
      <div>
        <Navbar isLoggedIn={session ? true : false} />
      </div>
      <div className="flex items-center gap-3 ml-auto md:gap-4 lg:gap-6">
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form> */}
        <div className="flex items-center gap-2">
          {session ? <UserDropdown /> : <AuthButton />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
