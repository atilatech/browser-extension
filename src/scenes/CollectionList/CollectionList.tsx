import React, { useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { Collection } from '../../models/Collection';
import AtlasAPI from '../../services/AtlasAPI';

function CollectionList() {
  const [collection, setCollection] = useState(new Collection());
  const [loading, setLoading] = useState("");
  
  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = () => {
    setLoading("Loading");
    console.log("window.location.search", window.location.search);
    const params = new URLSearchParams(window.location.search);
    AtlasAPI.getCollection(params.get('id') || '')
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
        {collection.contents.map(collectionContent => <ContentCard content={collectionContent.content} key={collectionContent.content.id} />)}
        </div>
    </div>
  )
}

export default CollectionList