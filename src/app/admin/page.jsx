import Link from "next/link";
import React from "react";

const AdminHome = () => {
  const links = [
    { title: "Banners", link: "/" },
    { title: "Posts", link: "/" },
    { title: "Categories", link: "/categories" },
  ];
  return (
    <div className="wrapper grow">
      <Link href="/admin" className="text-md text-primary underline">
        Home
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 pt-5 grow">
        {links.map(({ link, title }) => (
          <Link
            key={link}
            href={`/admin/${link.toLowerCase()}`}
            className={`bg-[#191919] text-primary rounded-xl aspect-square flex items-center justify-center p-4 text-xl font-semibold`}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
