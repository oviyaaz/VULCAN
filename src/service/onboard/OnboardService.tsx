import { CurrentUser, SERVER_URL } from "../ServerDetail";
import { synonymTypes } from "../model/OnboardingSchema";
import { addItemTypes } from "../model/OnboardingSchema";
import { addContainerTypes } from "../model/OnboardingSchema";
import { containerTypes } from "../model/OnboardingSchema";

export async function getSor(user: CurrentUser): Promise<any> {
  return fetch(SERVER_URL + "meta/itemDetails?tenantId=" + user.tenantId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  }).then((response) => {
    let jsonBody: Promise<any> = response.json();
    return jsonBody;
  });
}

export async function getSot(user: CurrentUser): Promise<any> {
    return fetch(SERVER_URL + "meta/entityDetails?tenantId=" + user.tenantId, {
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
export async function addSynonym(user: CurrentUser, payload: synonymTypes, documentId: number): Promise<synonymTypes> {
    return fetch(SERVER_URL + "meta/synonym/" + documentId + "?tenantId=" + user.tenantId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(payload),
    }).then(response => {
        let jsonBody: Promise<synonymTypes> = response.json();
        return jsonBody
    });
}

export async function getContainer(user: CurrentUser): Promise<containerTypes> {
  return fetch(SERVER_URL + "meta/container?tenantId=" + user.tenantId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  }).then((response) => {
    let jsonBody: Promise<containerTypes> = response.json();
    return jsonBody;
  });
}
export async function addContainer(
  user: CurrentUser,
  payload: addContainerTypes
): Promise<addContainerTypes> {
  return fetch(SERVER_URL + "meta/container?tenantId=" + user.tenantId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    let jsonBody: Promise<addContainerTypes> = response.json();
    return jsonBody;
  });
}

export async function addItem(
  user: CurrentUser,
  payload: addItemTypes
): Promise<addItemTypes> {
  return fetch(SERVER_URL + "meta/item?tenantId=" + user.tenantId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    let jsonBody: Promise<addItemTypes> = response.json();
    return jsonBody;
  });
}
export async function getDocument(user: CurrentUser): Promise<any> {
  return fetch(SERVER_URL + "meta/document?tenantId=" + user.tenantId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  }).then((response) => {
    let jsonBody: Promise<any> = response.json();
    return jsonBody;
  });
}
export async function addDocument(
  user: CurrentUser,
  payload: { documentName: string }
): Promise<addItemTypes> {
  return fetch(SERVER_URL + "meta/document?tenantId=" + user.tenantId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    let jsonBody: Promise<addItemTypes> = response.json();
    return jsonBody;
  });
}
export async function addsot(
  user: CurrentUser,
  payload: { truthEntity: string },
  documentId: number
): Promise<addItemTypes> {
  return fetch(
    SERVER_URL + "meta/entity/" + documentId + "?tenantId=" + user.tenantId,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(payload),
    }
  ).then((response) => {
    let jsonBody: Promise<addItemTypes> = response.json();
    return jsonBody;
  });
}
