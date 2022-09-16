import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ConfigProvider from './ConfigProvider';
import AuthProvider from './AuthProvider';
import WalletProviders from "./WalletProviders";


interface Props {
  children: React.ReactNode;
}
export default function Providers({ children }: Props) {

  return (
    <BrowserRouter>
      <ConfigProvider>
        <AuthProvider>
          <WalletProviders>
            {children}
            <ToastContainer
              position="bottom-left"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              style={{
                opacity: 0.8,
              }}
            />
          </WalletProviders>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
