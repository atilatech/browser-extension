import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { APIKeyCredit } from '../../models/APIKeyCredit';
import AtlasAPI from '../../services/AtlasAPI';

function Settings() {

  const [apiKeyCredit, setApiKeyCredit] = useState<APIKeyCredit>({public_key: localStorage.getItem("atlasAPIKeyCredit") || ""});

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
            localStorage.setItem("atlasAPIKeyCredit", value);
        }
   };

   const loadApiKeyCredit = () => {
 
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
    };

    useEffect(() => {
        loadApiKeyCredit();
    }, [])



  return (
    <div className="Settings">
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

        {apiKeyCredit.search_credits_available && 
            <div>
                <h3>Available Credits</h3>
                <p>
                    Search credits available: {apiKeyCredit.search_credits_available}
                </p>
            </div>
        }

    </div>
  )
}

export default Settings