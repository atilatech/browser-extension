export const EnvironmentDev = {
    // TODO load apiUrl from environment variable
    // apiUrl: process.env.REACT_APP_ATLAS_API_URL,
    // The reason we use 127.0.0.1 for apiUrl and localhost for clientUrl
    // is simply due to convention.
    apiUrl: "http://127.0.0.1:8000",
    clientUrl: "'http://localhost:3000",
};

export const EnvironmentProd = {
    apiUrl: "https://atila-7.herokuapp.com",
    clientUrl: "https://atila.ca",
};


export const EnvironmentStaging = {
    apiUrl: "https://atila-7-staging.herokuapp.com",
    clientUrl: "https://staging.atila.ca",
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}

if (window.location.host === 'staging.atlas.atila.ca') {
    Environment = EnvironmentStaging;
} else if (window.location.host === 'atlas.atila.ca') {
    Environment =  EnvironmentProd;
}

export default Environment;
