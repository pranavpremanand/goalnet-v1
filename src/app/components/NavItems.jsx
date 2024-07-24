"use client";
import { usePathname } from "next/navigation";
import { headerLinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SpinnerContext } from "./SpinnerContext";
import Loading from "./Loading";

const NavItems = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("/admin") && pathname !== "/admin/login";
  const { isLoading, setIsLoading } = useContext(SpinnerContext);

  const handleLogout = async () => {
    // setIsLoading(true);
    // router.push("/admin/login");
    // setIsLoading(false);
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
