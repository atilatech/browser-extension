import React, { useCallback, useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { Collection } from '../../models/Collection';
import AtlasAPI from '../../services/AtlasAPI';
export interface CollectionListProps {
    collectionId: string;
}

function CollectionList(props: CollectionListProps) {
  const [collection, setCollection] = useState(new Collection());
  const [loading, setLoading] = useState("");

  const { collectionId } = props;

  const getCollections = useCallback(
    () => {
      setLoading("Loading collection");
      AtlasAPI.getCollection(collectionId)
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
      
    },
    [collectionId],
  );

  
  useEffect(() => {
    getCollections();
  }, [getCollections]);
  

  return (
    <div className="CollectionList">
        <div className="container card shadow p-5 mt-3">

        {loading && 
            <div>
                {loading}
                <div className="spinner-grow text-primary m-3" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        }
        <div>Collection: {collection.title}</div>
          {collection.contents.map(collectionContent => <ContentCard content={collectionContent.content} key={collectionContent.content.id} />)}
        </div>
    </div>
  )
}

export default CollectionList