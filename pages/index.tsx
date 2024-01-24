import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const address = useAddress();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { mutateAsync: registerUser, isLoading } = useContractWrite(
    contract,
    "registerUser"
  );

  if (address && !isLoading) {
    const call = async () => {
      try {
        const data = await registerUser({
          args: [
            "user-123",
            "https://res.cloudinary.com/djwgkxthm/image/upload/v1706096571/event/lwq644zlgwtngwbe3tqb.png",
          ],
        });
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err);
      }
    };
    call();
  }

  return (
    <div>
      <header className="bg-gradient-to-r from-pink-400 to-orange-400 text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center">
          Discover Decentralized Social Media
        </h1>
        <p className="text-lg lg:text-xl text-center">
          Create and write posts that match your interests.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            href="/posts/list"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Explore posts
          </Link>
          <Link
            href="/posts/new"
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400"
          >
            Create Posts
          </Link>
        </div>
      </header>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 text-black">
          <div className="bg-white p-8 rounded-lg w-96 flex flex-col">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Register First
            </h2>
            <form className="p-8 text-black">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full border-2 p-2 rounded-md"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
