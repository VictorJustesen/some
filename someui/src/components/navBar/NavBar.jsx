import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link} from "react-router-dom"

import './navBar.scss'


import { useContext } from 'react';
import {DarkModeContext} from  "../../context/darkModeContext"
import {AuthContext} from '../../context/authContext'

const NavBar = () => {

  const {currentUser} = useContext(AuthContext)

  const {toggle, darkMode} =useContext(DarkModeContext)

  return (
    <div className='navbar'>
<div className="left">
<Link to="/" style={{textDecoration:"none"}}>
<span>DevConnect</span>
</Link>
<HomeOutlinedIcon/>
{darkMode ? <DarkModeOutlinedIcon onClick={toggle}/> : <WbSunnyOutlinedIcon onClick={toggle}/>}
<GridViewIcon/>
<div className='search'>
  <SearchOutlinedIcon/>
  <input type="text" placeholder='Search' />
</div>
</div>

<div className="right">

<EmailOutlinedIcon/>
<NotificationsOutlinedIcon/>
<div className='user'>
 
  <img src={currentUser.profilepic} alt="picture" className='userpic' />
  <span>{currentUser.name}</span>
</div>
</div>

    </div>
  )
}

export default NavBar