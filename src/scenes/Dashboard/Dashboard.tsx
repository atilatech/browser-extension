import React from 'react'
import ContentList from '../../components/ContentList/ContentList'
import { Content } from '../../models/Content';

function Dashboard() {

  const sampleContents: Array<Content> = [{
    url: "https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d",
    title: "A beginner's guide to NFTs",
    description: "Non-fungible token (NFT) is a term used to describe a unique digital asset whose ownership is tracked on a blockchain, such as Ethereum. Assets that can be represented as NFTs range from digital goods, such as items that exist within virtual worlds, to claims on physical assets such as clothing items or real estate. In the coming years, we will see NFTs used to unlock entirely new use cases that are only made possible by crypto.\n",
    header_image_url: "https://images.mirror-media.xyz/nft/09865721-a967-4108-8ac2-ba91d413cfc9.jpeg",
  },
  {
    url: "https://ethereum.org/en/nft",
    title: "Non-fungible tokens (NFT) | ethereum.org",
    description: "An overview of NFTs on Ethereum",
    header_image_url: "https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/0f3ee/hero.png",
  },
  {
    url: "https://golden.com/wiki/Non-fungible_token_(NFT)-PBRM4DG",
    title: "Non-fungible token (NFT) - Wiki",
    description: "Non-fungible tokens are specialized types of cryptographic tokens that represent something unique or rare.",
    header_image_url: "https://media-thumbs.golden.com/fCYVc6611R9ue526XSlCHPm0GNA=/200x200/smart/golden-storage-production.s3.amazonaws.com%2Ftopic_images%2F519b95a6ccf448f885ed9f2cb9fdcf9f.png",
  }
];
  return (
    <div className="Dashboard">
        <div className="container card shadow p-5 mt-3">
          <h1 className="text-center">Saved Content </h1>
          <ContentList contents={sampleContents} />
        </div>
    </div>
  )
}

export default Dashboard