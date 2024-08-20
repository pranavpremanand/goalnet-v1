import Link from "next/link";
import React from "react";

const AdminHome = () => {
  const links = [
    // { title: "Banners", link: "/" },
    { title: "Posts", link: "/posts" },
    { title: "Categories", link: "/categories" },
  ];
  return (
    <section className="wrapper grow">
      <Link href="/admin" className="text-md text-primary" title="Home">
        Home
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 pt-5 grow">
        {links.map(({ link, title }) => (
          <Link
            key={link}
            href={`/admin${link}`}
            title={title}
            className={`bg-[#252525] text-primary rounded-xl aspect-square flex items-center justify-center p-4 text-xl font-semibold`}
          >
            {title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdminHome;
