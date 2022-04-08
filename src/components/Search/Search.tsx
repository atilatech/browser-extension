import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';
import { ContentCard } from '../ContentCard/ContentCard';

function Search() {

   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState<Content[]>([])

   const updateSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.currentTarget.name === "searchQuery" && event.key === "Enter" && event.shiftKey === false) {
          event.preventDefault();
          AtlasAPI.search(searchQuery)
                .then(res=> {
                    const { results } = res;
                    setSearchResults(results);
                })
                .catch(err => {
                    console.log({err});
                })
        }
    }
    return (
        <div className="Search">
            <input value={searchQuery} className="form-control mb-3" onChange={updateSearch} onKeyDown={keyDownHandler} 
            name="searchQuery" placeholder="Enter Search Term" />

            {searchResults.length > 0 && 
                <>
                <hr/>
                {searchResults.map(searchResult => <ContentCard content={searchResult} />)}
                </>
            }
        </div>
    )
}



export default Search