import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';

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
                    console.log({res});
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
        </div>
    )
}

export default Search