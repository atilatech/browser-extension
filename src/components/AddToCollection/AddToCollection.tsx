import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { Collection } from '../../models/Collection';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';
import Environment from '../../services/Environment';
import "./AddToCollection.css";

export interface AddToCollectionProps {
    content: Content,
}
function AddToCollection(props: AddToCollectionProps) {

  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const [collection, setCollection] = useState(new Collection());
  const [existingCollections, setExistingCollections] = useState<Array<Collection>>([])
  const [loading, setLoading] = useState("");

  const { content } = props;

  const updateCollection: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
        const value = event!.target!.value;
        const name = event.target.name;
        const updatedCollection = {
                ...collection,
                [name]: value,
        };
        setCollection(updatedCollection);
  };

  const getCollections = useCallback(
    () => {
        setLoading("Getting collections");
        AtlasAPI.list()
                  .then((res: any)=> {
                      console.log({res});
                      setExistingCollections(res.results);
                  })
                  .catch((err: any) => {
                      console.log({err});
                      setLoading("");
                  })
                  .finally(() => {
                      setLoading("");
                  })
        
      },
    [],
  );

  useEffect(() => {
    getCollections();
  }, [getCollections]);
  


  const createCollection = () => {
    setLoading("Creating Collection");
      AtlasAPI.createCollection(collection.title, collection.imported_collection_url, [{url: content.url}])
                .then((res: any)=> {
                    console.log({res});
                    setCollection(res);
                    getCollections();
                })
                .catch((err: any) => {
                    console.log({err});
                    setLoading("");
                })
                .finally(() => {
                    setLoading("");
                })
      
  }

  const addToCollection = (selectedCollectionId: string) => {
    AtlasAPI.addToCollection(selectedCollectionId, [{url: content.url}])
                .then((res: any)=> {
                    console.log({res});
                })
                .catch((err: any) => {
                    console.log({err});
                    setLoading("");
                })
                .finally(() => {
                    setLoading("");
                })
  }
  
  return (
    <div className="AddToCollection">
        <button onClick={()=>{setShowNewCollectionForm(!showNewCollectionForm)}} className="btn btn-link">
            {showNewCollectionForm ? 'Hide ' : 'Show '} Collections
        </button>
        {showNewCollectionForm && 
            <>
                <div>
                    <input name="title" placeholder="Collection Title"  className="mb-1"
                    onChange={updateCollection} value={collection.title} />
                    <button onClick={createCollection} className="btn btn-link">Save New Collection</button>
                </div>
                {existingCollections.length > 0 && 
                    <div>
                        <hr/>
                        <p>
                            Existing Collections
                        </p>
                    <ol>
                        {existingCollections.map(existingCollection => (
                        <li>
                            <a href={`${Environment.clientUrl}/collection/${collection.slug}`} target="_blank" rel="noreferrer">
                            {collection.title}
                            </a>

                            <button className="btn btn-link" onClick={() => {addToCollection(existingCollection.id)}}>
                                Add to Collection   
                            </button>             
                        </li>
                        ))}
                    </ol>
                    </div>
                }
            </>
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

export default AddToCollection