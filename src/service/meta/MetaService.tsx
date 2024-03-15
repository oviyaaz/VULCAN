import {AlchemyResponse, CurrentUser, SERVER_URL} from "@/service/ServerDetail";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function synonymUpdate(user: CurrentUser): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "meta/synonym?tenantId=" + user.tenantId, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        toast.success("Synonym Edited Successfully", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return jsonBody
    });
}

export async function synonymDelete(user: CurrentUser, synonymId: number): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "meta/deleteSynonym/" + synonymId + user.tenantId, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).then(response => {
        let jsonBody: Promise<AlchemyResponse> = response.json();
        toast.success("Synonym Deleted Successfully", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return jsonBody
    });
}

export async function summaryGet(user: CurrentUser): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + "meta/summary?tenantId=" + user.tenantId, {
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

export async function getTable(user: CurrentUser,
                               pageNo: number, pageSize: number): Promise<AlchemyResponse> {
    return fetch(SERVER_URL + `meta/synonym/page/${pageNo}/${pageSize}?tenantId=` + user.tenantId, {
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