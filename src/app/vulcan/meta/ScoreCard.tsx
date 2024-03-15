import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "@/app/page.module.css";

interface propType {
  label: string;
  count?: number;
  highLight?: boolean;
}

export default function ScoreCard(props: propType) {
  return (
    <Card
      sx={{
        // boxShadow: 2,
        borderRadius: "10px 10px 10px 10px",
        border: "2px solid #DEEDFF",
        backgroundColor: `${props.highLight ? "whitesmoke" : "white"}`,
        // borderBottom: `${props.highLight ? "1px solid blue" : "0px"}`,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "1.3rem !important",
          fontWeight: "600",
          padding: "2% 2% 0 2%",
        }}
        // sx={{color: "black"}}
        // subheaderTypographyProps={{variant: "h5"}}
      >
        {props.label}
      </Typography>
      <CardContent className={styles.grid__text__align}>
        {props.count === undefined || props.count >= 0 ? (
          <Typography
            className={styles.summaryText}
            sx={{ color: "#0055B4", padding: "2%" }}
            variant={"h3"}
          >
            {props.count}
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
}
