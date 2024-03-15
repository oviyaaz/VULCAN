import * as React from "react";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";
import StepConnector, {stepConnectorClasses,} from "@mui/material/StepConnector";
import {StepIconProps} from "@mui/material/StepIcon";
import { TransactionAudit } from "@/service/model/Simulator";
import {Divider, Step, StepLabel, Stepper} from "@mui/material";
import {TransactionStatus} from "../chip/EnumChip";

interface Task {
    label: string;
    task: string;
    completed: boolean;
}

const QontoConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {borderColor: "green"},
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {borderColor: "green"},
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));
const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({theme, ownerState}) => ({
        color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center",
        ...(ownerState.active && {color: "green"}),
        "& .QontoStepIcon-completedIcon": {
            color: "green",
            zIndex: 1,
            fontSize: 18,
        },
        "& .QontoStepIcon-circle": {
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
        },
    })
);

function QontoStepIcon(props: StepIconProps) {
    const {active, completed, className} = props;
    return (
        <QontoStepIconRoot ownerState={{active}} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon"/>
            ) : (
                <div className="QontoStepIcon-circle"/>
            )}
        </QontoStepIconRoot>
    );
}

export default function TransactionStepper(props: {
    transactionAudits: TransactionAudit[];
}) {
    const [steps, setSteps] = useState<Task[]>([]);
    useEffect(() => {
        const initialSteps: Task[] = [
            {label: "Upload", task: "UPLOAD", completed: false},
            {label: "Itemization", task: "ITEMIZATION", completed: false},
            {
                label: "Candidate identification",
                task: "POTENTIAL_CANDIDATE",
                completed: false,
            },
            {label: "KVP extract", task: "KIE", completed: false},
            {label: "Classification", task: "CLASSIFICATION", completed: false},
        ];
        let newSteps = new Map<string, Task>();
        initialSteps.forEach((value) => newSteps.set(value.task, value));
        props.transactionAudits.forEach((value) => {
            let task = newSteps.get(value.transactionStage);
            if (task != null) {
                task.completed =
                    TransactionStatus[value.transactionStatus as keyof typeof TransactionStatus] ===
                    TransactionStatus.COMPLETED;
            }
        });
        let tasks: Task[] = [];
        newSteps.forEach((value) => tasks.push(value));
        setSteps(tasks);
    }, [props.transactionAudits]);
    return (
        <Stack sx={{width: "100%", margin: "50px 0 20px 0"}} spacing={4}>
            {<Stepper alternativeLabel activeStep={1} connector={<QontoConnector/>}>
                {steps.map((item) => (
                    <Step
                        key={item.task}
                        active={item.completed}
                        completed={item.completed}
                    >
                        <StepLabel
                            StepIconComponent={QontoStepIcon}>
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>}
            <Divider/>
        </Stack>
    );
}
