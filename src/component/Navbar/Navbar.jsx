import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Badge, Box, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react';
import "./Navbar.css"
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import Profile from '../Profile/Profile';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';


export const Navbar = () => {
  const {auth}=useSelector(store=>store)
  const navigate=useNavigate()
  const [isUser,setUser]=useState(false)
  const handleAvatarClick=()=>{
    if(auth.user?.role==="ROLE_CUSTOMER"){
      navigate("/my-profile/")
    }
    else
    {
      navigate("/admin/restaurant")
    }
  }
  return (
    <>
    <Box 
    className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#f5006a] lg:px-20 flex
    justify-between'>
  
    
       <div className='lg:mr-10 cursor-pointer flex items-center
        space-x-4'>
          <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2x1'>
            <i>FoodSphere</i>

          </li>

       </div>

    
  <div className='flex items-center space-x-2 la:space-x-10'>
          <div className=''>
            <IconButton onClick={()=> navigate("/search")}>
              <SearchIcon sx={{fontSize:"1.5rem"}}/>

            </IconButton>
          </div>
          
          <div className=''>

          {auth.user?<Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: pink.A400}}>{auth.user?.fullName[0].topUpperCase()}</Avatar>:
          <IconButton onClick={()=>
          navigate("/account/login")
          
          
          }>
            <Person/>
          </IconButton>}
          </div>
          <div className=''> 
           
            <IconButton  onClick={()=>navigate("/cart")}>
              
            
              <ShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
              
             
            </IconButton>
         
   </div>
           
           </div>



    </Box>
    
   
      </>
  );
};


