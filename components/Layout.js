import React from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <div className="bg-gradient-to-r from-[#152643] to-[#14231a]">
      <header className="flex justify-between items-center p-6">
        <div
          onClick={handleClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
        </div>
        <nav className="space-x-6">
          <a href="#" className="hover:text-zinc-400">
            Movies
          </a>
          <a href="#" className="hover:text-zinc-400">
            TV Shows
          </a>
          <a href="#" className="hover:text-zinc-400">
            Suggest me →
          </a>
        </nav>
      </header>{" "}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
