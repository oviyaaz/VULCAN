'use client'
import { Stack, Box, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react";
import styles from "@/app/page.module.css";
import SynonymOnboard from "./SynonymOnboard";
import SorOnboard from "./SorOnboard";
import SotOnboard from "./SotOnboard";

const OnboardLayout = () => {
    const [value, setValue] = useState('0');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue.toString());
    };
    return (
        <Stack
            className={styles.onboardContainer}
        >
            <Box sx={{width: "100%"}}>
                <TabContext value={value}>
                    <TabList sx={{width: "280px", backgroundColor: "white", borderRadius: "20px", margin:"25px 0 25px 210px"}}
                             onChange={handleChange}>
                        <Tab label="SOR" sx={{
                            backgroundColor: value === "0" ? "#FFA500" : "white",
                            padding: "12px 17px",
                            fontWeight: 700
                        }}/>
                        <Tab label="SOT" sx={{
                            backgroundColor: value === "1" ? "#FFA500" : "white",
                            padding: "12px 17px",
                            fontWeight: 700
                        }}/>
                        <Tab label="Synonym" sx={{
                            backgroundColor: value === "2" ? "#FFA500" : "white",
                            padding: "12px 16px",
                            fontWeight: 700
                        }}/>
                    </TabList>
                    <TabPanel value="0" className={styles.tabPanel}>
                        <SorOnboard/>
                    </TabPanel>
                    <TabPanel value="1" className={styles.tabPanel}>
                        <SotOnboard/>
                    </TabPanel>
                    <TabPanel value="2">
                        <SynonymOnboard />
                    </TabPanel>
                </TabContext>
            </Box>

        </Stack>
    )
}
export default OnboardLayout;