import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { toast } from "sonner";

interface SolanaWalletProviderProps {
  autoConnect?: boolean;
  children: React.ReactNode;
  network?: WalletAdapterNetwork;
}

export function SolanaWalletProvider({
  autoConnect = true,
  children,
  network = WalletAdapterNetwork.Devnet,
}: SolanaWalletProviderProps) {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        autoConnect={autoConnect}
        onError={(error) => {
          toast.error(error.message);
        }}
        wallets={wallets}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
