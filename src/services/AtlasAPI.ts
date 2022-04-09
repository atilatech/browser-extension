import { Content } from "../models/Content";
import Environment from "./Environment";

class AtlasAPI {

    static DEFAULT_HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer':  `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
        'Origin': window.location.origin
        };

    static search = (query: string) => {

        const apiResponsePromise = fetch(`${Environment.apiUrl}/api/atlas/search/?q=${query}`, {
            method: 'GET',
            headers: AtlasAPI.DEFAULT_HEADERS,
        })
        .then(response => {
        try {
            return response.json()
        } catch(e) {
            return response
        }
        });

        return apiResponsePromise
    };

    static save = (content: Content) => {
        const apiResponsePromise = fetch(`${Environment.apiUrl}/api/atlas/save/`, {
            method: 'POST',
            headers: AtlasAPI.DEFAULT_HEADERS,
            body: JSON.stringify({content}),
        })
        .then(response => {
        try {
            return response.json()
        } catch(e) {
            return response
        }
        });
        return apiResponsePromise
};
}

export default AtlasAPI;