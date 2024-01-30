import Image from "next/image";
import styles from "./page.module.css";
import Connect from "@/components/Connect";

export default function Home() {
  return (
    <main className={styles.main}>
      Ronin Wallet - Wagmi Adapter
      <Connect/>
    </main>
  );
}
