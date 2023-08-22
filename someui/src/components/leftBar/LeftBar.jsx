
import './leftBar.scss'

import PeopleIcon from '@mui/icons-material/People';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext } from 'react';
import {AuthContext} from '../../context/authContext'
import {Link} from "react-router-dom"

const Leftbar = () => {

  //const test = () => {console.log(currentUser)}

  const {currentUser} = useContext(AuthContext)

  return (
   
    <div className='leftbar'>

    <div className='container'>

      <div className="menu">
<Link to={`/profile/${currentUser.id}`} style={{textDecoration: 'none'}}>
      <div className='user'>
 <img src={"/upload/"+currentUser.profilepic} alt="picture" className='userpic' />
 <span>{currentUser.name}</span>
</div>
</Link>

<Link to={`/relationships/${currentUser.id}`} >
<PeopleIcon />
<span>friends</span>
</Link>

<div>
< BookmarkIcon/>
<span>saved</span>
</div>

<div>
<Diversity3Icon />
<span>groups</span>
</div>



</div>

      </div>
    </div>
    

    
  )
}

export default Leftbar