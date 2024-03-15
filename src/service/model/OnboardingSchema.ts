export interface SorTypes {
    containerId: number,
    containerName: string,
    itemId: number,
    itemName: string,
    questionCount: number,
    synonymCount: number,
}

export interface SotTypes {
    documentId: number,
    documentName: string,
    questionCount: number,
    synonymCount: number,
    truthEntity: string,
    truthEntityId: number
}
export interface synonymTypes {
    itemId: number,
    containerId: number,
    truthEntityId: number,
    synonymName: string,
    synonymCategory: string,
    priorityIdx: number
}

export interface containerTypes {
    containerId: number;
    containerName: string;
    newInstance?: boolean;
  }
  export interface addContainerTypes {
    containerName: string;
    votingOut: number | null;
  }
  export interface addItemTypes {
    itemName: string;
    allowedAdapter: string;
    restrictedAdapter: string;
    wordLimit: number | null;
    wordThreshold: number | null;
    charLimit: number | null;
    charThreshold: number | null;
    validatorThreshold: number | null;
    allowedCharacters: string;
    comparableCharacters: string;
    restrictedAdapterFlag: number | null;
    containerId: number | null;
  }