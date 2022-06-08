import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';
import { ContentCard } from '../ContentCard/ContentCard';

const chrome: Window["chrome"] = window.chrome || {};

function Search() {

   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState<Content[]>([]);
   const [initializingAPIKey, setInitializingAPIKey] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [loading, setLoading] = useState("");

   const updateSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    useEffect(() => {

        chrome.storage?.sync.get(['hasAtlasAPIKeyCredit'], function(result) {

            const { hasAtlasAPIKeyCredit } = result;
            console.log('Value currently is ', { result });

            if (!hasAtlasAPIKeyCredit) {
                initializeSearchAPIKeyCredit();
            }

        });
        
      }, []);

    const initializeSearchAPIKeyCredit = () => {
        const atlasAPIKeyCredit = localStorage.getItem('atlasAPIKeyCredit');
        if (!atlasAPIKeyCredit) {
            setInitializingAPIKey("Initializing API Key...");
            AtlasAPI.getNewAPIKeyCredit()
                    .then((res: any)=> {
                        console.log({res});
                        const { api_key_credit } = res;
                        localStorage.setItem('atlasAPIKeyCredit', api_key_credit.public_key);
                    })
                    .catch((err: any) => {
                        console.log({err});
                    })
                    .then(()=> {
                        setInitializingAPIKey("");
                    })
        }
    }

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.currentTarget.name === "searchQuery" && event.key === "Enter" && event.shiftKey === false) {
          event.preventDefault();
          setErrorMessage("");
          setLoading("Loading search results");
          AtlasAPI.search(searchQuery)
                .then((res: any)=> {
                    const { results } = res;
                    setSearchResults(results);
                })
                .catch((err: any) => {
                    console.log({err});
                    setErrorMessage(err.error || JSON.stringify(err));
                })
                .finally(() => {
                    setLoading("");
                })
        }
    }
    return (
        <div className="Search">
            <input value={searchQuery} className="form-control mb-3" onChange={updateSearch} onKeyDown={keyDownHandler}
            disabled={!!initializingAPIKey}
            name="searchQuery" placeholder={initializingAPIKey || "Enter Search Term"} />
            
            {initializingAPIKey && 
                <div>
                    {initializingAPIKey}
                    <div className="spinner-grow text-primary m-3" role="status">
                    <span className="sr-only"/>
                    </div>
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
            {errorMessage && 
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            }

            {searchResults?.length > 0 && 
                <>
                <hr/>
                {searchResults.map(searchResult => <ContentCard content={searchResult} key={searchResult.id || searchResult.objectID} />)}
                </>
            }
        </div>
    )
}



export default Search