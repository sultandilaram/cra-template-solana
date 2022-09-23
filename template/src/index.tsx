/// Packages
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";

/// Components
import Providers from "./contexts/Providers";
import { Header, NavItem, Wrapper } from "react-base-kit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

/// Styles
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-base-kit/dist/styles/index.scss"

/// ROUTER
import ROUTES from "./routes";

/// DEPENDENCIES
window.Buffer = window.Buffer || Buffer;

function App() {
  return (
    <div className="App">
      <Providers>
        <Wrapper
          routes={ROUTES}
          title="React - Solana"
          header={(
            <Header title="React - Solana" >
              <NavItem path="/" label="Home" />
              <WalletMultiButton />
            </Header>
          )}
        // sidebar={<Sidebar />}
        // footer={<Footer />}
        />
      </Providers>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
