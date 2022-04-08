import Environment from "./Environment";

class AtlasAPI {

    static search = (query: string) => {
    
            // TODO add a test to ensure that that post scholarship is called with the correct format that the Atila API expects
            const apiResponsePromise = fetch(`${Environment.apiUrl}/api/search/?q=${query}`, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Referer':  `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
                'Origin': window.location.origin
                },
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