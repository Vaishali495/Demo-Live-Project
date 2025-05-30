import React from 'react'
import add_view from '../assets/add_view.svg'
import board_view from '../assets/board_view.svg'
import more from '../assets/more.svg'
import { useState } from 'react'
import TemplateDialogue from '../antd/templateDialogue'

const Navbar = ({mode,handleMyTaskOpen,handleAssingedTaskOpen}) => {

  return (
    <div className='flex justify-between items-center bg-white text-black text-md m-1'
    style={{
      background: mode ? "#ffffff" : "#2a2b2f", 
      color: mode? "#000000" : "#ffffff",  
    }}>
      <div className='flex items-center ml-5 space-x-8'
              style={{
                filter: mode ? "none" : "invert(.5) brightness(3)",
              }}>
        <div className='flex items-center space-x-2 hover:cursor-pointer active:border-bottom-black   font-medium'>
          <img src={board_view} alt="board_view" />
          <span onClick={handleMyTaskOpen}>My Tasks</span>
        </div>
        <div className='flex items-center space-x-2 hover:cursor-pointer font-medium'>
          <img src={add_view} alt="add_view" />
          <span onClick={handleAssingedTaskOpen}>Assigned Tasks</span>
        </div>
      </div>
      <div className='flex items-center mr-8 p-2 space-x-5'>
        <div className='hover:cursor-pointer font-medium'><button>Filter</button></div>
        <div className='hover:cursor-pointer'><button>Sort</button></div>
        <div className='hover:cursor-pointer'><img src={more} alt="more" /></div>
        <div className='hover:cursor-pointer'>
          {/* <button className='rounded-full bg-black text-white p-2' >New template</button> */}
          <TemplateDialogue />
          </div>
      </div>
    </div>
  )
}

export default Navbar
