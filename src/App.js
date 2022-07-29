
import { ethers } from 'ethers';
import { useState } from 'react';
import '../src/App.css'
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './Components/pages/Home';
import Create from './Components/pages/Create';
import Categories from './Components/Categories';
import ModalBox from './Components/ModalBox';
import MyDigitalAsset from './Components/MyDigitalAsset';
import MYNFTS from './Components/MYNFTS';
import './App.css'
import Art from './Components/pages/Art';
import DetailPage from './Components/pages/DetailPage';

function App() {

  return (
    <>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/MyAsset' element={<MYNFTS />} />
        <Route path='/art' element={<Art filter="art" heading="Art Collection" para1="An online community of makers, developers, and traders is pushing the art world into new territory. It all started with CryptoPunks, a set of 10,000 randomly generated punks that proved demand for the digital ownership of non-physical items and collectibles in 2017, and the market has evolved rapidly ever since." para2="As the underlying technology develops, a growing pool of artists are selling verified, immutable works to art lovers and speculators, and the space as a whole is waking up to the power and potential of decentralized networks and currencies. With creators and collectors generating meaningful revenue through an entirely digital ecosystem, the tokenization of gifs, memes, and MP4s is emerging as the most exciting and relevant blockchain use case. From SuperRare to Josie to JOY, browse and trade NFTs from some of the world's top crypto artists on OpenSea." />} />
        <Route path='/photography' element={<Art filter="photography" heading="Photography Collection" para1="Photographers are taking the NFT world by storm, and we've got a selection of breathtaking collections from a growing and increasingly global community of creators right here on OpenSea." para2="Browse creations from Justin Aversano, Brooke DiDonato, Platon, The British Journal of Photography, and more." />} />
        <Route path='/sport' element={<Art filter="sport" heading="Sport Collection" para1="Sporting brands look after some of the most valuable intellectual property on the planet, and companies like Sorare are selling it in the form of digital trading cards right here on our marketplace. " para2="We've also got Formula 1 NFTs from Animoca Brands and anticipate a surge of interest from global sports teams looking to tokenize and distribute their collectibles over the coming years. Browse, buy, and sell non-fungible tokens from the worlds of golf, football, racing, and more." />} />
        <Route path='/music' element={<Art filter="music" heading="Music Collection" para1="Music NFTs are changing the way fans connect with their favorite artists. From 3LAU to Imogen Heap, all kinds of creators are innovating on the blockchain, and the appetite for change in an industry that so often underserves independent makers is clear." para2="Browse collections from The Weeknd, Richie Hawtin, RAC, and more." />} />
        <Route path='/services' element={<DetailPage/>} />
      </Routes>

    </>

  );
}

export default App;
