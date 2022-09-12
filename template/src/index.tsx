
/// Packages
import ReactDOM from 'react-dom/client';
import { Buffer } from "buffer";

/// Components
import Providers from './contexts/Providers';
import { PanelWrapper } from './wrappers';
import Home from './pages/Home';

/// Styles
import './styles/index.scss';
import '@solana/wallet-adapter-react-ui/styles.css'
import "react-toastify/dist/ReactToastify.css";

window.Buffer = window.Buffer || Buffer;

const ROUTES = [
  { route: '/home', element: <Home /> },
]

function App() {
  return (
    <div className="App">
      <Providers>
        <PanelWrapper
          title='React - Solana'
        // sidebar={<Sidebar />}
        // header={<Header />>}
        >{ROUTES}</PanelWrapper>
      </Providers>
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <App />
);