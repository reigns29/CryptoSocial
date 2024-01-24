import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useRouter } from "next/router";

const convertSecondsToDateInString = (dateInNumber: number) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const date = new Date(dateInNumber * 1000);
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate.toString();
};

const PostDetails = () => {
  const id = useRouter().query.id;
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
  const { data, isLoading } = useContractRead(contract, "posts", [id]);
  if (!isLoading) {
    console.log(data);
    return (
      <div>
        <section className="container mx-auto mt-8 p-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Post Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <img src={data[5]} alt="Image" />
            </div>
            <div className="mb-4">
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Caption
              </h3>
              <p className="text-gray-400">{data[3]}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Category : {data[4].toUpperCase()}
              </h3>
              <p className="text-gray-400"> Post Category : {data[2]} </p>
              <p className="text-gray-400">
                Posted by {data[11][2]} on{" "}
                {convertSecondsToDateInString(Number(data[9]._hex))}
              </p>
              <div className="flex space-x-5 my-4">
                <p className="text-red-400">Likes : {Number(data[6]._hex)} </p>
                <p className="text-blue-400">
                  Dislikes: {Number(data[7]._hex)}{" "}
                </p>
                <p className="text-purple-400">
                  Flags: {Number(data[8]._hex)}{" "}
                </p>
              </div>
              <Web3Button
                contractAddress="0x9dcd225A78E94Ec6Df6465Cce6bEE234D610Ee9E"
                action={(contract) => {
                  contract.call("tipPostAuthor", [Number(data[0]._hex)], {
                    value: ethers.utils.parseEther("1"),
                  });
                }}
              >
                tipPostAuthor
              </Web3Button>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default PostDetails;
