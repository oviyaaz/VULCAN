import React, { useEffect, useState } from "react";
// import * as ApiService from "../../service/ApiService";
// import * as url from "../../service/url";
import Grid from "@mui/material/Grid";
import ScoreCard from "@/app/vulcan/meta/ScoreCard";
import styles from "@/app/page.module.css";
import { summaryGet } from "@/service/meta/MetaService";
import { CurrentUser } from "@/service/ServerDetail";
import { getUser } from "../workspace/WorkspaceListLayout";

export interface MetaSummary {
    sorContainerSize?: number;
    sorItemSize: number;
    sorSynonymSize: number;
    sorQuestionSize: number;
    sorTruthEntitySize:number;
}

export default function SummaryCard(props: { refresh: boolean, refreshUpdate: () => void }) {

    const [cardCount, setCardCount] = useState<MetaSummary>()
    const dataFetchedRef = React.useRef(false);
    const [isSummaryGet, setIsSummaryGet] = React.useState(false);
    const [user, setUser] = React.useState<CurrentUser>();
  useEffect(() => {
    const user = getUser();
    setUser(user);
    // handleWorkspaceList(user);
  }, []);
    useEffect(() => {
        console.log("SUMMARY PROPS", props.refresh,user)
        user && summaryGet(user).then(v => setCardCount(v.payload))
        props.refreshUpdate();
    }, [user])
    useEffect(() => {
        if (isSummaryGet) {
            user && summaryGet(user).then(v => setCardCount(v.payload))
            props.refreshUpdate();
        }
    }, [props.refresh])
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        user && summaryGet(user).then(v=>setCardCount(v.payload))
        props.refreshUpdate();
        setIsSummaryGet(true)
    }, []);

    console.log("card count",cardCount)

    return (
        <Grid container md={12} xs={12} spacing={1} className={styles.card__parent}>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Container"} count={cardCount?.sorContainerSize} />
                </Grid>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Field"} count={cardCount?.sorItemSize} />
                </Grid>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Synonym"} count={cardCount?.sorSynonymSize} />
                </Grid>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Question"} count={cardCount?.sorQuestionSize} />
                </Grid>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Entity"} count={cardCount?.sorTruthEntitySize} />
                </Grid>
            <Grid item md={2} xs={2}>
                <ScoreCard label={"Document"} count={10} />
            </Grid>
        </Grid>
    )
}