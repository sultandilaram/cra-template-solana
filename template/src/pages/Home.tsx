import { useProvider } from "react-solana"

export default function Home() {

  const { wallet } = useProvider();

  return (
    <section className="w100 children-center flex-col" style={{ height: "calc(100% - var(--header-height))" }} >
      <h1 style={{ width: 'auto' }} >{wallet.publicKey ? wallet.publicKey.toString() : "Please connect your wallet"}</h1>
    </section>
  )
}
