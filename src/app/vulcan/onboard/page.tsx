'use client'

import OnboardLayout from '@/app/vulcan/onboard/OnboardFormLayout';
import styles from "@/app/page.module.css";
import NavBar from '@/service/NavBar';

export default function Page() {

    return (
        <main className={styles.main}>
            <NavBar/>
            <div className={styles.center}>
                <OnboardLayout/>
            </div>
        </main>
    )
}