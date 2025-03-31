import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { CustomConnectButton } from "./components/wallet/custom-connect-button";
import { WalletConnectProvider } from "./components/wallet/wallet-connect-provider";

function App() {
  return (
    <>
      <ThemeProvider>
        <WalletConnectProvider>
          <CustomConnectButton />
        </WalletConnectProvider>
        <Toaster position="top-center" />
      </ThemeProvider>
    </>
  );
}

export default App;
