export const EnvironmentDev = {
    // TODO load apiUrl from environment variable
    // apiUrl: process.env.REACT_APP_ATLAS_API_URL,
    apiUrl: process.env.REACT_APP_ATLAS_API_URL_DEV,
};

export const EnvironmentProd = {
    apiUrl: process.env.REACT_APP_ATLAS_API_URL_PROD || "",
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}

export default Environment;
