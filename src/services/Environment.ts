export const EnvironmentDev = {
    // TODO load apiUrl from environment variable
    // apiUrl: process.env.REACT_APP_ATLAS_API_URL,
    apiUrl: "http://127.0.0.1:8000",
};

export const EnvironmentProd = {
    apiUrl: process.env.ATLAS_API_URL || "",
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}

export default Environment;
