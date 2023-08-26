
import './leftBar.scss'

import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext,useState } from 'react';
import {AuthContext} from '../../context/authContext'
import {Link} from "react-router-dom"
import Info from "../info/Info"
const Leftbar = () => {

  //const test = () => {console.log(currentUser)}

  const {currentUser} = useContext(AuthContext)
  const [showInfo, setShowInfo] = useState(false);
{console.log(showInfo)}
  return (
   
    <div className='leftbar'>
      {showInfo &&  <Info onClose={() => setShowInfo(false)} /> }
    <div className='container'>

      <div className="menu">
<Link to={`/profile/${currentUser.id}`} style={{textDecoration: 'none'}}>
      <div className='user'>
 <img src={"/upload/"+currentUser.profilepic} alt="picture" className='userpic' />
 <span>{currentUser.name}</span>
</div>
</Link>

<div >
<PeopleIcon />
<span>friends</span>
</div>



<div onClick={()=>setShowInfo(!showInfo)}>
<InfoIcon />
<span>Info</span>
</div>

<a >
<img src='/upload/1692684664030IMG_5516.JPG' />
<span>Made By</span>
</a>

</div>

      </div>
    </div>
    

    
  )
}

export default Leftbar