import { Collection } from "../models/Collection";
import { Content } from "../models/Content";
import Environment from "./Environment";
import fetchHelper from "./FetchHelper";

class AtlasAPI {

    static atlasApiURL = `${Environment.apiUrl}/api/atlas`;
    static ATILA_API_CREDITS_PUBLIC_KEY_HEADER_NAME = 'X-ATILA-API-CREDITS-PUBLIC-KEY';
    static ATILA_API_CREDITS_PUBLIC_KEY_LOCAL_STORAGE_KEY_NAME = 'atlasAPIKeyCredit';
    static DEFAULT_HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer':  `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
        'Origin': window.location.origin
        };

    static getHeadersWithAPIKey = () => ({
        ...AtlasAPI.DEFAULT_HEADERS,
        [AtlasAPI.ATILA_API_CREDITS_PUBLIC_KEY_HEADER_NAME]: localStorage.getItem(AtlasAPI.ATILA_API_CREDITS_PUBLIC_KEY_LOCAL_STORAGE_KEY_NAME)
    })


    static getNewAPIKeyCredit = () => {
        return fetchHelper(`${Environment.apiUrl}/api/payment/api-key-credits/get-new-api-key-credit/`, {
            method: 'GET',
            headers: AtlasAPI.getHeadersWithAPIKey(),
        });
    };


    static getAPIKeyCreditByPublicKey = (publicKey: string) => {
        return fetchHelper(`${Environment.apiUrl}/api/payment/api-key-credits/public-key/?public_key=${publicKey}/`, {
            method: 'GET',
            headers: AtlasAPI.getHeadersWithAPIKey(),
        });
    };

    static search = (query: string) => {
        return fetchHelper(`${Environment.apiUrl}/api/atlas/search/?q=${query}`, {
            method: 'GET',
            headers: AtlasAPI.getHeadersWithAPIKey(),
        });
    };

    static save = (content: Content) => {
        return fetchHelper(`${Environment.apiUrl}/api/atlas/save/`, {
            method: 'POST',
            headers: AtlasAPI.getHeadersWithAPIKey(),
            body: JSON.stringify({content}),
        });
    };

    static login = ({username, password}: {username: string, password: string}) => {
        return fetchHelper(`${Environment.apiUrl}/api/login/`, {
            method: 'POST',
            headers: AtlasAPI.getHeadersWithAPIKey(),
            body: JSON.stringify({username, password}),
        });
    };

    static createCollection = (title: string, imported_collection_url: string, contents: Array<any>) => {
        return fetchHelper(`${AtlasAPI.atlasApiURL}/collection/`, {
            method: 'POST',
            headers: AtlasAPI.getHeadersWithAPIKey(),
            body: JSON.stringify({
                title,
                imported_collection_url,
                contents
            }),
        });
    }

    static list = () => {
        return fetchHelper(`${AtlasAPI.atlasApiURL}/collection/`, {
            method: 'GET',
        });
    }

    static getCollection = (collectionId: string) => {
        return fetchHelper(`${AtlasAPI.atlasApiURL}/collection/${collectionId}/`, {
            method: 'GET',
        });
    }

    static addToCollection = (collectionId: string, contents: Array<any>) => {
        return fetchHelper(`${AtlasAPI.atlasApiURL}/collection/${collectionId}/add-to-collection/`, {
            method: 'POST',
            headers: AtlasAPI.getHeadersWithAPIKey(),
            body: JSON.stringify({
                contents
            }),
        });
    }

    static updateCollection = (collectionId: string, updateData: Partial<Collection>) => {
        return fetchHelper(`${AtlasAPI.atlasApiURL}/collection/${collectionId}/`, {
            method: 'PATCH',
            headers: AtlasAPI.getHeadersWithAPIKey(),
            body: JSON.stringify(updateData),
        });
    }
}

export default AtlasAPI;
