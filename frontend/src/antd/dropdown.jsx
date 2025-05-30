import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const dropdown = ({mode}) => {
  //console.log("ye aya dropDown mein props:",mode);
  const onClick = (e) => {
    //console.log('click ', e);
  };

  const items = [
    {
      key: 'sub1',
      label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Team</span>,
      children: [
        {
          key: '1',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 1</span>,
        },
        {
          key: '2',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 2</span>,
        },
        {
          key: '3',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 3</span>,
        },
      ],
    },
    {
      key: 'sub2',
      label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Project</span>,
      children: [
        {
          key: '4',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>All projects</span>,
        },
        {
          key: '5',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Design Systems</span>,
        },
        {
          key: '6',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>User flow</span>,
        },
      ],
    },
    {
      key: 'sub3',
      label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Task</span>,
      children: [
        {
          key: '7',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>All task (11)</span>,
        },
        {
          key: '8',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Todo (2)</span>,
        },
        {
          key: '9',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>In progress (4)</span>,
        },
      ],
    },
    {
      key: 'sub4',
      label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Reminder</span>,
      children: [
        {
          key: '10',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 1</span>,
        },
        {
          key: '11',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 2</span>,
        },
        {
          key: '12',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 3</span>,
        },
      ],
    },
    {
      key: 'sub5',
      label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Messengers</span>,
      children: [
        {
          key: '13',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 1</span>,
        },
        {
          key: '14',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 2</span>,
        },
        {
          key: '15',
          label: <span style={{ color: mode ? '#000000' : '#ffffff' }}>Option 3</span>,
        },
      ],
    },
  ];
  

  return (
<Menu
  onClick={onClick}
  style={{
    width: '100%',
    maxHeight: '100%', 
    overflowY: 'auto', 
    background: mode ? "#ffffff" : "#222327", 
    color: mode ? "#000000" : "#ffffff", 
  }}
  defaultSelectedKeys={['1']}
  defaultOpenKeys={['']}
  mode="inline" 
  items={items}
/>
  );
};

export default dropdown;
