import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ConfigProvider from './ConfigProvider';
import BaseProvider from './BaseProvider';
import WalletProviders from "./WalletProviders";


interface Props {
  children: React.ReactNode;
}
export default function Providers({ children }: Props) {

  return (
    <BrowserRouter>
      <ConfigProvider>
        <BaseProvider>
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
        </BaseProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
