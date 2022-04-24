import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Collection } from '../../models/Collection';
import { Content } from '../../models/Content';
import AtlasAPI from '../../services/AtlasAPI';


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
        console.log({updatedCollection});
        setCollection(updatedCollection);
  };

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = () => {
    setLoading("Loading");
    AtlasAPI.getCollections(collection.title, [{url: content.url}])
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
    
  }


  const createCollection = () => {
    setLoading("Loading");
      AtlasAPI.createCollection(collection.title, [{url: content.url}])
                .then((res: any)=> {
                    console.log({res});
                    setCollection(res);
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
    <div>
        <button onClick={()=>{setShowNewCollectionForm(true)}}>
            Show Collections
        </button>
        {showNewCollectionForm && 
            <>
                <div>
                    <input name="title" placeholder="Collection Title" onChange={updateCollection} value={collection.title} />
                    <button onClick={createCollection}>Save Collection</button>
                </div>
                {existingCollections.length > 0 && 
                <ol>
                    {existingCollections.map(existingCollection => (
                    <li>
                        <a href={`/collection/?id=${existingCollection.id}`}>
                        {existingCollection.title}
                        </a>
                    

                        <button onClick={() => {addToCollection(existingCollection.id)}}>
                            Add to Collection   
                        </button>             
                    </li>
                    ))}
                </ol>
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