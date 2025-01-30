import styles from "./page.module.css";
import ConnectBrowser from "@/components/ConnectBrowser";
import ConnectMobile from "@/components/ConnectMobile";
import ConnectWaypoint from "@/components/ConnectWayPoint";
import WalletInfo from "@/components/WalletInfo";


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Extension Wallet</h1>
      <ConnectBrowser/>
      <h1>Mobile Wallet</h1>
      <ConnectMobile/>
      <h1>Waypoint Wallet</h1>
      <ConnectWaypoint/>
      <h1>Wallet Status</h1>
      <WalletInfo/>
    </main>
  );
}
