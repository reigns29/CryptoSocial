import {
  MediaRenderer,
  embeddedWallet,
  smartWallet,
  useConnect,
  useEmbeddedWallet,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/navigation";

type SocialLoginProps = {
  strategy: any;
};

export const SocialLoginButton = ({ strategy }: SocialLoginProps) => {
  const router = useRouter();
  const { connect } = useEmbeddedWallet();
  const connectSmartWallet = useConnect();
  const smartWalletConfig = smartWallet(embeddedWallet(), {
    factoryAddress: "0x8515b5e6824fe57a084c7b59519d45ff083c38d8",
    gasless: true,
  });

  const firstChar = strategy.charAt(0).toUpperCase();
  const rest = strategy.slice(1);
  const strategyName = firstChar + rest;

  const signInWithSocial = async () => {
    const personalWallet = await connect({
      strategy: strategy,
    });
    await connectSmartWallet(smartWalletConfig, {
      personalWallet: personalWallet,
      chainId: 80001,
    });
    router.push("/");
  };

  return (
    <button
      className="text-blue-500"
      style={{
        width: "100%",
        height: "42px",
        marginBottom: "1rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        border: "1px solid #CCC",
        borderRadius: "8px",
      }}
      onClick={signInWithSocial}
    >
      <span style={{ marginRight: "10px" }}>
        <MediaRenderer
          src={`/images/${strategy}Icon.png`}
          height="24px"
          width="24px"
        />
      </span>{" "}
      Sign in with {strategyName}
    </button>
  );
};
