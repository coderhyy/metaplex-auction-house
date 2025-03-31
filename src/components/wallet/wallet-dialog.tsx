import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { cn } from "@/lib/utils";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Wallet } from "@solana/wallet-adapter-react";
import { useTranslation } from "react-i18next";

// 添加适当的类型定义
interface WalletButtonProps {
  compact?: boolean;
  onClick: () => void;
  wallet: Wallet;
}

export function WalletDialog({
  onOpenChange,
  open,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  const { t } = useTranslation();
  const { select, wallets } = useSolanaWallet();

  // 将钱包分组
  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed
  );

  const otherWallets = wallets.filter(
    (wallet) => wallet.readyState !== WalletReadyState.Installed
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("selectWallet")}</DialogTitle>
          <DialogDescription>
            {t("connectYourSolanaWalletToAccessFullFeatures")}
          </DialogDescription>
        </DialogHeader>

        {/* 已安装钱包列表 */}
        {installedWallets.length > 0 && (
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              {t("detected")}
            </h3>
            <div className="space-y-1">
              {installedWallets.map((wallet) => (
                <WalletButton
                  key={wallet.adapter.name}
                  onClick={() => {
                    select(wallet.adapter.name);
                    onOpenChange(false);
                  }}
                  wallet={wallet}
                />
              ))}
            </div>
          </div>
        )}

        {/* 其他钱包列表 */}
        {otherWallets.length > 0 && (
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              {t("otherWallets")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {otherWallets.map((wallet) => (
                <WalletButton
                  compact
                  key={wallet.adapter.name}
                  onClick={() => {
                    select(wallet.adapter.name);
                    onOpenChange(false);
                  }}
                  wallet={wallet}
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// 钱包按钮子组件
function WalletButton({ compact = false, onClick, wallet }: WalletButtonProps) {
  return (
    <button
      className={cn(
        "flex gap-2 items-center w-full p-3 rounded-lg hover:bg-accent transition-colors",
        compact ? "flex-col" : "flex-row"
      )}
      onClick={onClick}
    >
      <img
        alt={wallet.adapter.name}
        className={cn(compact ? "w-8 h-8" : "w-6 h-6")}
        src={wallet.adapter.icon}
      />
      <span className={cn(compact ? "text-sm" : "text-base")}>
        {wallet.adapter.name}
      </span>
    </button>
  );
}
