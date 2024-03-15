import {AlchemyResponse, CurrentUser, SERVER_URL} from "@/service/ServerDetail";
import {Workspace} from "../model/WorkspaceInterface";


export async function findAllWorkspace(user: CurrentUser): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "workspace/summary?tenantId=" + user.tenantId, {
        method: "GET",
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

export async function findOneWorkspace(user: CurrentUser, workspaceId: number): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "workspace/" + workspaceId + "?tenantId=" + user.tenantId, {
        method: "GET",
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

export async function findOneWorkspaceAsset(user: CurrentUser, originId: string): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "info/" + originId + "?tenantId=" + user.tenantId, {
        method: "GET",
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

export async function findPapersForWorkspaceAsset(user: CurrentUser, originId: string): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "info/paper/" + originId + "?tenantId=" + user.tenantId, {
        method: "GET",
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

export async function findAllAsset(user: CurrentUser, workflow: Workspace): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "workspace/"
        + workflow.workspaceId
        + "/assets", {
        method: "GET",
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

export async function addAsset(user: CurrentUser, workflow: Workspace, file: FormData): Promise<AlchemyResponse> {
    return fetch(
        SERVER_URL +
        "workspace/" +
        workflow.workspaceId +
        "/assets?tenantId=" +
        user.tenantId,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: file,
        }
    ).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        return jsonBody
    });
}

export async function getImage(user: CurrentUser, origin: string): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "info/paper/" + origin + "?tenantId=" + user.tenantId, {
        method: "GET",
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

export async function addWorkFlow(user: CurrentUser, requestBody: Workspace): Promise<AlchemyResponse> {
    return fetch(
        SERVER_URL +
        "workspace?tenantId=" +
        user.tenantId,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(requestBody),
        }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        return jsonBody
    });
}

export async function addAssetId(user: CurrentUser, workspaceName:string): Promise<AlchemyResponse> {
    return fetch(
        SERVER_URL +
        "meta/document?tenantId=" +
        user.tenantId,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({documentName:workspaceName}),
        }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        return jsonBody
    });
}
