import {Chip} from "@mui/material";
import React from "react";

export enum Feature {
    CLASSIFICATION,
    KIE,
    CHECKBOX_DETECT,
    CHECKBOX_EXTRACTION,
    CHECKBOX_QA,
    TABLE_DETECTION,
    TABLE_EXTRACT,
    KVP,
}

export enum TransactionStage {
    UPLOAD,
    ITEMIZATION,
    POTENTIAL_CANDIDATE,
    CLASSIFICATION,
    KIE,
    CHECKBOX_EXTRACTION,
    TABLE_DETECTION,
    FACE_EXTRACTION,
    EXPORT,
}

export enum TransactionStatus {
    STAGED,
    STARTED,
    IN_PROGRESS,
    PAUSED,
    FAILED,
    COMPLETED,
    RESTARTED,
    CANCELLED,
}

interface IFeature {
    label: string;
    size: string;
    color: string;
    text: string;
}

export class EnumConfig {
    featureMap: Map<Feature, IFeature> = new Map<Feature, IFeature>([
        [
            Feature.CHECKBOX_DETECT,
            {
                label: "Checkbox detected",
                size: "small",
                color: "#ba68c8",
                text: "#ffff",
            },
        ],
        [
            Feature.CLASSIFICATION,
            {
                label: "Classification",
                size: "small",
                color: "#fce4ec",
                text: "#ffff",
            },
        ],
        [
            Feature.KIE,
            {label: "KIE", size: "small", color: "#1e88e5", text: "#fff"},
        ],
        [
            Feature.KVP,
            {label: "KIE", size: "small", color: "#1e88e5", text: "#fff"},
        ],
        [
            Feature.CHECKBOX_EXTRACTION,
            {
                label: "Checkbox Extraction",
                size: "small",
                color: "#7986cb",
                text: "#ffff",
            },
        ],
        [
            Feature.CHECKBOX_QA,
            {label: "Checkbox QA", size: "small", color: "#64b5f6", text: "#ffff"},
        ],
        [
            Feature.TABLE_DETECTION,
            {
                label: "Table Detection",
                size: "small",
                color: "#4fc3f7",
                text: "#ffff",
            },
        ],
        [
            Feature.TABLE_EXTRACT,
            {
                label: "Table Extraction",
                size: "small",
                color: "#4dd0e1",
                text: "#ffff",
            },
        ],
    ]);

    transactionStageMap: Map<TransactionStage, IFeature> = new Map<
        TransactionStage,
        IFeature
    >([
        [
            TransactionStage.UPLOAD,
            {label: "Upload", size: "small", color: "#ba68c8", text: "#ffff"},
        ],
        [
            TransactionStage.ITEMIZATION,
            {label: "Itemization", size: "small", color: "#ba68c8", text: "#ffff"},
        ],
        [
            TransactionStage.POTENTIAL_CANDIDATE,
            {
                label: "Potential Candidate",
                size: "small",
                color: "#ba68c8",
                text: "#ffff",
            },
        ],
        [
            TransactionStage.CLASSIFICATION,
            {
                label: "Classification",
                size: "small",
                color: "#fce4ec",
                text: "#ffff",
            },
        ],
        [
            TransactionStage.KIE,
            {label: "KIE", size: "small", color: "#9575cd", text: "#ffff"},
        ],
        [
            TransactionStage.CHECKBOX_EXTRACTION,
            {
                label: "Check box Extraction",
                size: "small",
                color: "#7986cb",
                text: "#ffff",
            },
        ],
        [
            TransactionStage.TABLE_DETECTION,
            {
                label: "Table Detection",
                size: "small",
                color: "#4fc3f7",
                text: "#ffff",
            },
        ],
        [
            TransactionStage.FACE_EXTRACTION,
            {
                label: "Face Extraction",
                size: "small",
                color: "#90a4ae",
                text: "#ffff",
            },
        ],
        [
            TransactionStage.EXPORT,
            {label: "Export", size: "small", color: "#fff176", text: "#ffff"},
        ],
    ]);

    transactionStatusMap: Map<TransactionStatus, IFeature> = new Map<
        TransactionStatus,
        IFeature
    >([
        [
            TransactionStatus.COMPLETED,
            {label: "Completed", size: "small", color: "#28a745", text: "#ffff"},
        ],
        [
            TransactionStatus.STAGED,
            {label: "Staged", size: "small", color: "#4db6ac", text: "#ffff"},
        ],
        [
            TransactionStatus.STARTED,
            {label: "Started", size: "small", color: "#ffb74d", text: "#ffff"},
        ],
        [
            TransactionStatus.IN_PROGRESS,
            {label: "In Progress", size: "small", color: "#ffc107", text: "#ffff"},
        ],
        [
            TransactionStatus.PAUSED,
            {label: "Upload", size: "small", color: "#", text: "#ffff"},
        ],
        [
            TransactionStatus.FAILED,
            {label: "Failed", size: "small", color: "#f44336", text: "#ffff"},
        ],
        [
            TransactionStatus.CANCELLED,
            {label: "Cancelled", size: "small", color: "#ff5722", text: "#ffff"},
        ],
        [
            TransactionStatus.RESTARTED,
            {label: "Restarted", size: "small", color: "#dce775", text: "#ffff"},
        ],
    ]);

    createFeatureChip(value: string) {
        const enumValue = Feature[value as keyof typeof Feature];
        return this.createChip(this.featureMap.get(enumValue));
    }

    createTransactionStatusChip(value: string) {
        const enumValue = TransactionStatus[value as keyof typeof TransactionStatus];
        return this.createChip(this.transactionStatusMap.get(enumValue));
    }

    createTransactionStageChip(value: string) {
        const enumValue = TransactionStage[value as keyof typeof TransactionStage];
        return this.createChip(this.transactionStageMap.get(enumValue));
    }

    createChip(feature: IFeature | undefined) {
        if (feature !== undefined) {
            return (
                <Chip
                    label={feature.label}
                    sx={{backgroundColor: feature.color, color: feature.text}}
                    size={"medium"}
                />
            );
        }
        return <>NA</>;
    }
}
