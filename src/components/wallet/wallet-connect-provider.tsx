import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { toast } from "sonner";

export function WalletConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = useMemo(
    () => clusterApiUrl(WalletAdapterNetwork.Devnet),
    []
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        autoConnect
        onError={(error) => {
          toast.error(error.message);
        }}
        wallets={[]}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
