// app/page.js
"use client";
import styles from './page.module.css';
import Link from 'next/link'; // Correct import for Next.js Link

export default function LandingPage() {
  return (
    <div className={styles.backgroundContainer}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/011/001/237/non_2x/haunted-house-halloween-background-free-vector.jpg" // Replace with your actual image URL
        alt="Landing Page Background"
        className={styles.backgroundImage}
      />
            <h1 className={styles.teamTitle}>TEAM FREDDY KRUEGER</h1>

      <div className={styles.overlay}>
        <Link href="/higher-or-lower">
          <h1 className={styles.enterText}>HIGHER OR LOWER</h1>
        </Link>
        <Link href="/pong">
          <h1 className={styles.enterText}>PONG</h1>
        </Link>
        <Link href="/memory-game  ">
          <h1 className={styles.enterText}>MEMORY GAME</h1>
        </Link>
      </div>
    </div>
  );
}
