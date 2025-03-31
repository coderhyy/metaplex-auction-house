import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { useState } from "react";

import { AccountButton } from "./account-button";
import { ConnectButton } from "./connect-button";
import { WalletDialog } from "./wallet-dialog";

export function WalletConnect() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { connected, wallet } = useSolanaWallet();

  // 状态处理逻辑简化，使用提前返回模式
  if (!wallet || !connected) {
    return (
      <>
        <ConnectButton
          onClick={!wallet ? () => setDialogOpen(true) : undefined}
        />
        {!wallet && (
          <WalletDialog onOpenChange={setDialogOpen} open={dialogOpen} />
        )}
      </>
    );
  }

  // 已连接状态
  return (
    <>
      <AccountButton onChangeWallet={() => setDialogOpen(true)} />
      <WalletDialog onOpenChange={setDialogOpen} open={dialogOpen} />
    </>
  );
}
