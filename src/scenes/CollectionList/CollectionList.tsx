import React, { useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { Collection } from '../../models/Collection';
import AtlasAPI from '../../services/AtlasAPI';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = (ipfsHttpClient as any)('https://ipfs.infura.io:5001/api/v0');

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

   const  exportCollection = async () => {
    const exportedCollection = collection.contents.map(content => ({url: content.content.url}));

    /* first, upload to IPFS */
    const data = JSON.stringify(exportedCollection);
    try {
      const added = await client.add(
        data,
        {
          progress: (prog: any) => console.log(`received: ${prog}`)
        }
      )
      
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log({url});

      AtlasAPI.updateCollection(collection.id, {exported_collection_url: url})
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
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  return (
    <div className="CollectionList">
        <div className="container card shadow p-5 mt-3">
        <button onClick={exportCollection}>
            Export collection
        </button>
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