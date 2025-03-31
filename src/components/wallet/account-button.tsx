import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";
import { CheckIcon, CopyIcon, LogOutIcon, WalletIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AccountButton({
  onChangeWallet,
}: {
  onChangeWallet: () => void;
}) {
  const { t } = useTranslation();
  const { copyAddress, disconnect, formattedAddress, isCopied, wallet } =
    useSolanaWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" variant="outline">
          {wallet?.adapter.icon && (
            <img
              alt={wallet.adapter.name}
              className="w-4 h-4"
              src={wallet.adapter.icon}
            />
          )}
          {formattedAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="justify-center"
          onSelect={(event) => {
            event.preventDefault();
            copyAddress();
          }}
        >
          {isCopied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              {t("copied")}
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              {t("copyAddress")}
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center" onSelect={onChangeWallet}>
          <WalletIcon className="h-4 w-4" />
          {t("changeWallet")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-center"
          onSelect={() => disconnect().catch(console.error)}
        >
          <LogOutIcon className="h-4 w-4" />
          {t("disconnect")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
