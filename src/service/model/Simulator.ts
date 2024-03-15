export interface Transaction {
    rootPipelineId: number;
    name: string;
    pipelineName: string;
    totalAssetCount: number;
    transactionStatus: string;
    startedOn: Date;
    timeTaken: string;
    updatedUserId: string;
}
export interface TransactionAsset {
    name: string;
    size: number;
    extension: string;
    progressPercent: number;
    originId: number;
    timeTaken: number;
    updatedOn: Date;
    latestTransactionAudit: TransactionAudit;
    transactionAudits: TransactionAudit[];
}
export interface TransactionAudit {
    transactionStage: string;
    transactionStatus: string;
    label: string;
}
export interface Valuation {
    originId?: number;
    pageNo: number;
    rootPipelineId?: string;
    feature?: string;
    precision: number;
    leftPos?: number;
    upperPos?: number;
    rightPos?: number;
    lowerPos?: number;
    predictedValue: string;
    label?: string;
    container?: string;
    field?: string;
    truthEntity?: string;
    synonym?: string;
    question?: string;
    state?: string;
}

export interface ValuationAnswer {
    answers: AnswersType[];
}

export interface PredictionsType {
    predictedValue: string;
    precision: number;
    fullAsset: boolean;
}

export interface AnswersType {
    predictions: PredictionsType[];
    question: string;
}

export interface PaperInfo {
    filename: string;
    pageNo: number;
    encode: string;
}
