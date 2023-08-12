
import './leftBar.scss'

import PeopleIcon from '@mui/icons-material/People';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext } from 'react';
import {AuthContext} from '../../context/authContext'

const Leftbar = () => {



  const {currentUser} = useContext(AuthContext)

  return (
    <div className='leftbar'>

    <div className='container'>

      <div className="menu">

      <div className='user'>
 <img src="" alt="picture" className='userpic' />
 <span>{currentUser.name}</span>
</div>

<div>
<PeopleIcon />
<span>friends</span>
</div>

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