import React, { useEffect} from 'react'
import NFT_MarketPlace from './templates/artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ethers } from "ethers";
import { nftmarketaddress} from './templates/config'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import "./Forms.css"
import "./Cards.css"
import Created_Nfts from './templates/Created_Nfts';
import Sold_Nfts from './templates/Sold_Nfts';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

 function Forms() {
 
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '',categories:'',file1:'' })
  const [formErrors,setFormError]= useState({});
   const [iscreated,setiscreated]= useState(true);
  const [disable , setdisable]= useState(false)


    



  const validate =(val)=>{
      const errors = {};
      const regex= /^.{100,200}$/;
      if(!val.file1){
        errors.file1 = "Upload file"
        
      }
      if(!val.price){
        errors.price = "Give the price"
        
      }
      if(!val.description){
        errors.description = "Give the description"
       
      }else if(!regex.test(val.description)){
        errors.description='minimum 100 character'
      
      }
      if(!val.name){
        errors.name = "Give the name"
       
      }
      if(!val.categories){
        errors.categories = "category is not selected"
      
      }
      return errors;
  };
  
  

  useEffect(()=>{
    setFormError(validate(formInput));
    console.log(formErrors);
    if(Object.keys(formErrors).length===0 && iscreated){
      
    }
  },[formInput]);
 
 
  async function onChange(e) {
    const file = e.target.files[0]
    updateFormInput({...formInput, file1:file} )
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }



  async function createMarket(e) {
    e.preventDefault();
   
    const { name, description, price ,categories} = formInput
   
     

    // if (!name || !description || !price || !amount || !fileUrl) return

    console.log(formInput.name);
    console.log(formInput.price);
    // console.log(formInput.amount);
   
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, price, image: fileUrl,categories
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    
      createSale(url)

    } catch (error) {
      console.log('Error uploading file: ', error)
    }
   
   // clearText();
  }


  async function createSale(url) {
    const [account]=await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum);   
  const signer = provider.getSigner()
   const price = ethers.utils.parseUnits(formInput.price, 'ether')
  console.log(signer);
   console.log(formInput.price.toString())
  // console.log(formInput.amount)        

 //  amount=1;
   /* next, create the item */
   let contract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer)
  // let messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
      const message = `Welcome to NFT Market ! \nClick to sign in and accept the NFT Market Place  Terms of Service:http://localhost:3000\n\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet\taddress : ${account}`
      ;
   let messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
    console.log(messageHash);
  const x = await signer.signMessage(ethers.utils.arrayify(messageHash))
      console.log(x);
 
   const y = await ethers.utils.splitSignature(x);
   console.log(y);
   let transaction = await contract.mintToken(url,1,price.toString(), { gasLimit: 500000}) 
   
   console.log(transaction);

  


 
}

  return (
    <>
      <div className='main-form-container'>


        <div className='form container2'>
          <Form >
            <h1>Create NewItem</h1><br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Choose File</Form.Label>
              <Form.Label></Form.Label>
              <Form.Control type="file" placeholder="Drop File" onChange={onChange} required></Form.Control>

            </Form.Group>
            <p>{formErrors.file1}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control  required type="Text" placeholder="give Name to your NFT" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
            </Form.Group>
            <p>{formErrors.name}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control required as="textarea" placeholder="Description" onChange={e => updateFormInput({ ...formInput, description: e.target.value })} />
              <Form.Text className="text-muted">The description will be included on the item's detail page underneath its image. Markdown syntax is supported. Atleast 50 words</Form.Text>
            </Form.Group>
            <p>{formErrors.description}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control required type="number" placeholder="give Name to your NFT" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />
            </Form.Group>
            <p>{formErrors.price}</p>
            <Form.Label>Select category</Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => updateFormInput({ ...formInput, categories: e.target.value })} required>
            <option >select</option>
              <option value="art">Art</option>
              <option value="music">Music</option>
              <option value="sport">Sport</option>
              <option value="photography">Photography</option>
              <option value="adventure">Adventure</option>
              <option value="luxry">Luxury</option>
            </Form.Select>
            <p>{formErrors.categories}</p>
            <br />
           
            <Button disabled={disable} variant="primary" type="submit" onClick={createMarket} >
              create
            </Button>
          </Form>

        </div>
        <div className='form container3'></div>



        <div className='card-items'>
        
          <ul className='cards__items'>
            <Created_Nfts/>
            
          </ul>


        </div>



        <div className="card-items">

          <ul className='cards__items'>
            <Sold_Nfts/>
          </ul>




        </div>

      </div>




    </>
  )
}

export default Forms