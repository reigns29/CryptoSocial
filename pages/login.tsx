import React from "react";
import {
  MediaRenderer,
  useAddress,
  useEmbeddedWalletUserEmail,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { SocialLoginButton } from "../components/SocialLoginButton";
import EmailSignIn from "../components/EmailLogin";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "100vh",
        }}
      >
        <div
          style={{
            padding: "0.5rem 1rem",
          }}
        >
          <MediaRenderer
            src={"/images/logoIcon.png"}
            height="48px"
            width="48px"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid #EEE",
            height: "100%",
          }}
        >
          <div
            style={{
              minWidth: "80%",
            }}
          >
            <h1 className="text-2xl text-center mb-4">Sign In</h1>
            <EmailSignIn />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "2rem",
                marginBottom: "1rem",
                color: "#CCC",
              }}
            >
              <hr style={{ width: "45%", borderTop: "1px solid #CCC" }} />
              <p>or</p>
              <hr style={{ width: "45%", borderTop: "1px solid #CCC" }} />
            </div>
            <SocialLoginButton strategy="google" />
            <SocialLoginButton strategy="facebook" />
            <SocialLoginButton strategy="apple" />
          </div>
        </div>
      </div>
      <div
        className="hidden sm:flex flex-col justify-center items-center w-1/2 h-full"
        style={{
          backgroundColor: "#EEE",
          backgroundImage: "url(/images/social.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
