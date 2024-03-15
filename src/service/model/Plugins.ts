export interface CheckboxDataTypes {
    state: string,
    fullAsset: boolean;
    leftPos: number;
    lowerPos: number;
    precision: number;
    predictedValue: string;
    rightPos: number;
    upperPos: number;
}

export interface Origin {
    name: string;
    size: number;
    status: string;
    originId: number;
}

export interface ValuationAnswer {
    answers: AnswersType[];
  }

  interface PredictionsType {
    predictedValue: string;
    precision: number;
    fullAsset: boolean;
    pageNo: number;
  }

  interface AnswersType {
    predictions: PredictionsType[];
    question: string;
  }
export interface Truth {
    filename: string;
    pageNo: number;
    encode: string;
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
