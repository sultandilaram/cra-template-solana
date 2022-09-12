// Packages
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <section className="h100 w100 children-center flex-col" >
      <h1 style={{ width: 'auto' }} >React - Solana Template</h1>
      <WalletMultiButton />
    </section>
  )
}
