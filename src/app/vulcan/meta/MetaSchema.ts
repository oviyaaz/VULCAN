export interface container {
    sorContainerId: number;
    containerName: string;
    newInstance?: boolean;
}

export interface SorField {
    itemId: number;
    itemName: string;
    newInstance?: boolean;
}

export interface SorTEntity {
    sorTruthEntityId: number;
    truthEntity: string;
    newInstance?: boolean;
}

export interface WorkSpaceData {
    prefix: string,
    profileEncode: string,
    status: string,
    tenantId: string,
    workflowId: number,
    workflowName: string
}

export interface fieldData {
    status: string,
    itemId: number,
    itemName: string,
    allowedAdapter: null,
    restrictedAdapter: null,
    tenantId: string,
    wordLimit: null,
    wordThreshold: null,
    charLimit: null,
    charThreshold: null,
    validatorThreshold: null,
    allowedCharacters: null,
    comparableCharacters: null,
    restrictedAdapterFlag: null,
    containerId: number
}

export interface containerData {
    status: string,
    containerId: number,
    tenantId: string,
    containerName: string,
    votingOut: null
}

export interface truthEntity {
    status: string,
    truthEntityId: number,
    truthEntity: string,
    tenantId: string,
    document: document
}

export interface document {
    status: string,
    documentId: number,
    documentName: string,
    tenantId: string
}

export interface Synonym {
    synonymId: number;
    synonym: string;
    feature?: string;
    container?: container;
    sorTruthEntity?: SorTEntity;
    item?: SorField;
    truthEntity?: truthEntity;
    questionCount?: number;
    lowTouchCount?: number;
    highTouchCount?: number;
    zeroTouchCount?: number;
    isActive?: boolean;
    status?: string;
    questions: Question[];
    newInstance?: boolean;
}

export interface Question {
    idx?: number;
    question: string;
    lowTouchCount?: number;
    highTouchCount?: number;
    zeroTouchCount?: number;
    isActive?: boolean;
    status?: string;
    newInstance?: boolean;
}
