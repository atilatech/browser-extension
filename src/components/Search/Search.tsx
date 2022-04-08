import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';
import { TextUtils } from '../../services/utils/TextUtils';

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

            {searchResults && 
                <>
                <hr/>
                {searchResults.map(searchResult => <SearchResult content={searchResult} />)}
                </>
            }
        </div>
    )
}

export interface SearchResultProps {
    content: Content;
};

export function SearchResult(props: SearchResultProps) {

  const { content } = props;

  return (
    <div className="card shadow m-3 p-3">
      <a className="text-align-left" href={content.url} target="_blank" rel="noopener noreferrer">
          {content.title} <br/>
          {
          content.header_image_url && 
          <img src={content.header_image_url} width="150"
          alt={content.title} />
          }
      </a>
      <p>{TextUtils.truncate(content.description, 140)} </p>
    </div>
  )
}

export default Search