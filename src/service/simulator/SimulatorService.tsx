import { AlchemyResponse, CurrentUser, SERVER_URL } from "../ServerDetail";

export async function addNewSimulate(user: CurrentUser, transaction: any, file: FormData): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "transaction/create?tenantId=" + user.tenantId + "&transactionRequest=" + transaction, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
        body: file,
    }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        return jsonBody
    });
}

export async function getSimulatorTable(user: CurrentUser, pageNo: number, pageSize: number): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "transaction/browse/page/" + pageNo + "/" + pageSize + "?tenantId=" + user.tenantId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        return jsonBody
    });
}
export async function simulatorDownload(user: CurrentUser, pipelineId: number): Promise<any> {
    return fetch(SERVER_URL + "transaction/export/" + pipelineId, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody
    });
}
export async function getValuation(user: CurrentUser, originId: number): Promise<any> {
    return fetch(SERVER_URL + "valuation/origin/" + originId + "/feature/KIE", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody
    });
}

export async function getAudit(user: CurrentUser, originId: number): Promise<any> {
    return fetch(SERVER_URL + "transaction/audit/origin/" + originId , {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody
    });
}
