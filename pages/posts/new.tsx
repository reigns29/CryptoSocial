import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Web3Button } from "@thirdweb-dev/react";

const imageOptions = {
  clientAllowedFormats: ["jpg", "jpeg", "png"],
};

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [postData, setPostData] = useState({
    postContent: "",
    postCategory: "",
    postType: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="container mx-auto mt-8 px-6">
      <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-center">
        Create New Post
      </h2>
      <form className="bg-gray-800 p-8 rounded-md shadow-md text-black">
        <div className="mb-4">
          <textarea
            rows={4}
            id="postContent"
            name="postContent"
            placeholder="Post Content here.."
            className="w-full border p-2 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <select
          name="postType"
          id="postType"
          className="w-full border p-2 rounded-md my-4"
          defaultValue={"type"}
          onChange={handleChange}
          required
        >
          <option value="Image" className="py-2">
            Image
          </option>
          <option value="Video" className="p-2">
            Video
          </option>
        </select>

        <div className="mb-4">
          <input
            type="text"
            id="postCategory"
            name="postCategory"
            placeholder="Post Category"
            className="w-full border p-2 rounded-md"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <CldUploadWidget
            onUpload={(result: any) => {
              console.log(result.info.secure_url);
              setImageUrl(result.info.secure_url);
            }}
            options={imageOptions}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          >
            {({ open }) => {
              return (
                <button
                  className="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-full"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
          {imageUrl.length > 0 && (
            <img src={imageUrl} className="h-[400px] mb-4" alt="Image" />
          )}
        </div>

        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!}
          action={(contract) => {
            console.log(postData);
            contract.call("createPost", [
              postData.postContent,
              postData.postCategory,
              postData.postType,
              imageUrl,
            ]);
          }}
        >
          createPost
        </Web3Button>
      </form>
    </section>
  );
};

export default CreatePost;
