import { Button } from "@/components/ui/button";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface ConnectButtonProps {
  onClick?: () => void;
  size?: "default" | "lg" | "sm";
  variant?: "default" | "outline" | "secondary";
}

export function ConnectButton({
  onClick,
  size = "default",
  variant = "default",
}: ConnectButtonProps) {
  const { t } = useTranslation();
  const { connect, connected, connecting, wallet } = useSolanaWallet();

  const handleConnect = useCallback(() => {
    // 如果有外部传入的 onClick，优先使用
    if (onClick) {
      onClick();
      return;
    }

    // 否则使用默认连接行为
    if (!connected && !connecting && wallet) {
      connect().catch(console.error);
    }
  }, [connect, connected, connecting, wallet, onClick]);

  return (
    <Button
      disabled={connecting}
      onClick={handleConnect}
      size={size}
      variant={variant}
    >
      {connecting ? t("connecting") : t("connect")}
    </Button>
  );
}
