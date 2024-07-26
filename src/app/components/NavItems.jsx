"use client";
import { usePathname } from "next/navigation";
import { headerLinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SpinnerContext } from "./SpinnerContext";
import Loading from "./Loading";
import { logout } from "../apiCalls";
import toast from "react-hot-toast";

const NavItems = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("/admin") && pathname !== "/admin/login";
  const { isLoading, setIsLoading } = useContext(SpinnerContext);

  // do logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await logout().then((res) => res.json());
      if (response.success) {
        toast.success(response.message);
        router.replace("/admin/login");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-fit flex flex-col bg-black md:bg-transparent md:flex-row gap-3 md:gap-10">
      {headerLinks
        .filter(
          (link) =>
            (link.url.includes("/admin") && isAdmin) ||
            (!link.url.includes("/admin") && !isAdmin)
        )
        .map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.url}
              href={link.url}
              className={`${
                isActive ? "text-primary" : "text-blue-gray-100 md:text-white"
              } font-[600] tracking-wide text-base`}
            >
              {link.label}
            </Link>
          );
        })}
      {isAdmin && (
        <span
          className="text-blue-gray-100 cursor-pointer md:text-white font-[600] tracking-wide text-base"
          onClick={handleLogout}
        >
          Logout
        </span>
      )}
    </div>
  );
};

export default NavItems;
