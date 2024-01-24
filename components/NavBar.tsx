import React from "react";
import Link from "next/link";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const NavBar = () => {
  const address = useAddress();
  const links = [
    { label: "Profile", href: "/profile" },
    { label: "Feed", href: "/posts/list" },
    { label: "Transactions", href: "/transactions" },
  ];
  return (
    <nav
      className={
        address ? "bg-gray-800 px-4 py-2" : "bg-gray-800 px-4 py-[23px]"
      }
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          CryptoSocial
        </Link>
        <ul className="flex justify-between items-center space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hidden md:inline hover:text-gray-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {address ? (
            <li>
              <ConnectWallet />
            </li>
          ) : (
            <li>
              <Link href="/login" className="md:inline hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
