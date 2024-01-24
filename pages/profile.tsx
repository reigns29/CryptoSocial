import React, { useState } from "react";
import Link from "next/link";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

const Profile = () => {
  const [data, setData] = useState({});
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  if (address) {
    const { data: data, isLoading } = useContractRead(contract, "users", [
      address,
    ]);
  }
  console.log(data);
  return (
    <div>
      <header className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white flex flex-col justify-center items-center p-12">
        <img
          src="https://res.cloudinary.com/djwgkxthm/image/upload/v1706096571/event/lwq644zlgwtngwbe3tqb.png"
          alt="User Avatar"
          className="h-20 w-20 rounded-full mb-4"
        />
        <h1 className="text-2xl lg:text-4xl font-bold mb-2">Welcome , abc-123</h1>
        <p className="text-lg">
          Decentralizing Content Monetization With Blockchain.   
        </p>
        <div className="flex space-x-3">
          <Link
            href="/posts/new"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Create New Posts
          </Link>
          <Link
            href="/profile"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            My Posts
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Profile;
