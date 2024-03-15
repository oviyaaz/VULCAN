import { Valuation } from "./Bbox";

export interface Workspace {

    workspaceKey: string,
    encode?: string,
    status?: string,
    tenantId?: string,
    workspaceId?: number,
    workspaceName: string,
}

export interface WorkspaceSummary {

    workspaceKey: string,
    encode?: string,
    status?: string,
    tenantId?: string,
    workspaceId?: number,
    workspaceName: string,
    assetCount:number,
    paperCount:number,
    lastUpdatedOn:string,
}

export interface WorkspaceAsset {
    extension: string;
    name: string;
    originId: string;
    previewEncode: string;
    rootPipelineId: number;
    size: number;
    status: string;
    updatedUserId: string;
    workspaceId: string;
    updatedOn: string;
}

export interface Truth {
    filename: string;
    pageNo: number;
    encode: string;
}

export interface question {
    question: string
}

export interface AutoQ {
    maxDoctrDiff: number,
    maxQuestionDiff: number,
    maxMultilineQuestionDiff: number,
}

export interface autoQValuation{
    encode:string,
    predictions:Valuation
}

export interface kvpDraftPayload{
    question: string,
}

export interface autoQDraftPayload{
    synonymName: string,
}