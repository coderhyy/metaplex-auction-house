import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { WalletConnect } from "./components/wallet/wallet-connect";
import { SolanaWalletProvider } from "./components/wallet/wallet-provider";

function App() {
  return (
    <ThemeProvider>
      <SolanaWalletProvider>
        <div className="p-4">
          <header className="flex justify-end">
            <WalletConnect />
          </header>
          {/* 应用其他内容 */}
        </div>
      </SolanaWalletProvider>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

export default App;
