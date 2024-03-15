'use client'

import React, {useEffect, useState} from "react";
import styles from "@/app/page.module.css";
import NavBar from '@/service/NavBar';
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import {Workspace} from "@/service/model/WorkspaceInterface";
import {AssetListLayout} from "@/app/vulcan/workspace/[workspaceId]/AssetListLayout";
import {findOneWorkspace} from "@/service/workspace/WorkspaceService";
import {useRouter} from "next/navigation";

export default function Page({params}: { params: { workspaceId: number } }) {

    const router = useRouter();

    useEffect(() => {
        const user = getUser();
        findOneWorkspace(user, params.workspaceId).then(value => {
            let workspace: Workspace = value.payload
            setSelectedWorkspace(workspace);
        });
    }, [params.workspaceId])


    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

    return (<main className={styles.main}>
        <NavBar/>
        <div className={styles.center}>
            {selectedWorkspace && (
                <AssetListLayout onSelectWorkspaceAsset={(workspaceSelected, workspaceAssetSelected) => {
                    router.push("/vulcan/workspace/" + workspaceSelected.workspaceId + "/" + workspaceAssetSelected.originId)

                }} workspace={selectedWorkspace}/>)}
        </div>
    </main>);

}