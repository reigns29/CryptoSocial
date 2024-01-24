import Link from "next/link";
import React from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";
type PostCardProps = {
  postId: number;
  authorName: string;
  authorImageUrl: string;
  postTime: string;
  postImageUrl: string;
  postContent: string;
};

const PostCard = ({
  postId,
  authorName,
  postTime,
  postImageUrl,
  postContent,
  authorImageUrl,
}: PostCardProps) => {
  return (
    <div className="bg-gray-800 p-6 mb-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={authorImageUrl}
          alt="Author Avatar"
          className="rounded-full h-[50px] w-[50px] mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{authorName}</h2>
          <p className="text-gray-400">Posted on {postTime} </p>
        </div>
      </div>
      <img
        src={postImageUrl}
        alt="Post Image"
        className="w-full h-48 object-cover mb-4"
      />
      <p className="text-gray-300">{postContent}</p>
      <div className="mt-4 flex items-center">
        <button className="flex items-center text-red-500 hover:text-red-400 focus:outline-none mr-4">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21.35l-1.45-1.32C6.48 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.48 6.86-8.55 11.54L12 21.35z"
            ></path>
          </svg>
          <span>42 Likes</span>
        </button>
        <button className="flex items-center focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="dislike"
          >
            <defs>
              <linearGradient
                id="a"
                x1="2.252"
                x2="22.063"
                y1="12"
                y2="12"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#5433ff"></stop>
                <stop offset="1" stop-color="#20bdff"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#a)"
              d="m22.063,5v9c0,.965-.785,1.75-1.75,1.75h-3c-.965,0-1.75-.785-1.75-1.75V5c0-.965.785-1.75,1.75-1.75h3c.965,0,1.75.785,1.75,1.75Zm-8.003,0c0-.26.03-.51.09-.75h-.92c-1.23,0-2.47-.1-3.68-.3-2.71-.46-5.36,1.19-6.15,3.83l-1.03,3.43c-.25.84-.1,1.73.43,2.43.52.71,1.32,1.11,2.2,1.11h2.31c.12,0,.18.07.21.11.03.04.07.13.02.24l-.59,1.41c-.39.95-.29,2.02.28,2.88.57.85,1.52,1.36,2.55,1.36.59,0,1.13-.29,1.49-.84l1.76-3.21c.31-.58.77-1.05,1.31-1.38-.18-.4-.28-.85-.28-1.32V5Z"
            ></path>
          </svg>
        </button>
        <Link
          className="bg-orange-400 hover:bg-orange-600 px-4 py-2 rounded-full mr-4"
          href={"/posts/" + postId}
        >
          Share Post
        </Link>
        <Web3Button
          contractAddress="0x9dcd225A78E94Ec6Df6465Cce6bEE234D610Ee9E"
          action={(contract) => {
            contract.call("tipPostAuthor", [postId], {
              value: ethers.utils.parseEther("1"),
            });
          }}
        >
          tipPostAuthor
        </Web3Button>
      </div>
    </div>
  );
};

export default PostCard;
