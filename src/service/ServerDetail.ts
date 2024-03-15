export const SERVER_URL: string = "http://192.168.10.240:8189/alchemy/api/v1/";


export class AlchemyResponse {

    success: boolean = false;
    errorMsg: string = "";
    errorCode: number = -1;
    payload: any;
}

export interface CurrentUser {
    username: string;
    tenantId: string;
    token: string;
    expireDatetime: Date;
    role: string;
}

interface PredictionsType {
    predictedValue: string;
    precision: number;
    fullAsset: boolean;
}

interface AnswersType {
    predictions: PredictionsType[];
    question: string;
}

export interface ValuationAnswer {
    answers: AnswersType[];
}
