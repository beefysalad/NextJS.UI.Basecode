import { ROUTES } from "@/app/common/constants/route-pages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/lib/actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const ProfileDropdown = async () => {
  const session = await auth();

  const navigateUserProfile = () => {
    redirect(ROUTES.USER);
  };
  const showProfileDropdown = () => {
    if (!session) return <></>;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='hover:cursor-pointer'>
            <AvatarImage src={session.user?.image ?? " "} />
            <AvatarFallback>{session.user?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={ROUTES.USER}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return showProfileDropdown();
};

export default ProfileDropdown;
