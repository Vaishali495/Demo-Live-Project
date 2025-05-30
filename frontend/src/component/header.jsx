import React, { useState } from 'react';
import search from '../assets/search.svg';
import notifications from '../assets/notifications.svg';
import icons from '../assets/icon.svg';
import Profile from '../antd/profile.jsx';
import PfpModal from '../antd/pfpModal.jsx';
import { Tooltip } from 'antd';

const Header = ({ mode, name }) => {

  // const [showProfile, setShowProfile] = useState(false);

  // function handlePfp() {
  //   setShowProfile(!showProfile); // Toggle profile visibility
  // }

  return (
    <div>
      <div
        className='flex flex-col lg:flex-row justify-between items-center bg-white text-black'
        style={{
          background: mode ? '#ffffff' : '#2a2b2f',
          color: mode ? '#000000' : '#ffffff',
        }}
      >
        <div className='ml-5 text-2xl lg:text-xl font-medium'>
          Welcome Back, <span className='italic'>{name}</span>
        </div>
        <div
          className='flex items-center lg:mt-0 mr-8 p-3 space-x-4'
          style={{
            filter: mode ? 'none' : 'invert(1) brightness(0.8)',
          }}
        >
          <div className='w-8'>
            <button className='hover:bg-slate-600 hover:cursor-pointer rounded-full w-8 h-8 p-1'>
              <img src={search} alt='search' />
            </button>
          </div>
          <div className='w-8'>
            <button className='hover:bg-slate-600 hover:cursor-pointer rounded-full w-8 h-8 p-1'>
              <img src={notifications} alt='notification' />
            </button>
          </div>
          <div className='w-8'>
            <button className='hover:bg-slate-600 hover:cursor-pointer rounded-full w-8 h-8 p-1'>
              <img src={icons} alt='calendar' />
            </button>
          </div>
          <Tooltip title="Profile">
          <div className='w-8 m-1'>
              <PfpModal mode={mode}/>
          </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
