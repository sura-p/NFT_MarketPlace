import { Button } from './Button';
import React ,{useEffect, useState}from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
function Navbar(props) {

    const [click ,setclick] = useState(false);
    const [btton ,setbutton] = useState(true);
    const handelClick = ()=>{
        setclick(!click)
    }

    const closeMobileMenu =()=>{
        setclick(false)
    }
    
    const showButton=()=>{
        if(window.innerwidth <=960){
            setbutton(false);
            
        }
        else
        {
            setbutton(true);
        }
    }

    useEffect(()=>{
        showButton();
    },[]);

    window.addEventListener('resize',showButton);
  return (
    <>
    <nav className='navbar'>
       <div className="navbar-container">
          <Link to ='/' className="navbar-logo">
            NFTs Market
        </Link> 
        <div className="menu-icon" onClick={handelClick}>
                <i className={click ? 'fas fa-times' :'fas fa-bars'}></i>

        </div>
        <ul className={click ? 'nav-menu active' :'nav-menu'}>
            <li className="nav-item">
                <Link to ='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to ={`${props.link}`} className='nav-links' onClick={closeMobileMenu}>
                    {props.name}
                </Link>
            </li>

            <li className="nav-item">
                <Link to ={`${props.link3}`} className='nav-links' onClick={closeMobileMenu}>
                    {props.third}
                </Link>
            </li>

            <li className="nav-item">
                <Link to ={`${props.link4}`} className='nav-links' onClick={closeMobileMenu}>
                    {props.fourth}
                </Link>
            </li>
        </ul>
        {btton && <Button buttonStyle ='btn--outline'>Connect Wallet</Button>}
        
       </div> 
    </nav>
    </>
  )
}

export default Navbar