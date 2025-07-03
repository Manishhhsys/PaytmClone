import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useUserData from "@/hooks/useUserData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Nav() {
  const [,, username] = useUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  return (
    <div className="h-16 bg-slate-400 grid grid-cols-2 items-center shadow-sm">
      <div className="text-2xl mx-2 font-bold font-sans">FakeTM</div>
      <div className="flex justify-end gap-4 items-center mx-2">
        <div className="font-medium">{username}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full">
              {username.slice(0, 1).toUpperCase()}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/addbalance")
              }}
            >
              Add Balance
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
               navigate("/update-profile")
              }}
            >
              Update Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Nav;
