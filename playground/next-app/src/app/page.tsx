import Image from "next/image";
import styles from "./page.module.css";
import ConnectBrowser from "@/components/ConnectBrowser";
import ConnectMobile from "@/components/ConnectMobile";
import WalletInfo from "@/components/WalletInfo";


export default function Home() {
  return (
    <main className={styles.main}>
      Ronin Wallet - Wagmi Adapter
      <ConnectBrowser/>
      <ConnectMobile/>
      <WalletInfo/>
    </main>
  );
}
