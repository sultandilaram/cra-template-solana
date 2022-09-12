/// Packages
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";

/// Components
import Providers from "./contexts/Providers";
import { PanelWrapper } from "./wrappers";

/// Styles
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

/// ROUTER
import ROUTES from "./routes";

/// DEPENDENCIES
window.Buffer = window.Buffer || Buffer;

function App() {
  return (
    <div className="App">
      <Providers>
        <PanelWrapper
          title="React - Solana"
          // sidebar={<Sidebar />}
          // header={<Header />}
          // footer={<Footer />}
        >
          {ROUTES}
        </PanelWrapper>
      </Providers>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
