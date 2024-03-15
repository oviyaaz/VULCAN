import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import { Valuation } from "@/service/model/Simulator";

export default function TransactionValuationRow(props: { row: Valuation }) {
    return (
        <Card
            sx={{
                p: 1,
                width: "100%",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
        >
            <CardContent sx={{textAlign: "justify"}}>
                <Typography
                    sx={{fontWeight: "bold"}}
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    {props.row.field}
                </Typography>
                <Typography variant="body2" color="gray">
                    {"Synonym: " + props.row.synonym}
                </Typography>
                <Typography variant="body2" color="gray">
                    {"Question: " + props.row.question}
                </Typography>
                <CardContent sx={{display: "flex", p: 0}}>
                    <Typography variant="body1" color="gray">
                        {"Answer: "}
                    </Typography>
                    <Typography sx={{fontWeight: "bold"}} variant="body1" color="black">
                        {" " + props.row.predictedValue}
                    </Typography>
                </CardContent>
                <CardContent sx={{display: "flex", p: 0}}>
                    <Typography variant="body1" color="gray">
                        {"Confidence: "}
                    </Typography>
                    <Typography sx={{fontWeight: "bold"}} variant="body1" color="black">
                        {" " + props.row.precision * 100}
                    </Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}
