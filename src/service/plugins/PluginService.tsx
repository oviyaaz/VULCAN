import {AlchemyResponse, CurrentUser, SERVER_URL} from "../ServerDetail";
import {CheckboxDataTypes} from "../model/Plugins";
import {AutoQ, question, kvpDraftPayload, autoQDraftPayload} from "../model/WorkspaceInterface";

// export async function findCheckbox(
//   origin: string,
//   truthPageNo: number,
//   user: CurrentUser,
//   thresholdData: number
// ): Promise<CheckboxDataTypes[]> {
//   return fetch(
//     SERVER_URL +
//       "studio/plugin/checkbox/demo/paper/" +
//       origin +
//       "/" +
//       truthPageNo +
//       "?tenantId=" +
//       user.tenantId,
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + user.token,
//       },
//       body: JSON.stringify(thresholdData),
//     }
//   ).then((response) => {
//     let jsonBody: Promise<CheckboxDataTypes[]> = response.json();
//     return jsonBody;
//   });
// }

export async function doKvpApicall(
    originId: string | undefined,
    pageNo: Number,
    user: CurrentUser,
    model: string,
    question: question
): Promise<AlchemyResponse> {
    return fetch(
        `${SERVER_URL}studio/plugin/dqa/${originId}/${pageNo}/${model}?tenantId=${user.tenantId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(question),
        }
    ).then((res) => {
        let responseData: Promise<AlchemyResponse> = res.json();
        return responseData;
    });
}

export async function findCheckbox(origin: string, truthPageNo: number, user: CurrentUser, thresholdData: number): Promise<CheckboxDataTypes[]> {
    return fetch(SERVER_URL + "studio/plugin/checkbox/demo/paper/" + origin + "/" + truthPageNo +
        "?tenantId=" + user.tenantId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(thresholdData),
    }).then(response => {
        let jsonBody: Promise<CheckboxDataTypes[]> = response.json();
        return jsonBody
    });
}

export async function findTableDetection(user: CurrentUser, originId: string, pageNo: number, thresholdData: number) {
    return fetch(
        SERVER_URL +
        "studio/plugin/detection/table/" + originId + "/" + pageNo +
        "?tenantId=" +
        user.tenantId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({"threshold": thresholdData / 100})
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function findCheckBoxDetection(user: CurrentUser, originId: string, pageNo: number, thresholdData: number) {
    return fetch(
        SERVER_URL +
        "studio/plugin/detection/checkbox/" + originId + "/" + pageNo +
        "?tenantId=" +
        user.tenantId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({"threshold": thresholdData / 100})
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function findAutoQDetection(user: CurrentUser, originId: string, pageNo: number, payload: AutoQ) {
    return fetch(
        SERVER_URL +
        "studio/plugin/detection/auto-q/" + originId + "/" + pageNo +
        "?tenantId=" +
        user.tenantId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(payload)
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}


export const storeDraftData=(url:string,user:CurrentUser,payload:kvpDraftPayload|autoQDraftPayload)=>{
    return fetch(
        SERVER_URL+url+
        user.tenantId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(payload)
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function getSynonymn(user: CurrentUser, containerId: number, itemId: number) {
    return fetch(
        SERVER_URL +
        "meta/synonym/" + containerId + "/" + itemId +
        "?tenantId=" +
        user.tenantId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function getMetaContainer(user: CurrentUser) {
    return fetch(
        SERVER_URL +
        "meta/container" +
        "?tenantId=" +
        user.tenantId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function getMetaEntity(user: CurrentUser) {
    return fetch(
        SERVER_URL +
        "meta/container" +
        "?tenantId=" +
        user.tenantId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function getMetaField(user: CurrentUser) {
    return fetch(
        SERVER_URL +
        "meta/item/" +
        "?tenantId=" +
        user.tenantId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}

export async function metaSynonym(user: CurrentUser, sorDetailBody:any) {
    return fetch(
        SERVER_URL +
        "meta/synonym/" +
        "?tenantId=" +
        user.tenantId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(sorDetailBody)
        }).then((response) => {
        let jsonBody: Promise<any> = response.json();
        return jsonBody;
    })
}
