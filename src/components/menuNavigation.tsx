import { useAuth } from "@/hook/useAuth";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge"
export default function MenuNavigation() {
  const { account , status } = useAuth()
  console.log("🚀 ~ file: menuNavigation.tsx:6 ~ MenuNavigation ~ status:", status)

  return (
    <div className="p-2 flex gap-10 justify-center bg-black ">
      <Link to="/" activeProps={{ className: "text-cyan-500 underline" }}>
        Home
      </Link>
      <Link
        to="/register"
        activeProps={{
          className: "underline",
        }}
        
      >
        {status === "Guest" ? "Register" : "Logout"}
      </Link>
   {status !== "Guest" && <><Badge variant="secondary">{account?.pseudo}</Badge></> }   
    </div>
  );
}
 