import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {nftmarketaddress} from '../templates/config'
import NFT_MarketPlace from './artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'

import Home from './Home'
import Cards from '../../Components/Cards'


export default function Sold_Nfts() {

    const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })

    const [account]= await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
      
    const marketContract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer)
   
    const data = await marketContract.fetchItemsListed()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await marketContract.uri(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        description:meta.data.description
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <>
    <Cards nfti={sold} heading="Sold Nfts"/>

   
    </>
  )
}
