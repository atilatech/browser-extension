import React, { useEffect, useState } from 'react'
import { SavedContent } from '../../models/Content';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { ContentTable } from './ContentTable';


const sampleContents: Array<SavedContent> = [
  {
    content: {
      url: "https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d",
      title: "A beginner's guide to NFTs",
      description: "Non-fungible token (NFT) is a term used to describe a unique digital asset whose ownership is tracked on a blockchain, such as Ethereum. Assets that can be represented as NFTs range from digital goods, such as items that exist within virtual worlds, to claims on physical assets such as clothing items or real estate. In the coming years, we will see NFTs used to unlock entirely new use cases that are only made possible by crypto.\n",
      header_image_url: "https://images.mirror-media.xyz/nft/09865721-a967-4108-8ac2-ba91d413cfc9.jpeg",
    },
    notes: "Aavegotchi example and shows how gamin relates to DeFi",
    date_created: "2022-03-31T12:45:09.050Z",
    date_modified: "2022-03-31T12:45:09.050Z",
  },
  {
    content: {
      url: "https://ethereum.org/en/nft",
      title: "Non-fungible tokens (NFT) | ethereum.org",
      description: "An overview of NFTs on Ethereum",
      header_image_url: "https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/0f3ee/hero.png",
    },
    notes: "See references for other articles I might like.",
    date_created: "2022-03-31T12:45:09.050Z",
    date_modified: "2022-03-31T12:45:09.050Z",
  },
 {
    content: {
      url: "https://golden.com/wiki/Non-fungible_token_(NFT)-PBRM4DG",
      title: "Non-fungible token (NFT) - Wiki",
      description: "Non-fungible tokens are specialized types of cryptographic tokens that represent something unique or rare.",
      header_image_url: "https://media-thumbs.golden.com/fCYVc6611R9ue526XSlCHPm0GNA=/200x200/smart/golden-storage-production.s3.amazonaws.com%2Ftopic_images%2F519b95a6ccf448f885ed9f2cb9fdcf9f.png",
    },
    notes: "Good explanations of the difference betwen ERC-721, ERC-1155 and ERC-998",
    date_created: "2022-03-31T12:45:09.050Z",
    date_modified: "2022-03-31T12:45:09.050Z",
  },
];

function ContentList() {

  const [contents, setContents] = useState<Array<SavedContent>>([])

  useEffect(() => {
    if(!chrome.storage) {
      // TODO find a way to globally use mock data for all chrome API calls if ATILA_MOCK_API_DATA === "true"
      setContents(sampleContents)
      return;
    }

    StorageHelper.performAction(ActionTypes.GET, "savedContent", null, (response) => {
      setContents(Object.values(response.items || []));
    })

    const storageChangedListener = (storageChange: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
      console.log({storageChange, areaName});
      const { savedContent } = storageChange;
      if (savedContent && savedContent.oldValue !== savedContent.newValue) {
        setContents(Object.values(savedContent.newValue || []));
      }
    };
    chrome.storage.onChanged.addListener(storageChangedListener);
    return () => chrome.storage.onChanged.removeListener(storageChangedListener);
}, []);
  
  return (
    <div>
      <ContentTable contents={contents} />
    </div>
  )

}


export default ContentList