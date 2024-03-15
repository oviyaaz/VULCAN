'use client'

import {useRouter} from 'next/navigation'
import styles from "@/app/page.module.css";
import NavBar from '@/service/NavBar';
import Meta from '@/app/vulcan/meta/Meta';

export default function Page() {
    const router = useRouter()

    return (
        <main className={styles.main}>
            <NavBar/>
            <div className={styles.metacontainer}>
            <Meta />
         </div>
        </main>
    );
}