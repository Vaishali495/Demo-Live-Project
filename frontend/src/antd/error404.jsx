import React from 'react';
import { Button, Result } from 'antd';
import {useNavigate} from "react-router-dom"

const error404 = () => {
  const Navigate =useNavigate()

  function handleClick()
  {
    Navigate("/login")
  }
return (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={handleClick}>Back Home</Button>}
  />
)}
export default error404;