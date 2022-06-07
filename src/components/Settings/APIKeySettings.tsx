import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { APIKeyCredit } from '../../models/APIKeyCredit';
import AtlasAPI from '../../services/AtlasAPI';

function APIKeySettings() {

  const [apiKeyCredit, setApiKeyCredit] = useState<APIKeyCredit>({public_key: localStorage.getItem("atlasAPIKeyCredit") || ""});
  const [loading, setLoading] = useState("");

  const updateApiKeyCredit: ChangeEventHandler<HTMLInputElement> = (event) => {

        event.preventDefault();
        const value = event!.target!.value;
        const name = event.target.name;
        if (name === "public_key") {
            const updatedApiKeyCredit = {
                ...apiKeyCredit,
                [name]: value,
            }
            setApiKeyCredit(updatedApiKeyCredit);
            // a full public key has 32 characters, so fetch credit details when a full key is received
            if(apiKeyCredit.public_key?.length >= 32) {
                localStorage.setItem("atlasAPIKeyCredit", value);
            }
        }
  };

  const loadApiKeyCredit = useCallback(
    () => {
        // a full public key has 32 characters, so fetch credit details when a full key is received
        if(apiKeyCredit.public_key?.length >= 32) {
            setLoading("Loading API key...");
            AtlasAPI.getAPIKeyCreditByPublicKey(apiKeyCredit.public_key)
            .then((res: any)=> {
               const { results } = res;
               if (results.length > 0) {
                   setApiKeyCredit(results[0]);
               }
           })
           .catch((err: any) => {
               console.log({err});
           })
           .then(()=> {
            setLoading("");
           })

        }
    },
    [apiKeyCredit.public_key]
  );

    useEffect(() => {
        loadApiKeyCredit();
    }, [loadApiKeyCredit])



  return (
    <div className="APIKeySettings">
        <label htmlFor="public_key">
            API Key
        </label>
        <input value={apiKeyCredit.public_key} className="form-control mb-3" onChange={updateApiKeyCredit}
            name="public_key" placeholder={"Enter Your public key"} />

            <p>
                <a className="text-align-left" href="https://atila.ca/atlas" target="_blank" rel="noopener noreferrer">
                    Get more credits at atila.ca/atlas
                </a>
            </p>

        {!Number.isNaN(apiKeyCredit.search_credits_available) && 
            <div>
                <h3>Available Credits</h3>
                <p>
                    Search credits available: {apiKeyCredit.search_credits_available}
                </p>
            </div>
        }
        {loading && 
            <div>
                {loading}
                <div className="spinner-grow text-primary m-3" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        }

    </div>
  )
}

export default APIKeySettings