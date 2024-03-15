'use client'

import React from "react";
import styles from "@/app/page.module.css";
import NavBar from '@/service/NavBar';
import {WorkspaceListLayout} from "@/app/vulcan/workspace/WorkspaceListLayout";
import {useRouter} from "next/navigation";

export default function Page() {

    const router = useRouter();

    return (<main className={styles.main}>
        <NavBar/>
        <div className={styles.center}>
            <WorkspaceListLayout onSelectWorkspace={(workspace) => {
                router.push("/vulcan/workspace/" + workspace.workspaceId)
            }}/>
        </div>
    </main>);

}