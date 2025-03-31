import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const COPY_TIMEOUT = 400;
const ADDRESS_DISPLAY_CHARS = 4;

export function CustomConnectButton() {
  const { t } = useTranslation();
  const {
    connect,
    connected,
    connecting,
    disconnect,
    disconnecting,
    publicKey,
    select,
    wallet,
    wallets,
  } = useWallet();

  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { installedWallets, otherWallets } = useMemo(() => {
    const installed = wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.Installed
    );
    const others = wallets.filter(
      (wallet) => wallet.readyState !== WalletReadyState.Installed
    );

    return {
      installedWallets: installed,
      otherWallets: others,
    };
  }, [wallets]);

  const allWallets = useMemo(
    () => [...installedWallets, ...otherWallets],
    [installedWallets, otherWallets]
  );

  const btnText = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return `${base58.slice(0, ADDRESS_DISPLAY_CHARS)}..${base58.slice(
        -ADDRESS_DISPLAY_CHARS
      )}`;
    }

    if (connected) return t("connected");
    if (connecting) return t("connecting");
    if (disconnecting) return t("disconnecting");
    if (wallet) return t("connect");

    return t("selectWallet");
  }, [connected, connecting, disconnecting, publicKey, t, wallet]);

  const handleConnect = useCallback(() => {
    connect().catch((error) => {
      console.error(error);
    });
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect().catch((error) => {
      console.error(error);
    });
  }, [disconnect]);

  const handleSelectWallet = useCallback(
    (wallet: Wallet) => {
      select(wallet.adapter.name);
      setOpenModal(false);
    },
    [select]
  );

  const handleCopy = useCallback(
    async (event: Event) => {
      event.preventDefault();
      if (publicKey) {
        try {
          await navigator.clipboard.writeText(publicKey.toBase58());
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), COPY_TIMEOUT);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [publicKey]
  );

  const handleChangeWallet = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (publicKey || connected) {
        setOpenDropdown(true);
        return;
      }

      if (wallet) {
        handleConnect();
        return;
      }

      setOpenModal(true);
    },
    [connected, handleConnect, publicKey, wallet]
  );

  return (
    <>
      <Dialog onOpenChange={setOpenModal} open={openModal}>
        {!publicKey && (
          <DialogTrigger asChild>
            <Button
              disabled={connecting || disconnecting}
              onClick={handleClick}
            >
              <span>{btnText}</span>
            </Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("selectWallet")}</DialogTitle>
            <DialogDescription>
              {t("connectYourSolanaWalletToAccessFullFeatures")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {allWallets.map((wallet) => (
              <Button
                className="flex items-center justify-between h-auto"
                key={wallet.adapter.name}
                onClick={() => handleSelectWallet(wallet)}
                variant="ghost"
              >
                <div className="flex items-center gap-2">
                  <img
                    alt={wallet.adapter.name}
                    className="w-6 h-6"
                    src={wallet.adapter.icon}
                  />
                  <span className="text-lg ">{wallet.adapter.name}</span>
                </div>
                {wallet.readyState === WalletReadyState.Installed && (
                  <span className="text-sm text-gray-500">{t("detected")}</span>
                )}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu onOpenChange={setOpenDropdown} open={openDropdown}>
        {publicKey && (
          <DropdownMenuTrigger asChild>
            <Button>
              <img
                alt={`${wallet?.adapter.name} icon`}
                className="w-6 h-6"
                src={wallet?.adapter.icon}
              />
              <span>{btnText}</span>
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent>
          <DropdownMenuItem className="justify-center" onSelect={handleCopy}>
            {isCopied ? t("copied") : t("copyAddress")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-center"
            onSelect={handleChangeWallet}
          >
            {t("changeWallet")}
          </DropdownMenuItem>
          {!disconnecting && wallet && (
            <DropdownMenuItem
              className="justify-center"
              onSelect={handleDisconnect}
            >
              {t("disconnect")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
