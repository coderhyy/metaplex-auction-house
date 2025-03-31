import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo, useState } from "react";

const COPY_TIMEOUT = 1000;
const ADDRESS_DISPLAY_CHARS = 4;

export function useSolanaWallet() {
  const wallet = useWallet();
  const [isCopied, setIsCopied] = useState(false);

  // 格式化地址显示
  const formattedAddress = useMemo(() => {
    if (!wallet.publicKey) return "";
    const address = wallet.publicKey.toBase58();
    return `${address.slice(0, ADDRESS_DISPLAY_CHARS)}...${address.slice(
      -ADDRESS_DISPLAY_CHARS
    )}`;
  }, [wallet.publicKey]);

  // 复制地址
  const copyAddress = useCallback(async () => {
    if (!wallet.publicKey) return;

    try {
      await navigator.clipboard.writeText(wallet.publicKey.toBase58());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_TIMEOUT);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [wallet.publicKey]);

  return {
    ...wallet,
    copyAddress,
    formattedAddress,
    isCopied,
  };
}
