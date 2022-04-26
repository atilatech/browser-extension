import React, { useEffect, useState } from 'react'
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
  
  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = () => {
    setLoading("Loading");
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
    
  }

  return (
    <div className="CollectionList">
        <div className="container card shadow p-5 mt-3">
        <div>Collection: {collection.title}</div>
        {collection.exported_collection_url && 
            <a href={collection.exported_collection_url} target="_blank" rel="noreferrer">
                View Exported Collection
            </a>
        }
        {collection.contents.map(collectionContent => <ContentCard content={collectionContent.content} key={collectionContent.content.id} />)}
        </div>
    </div>
  )
}

export default CollectionList