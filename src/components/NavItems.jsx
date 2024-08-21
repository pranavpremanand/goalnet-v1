"use client";
import { usePathname } from "next/navigation";
import { headerLinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../apiCalls";
import toast from "react-hot-toast";

const NavItems = ({ onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("/admin") && pathname !== "/admin/login";

  // do logout
  const handleLogout = async () => {
    try {
      const response = await logout().then((res) => res.json());
      if (response.success) {
        toast.success(response.message, {
          id: "success",
        });
        router.replace("/admin/login");
      }
    } catch (err) {
      toast.error(err.message, {
        id: "error",
      });
    }
  };

  return (
    <div className="w-fit flex flex-col bg-black md:bg-transparent md:flex-row gap-5 md:gap-10">
      {headerLinks
        .filter(
          (link) =>
            (link.url.includes("/admin") && isAdmin) || // admin
            (!link.url.includes("/admin") && !isAdmin) // not admin
        )
        .map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.url}
              href={link.url}
              onClick={onClose}
              className={`${
                isActive ? "text-primary" : "text-gray-100 md:text-blue-gray-50"
              } font-[600] tracking-wide text-3xl md:text-base`}
              title={link.label}
            >
              {link.label}
            </Link>
          );
        })}
      {isAdmin && (
        <button
          className="text-gray-100 cursor-pointer md:text-blue-gray-50 font-[600] tracking-wide text-3xl md:text-base"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavItems;
