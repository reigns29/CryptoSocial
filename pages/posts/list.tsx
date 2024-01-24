import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import PostCard from "../../components/PostCard";

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

const PostsPage = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getAllPosts");
  console.log(data);
  if (!isLoading) {
    return (
      <div className="mt-4 mx-[15px] md:mx-[300px]">
        <h1 className="text-center text-2xl m-4">Posts</h1>
        {data.map((item: any) => {
          return (
            <PostCard
              postId={Number(BigInt(item[0]._hex))}
              postContent={item[3]}
              postImageUrl={item[5]}
              authorName={item[11][2]}
              postTime={convertSecondsToDateInString(
                Number(BigInt(item[9]._hex))
              )}
              authorImageUrl={item[11][3]}
            />
          );
        })}
      </div>
    );
  }
};

export default PostsPage;
