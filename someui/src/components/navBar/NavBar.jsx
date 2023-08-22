import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link} from "react-router-dom"
import { useState, useEffect,useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios"; 
import './navBar.scss'


import {DarkModeContext} from  "../../context/darkModeContext"
import {AuthContext} from '../../context/authContext'



const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [showResults, setShowResults] = useState(false);

  const searchResultsQuery = useQuery(['searchResults', searchQuery], async () => {
    if (searchQuery.trim() === '') return [];
    const response = await makeRequest.get(`/users/search/${encodeURIComponent(searchQuery.trim())}`);
    return response.data;
}, {
    enabled: searchQuery.trim() !== '',
    onSuccess: (data) => {
        setSearchResults(data);
    },
    onError: (error) => {
        console.error("Failed to fetch search results:", error);
    }
});

  const handleInputFocus = () => {
    setShowResults(true);
};

const handleInputBlur = () => {
    setTimeout(() => setShowResults(false), 200); // Add a small delay to allow the click event on the search result item
};

  return (
    <div className='navbar'>
<div className="left">
<Link to="/" className="homelink" style={{textDecoration:"none"}}>
    DevConnect
</Link>
<Link to="/" className="homelink" style={{textDecoration:"none"}}><HomeOutlinedIcon className='icon homelink'/></Link>


{darkMode ? <DarkModeOutlinedIcon className='icon' onClick={toggle}/> : <WbSunnyOutlinedIcon className='icon' onClick={toggle}/>}
<Link to={`/profile/${currentUser.id}`}  className="homelink" ><PersonOutlinedIcon className='icon homelink'/></Link>
<div className="search">
    <SearchOutlinedIcon />
    <input 
        type="text" 
        placeholder='Search' 
        value={searchQuery}
        onChange={(e) => {
            setSearchQuery(e.target.value);
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
    />
    {showResults && (
        <div className="searchResults">
            {searchResults.map(user => (
                <Link to={`/profile/${user.id}`} key={user.id} style={{textDecoration: 'none'}}>
                    <div className="searchResultItem">
                        <img src={`/upload/${user.profilepic}`} alt={user.name} />
                        <span>{user.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )}
</div>
</div>

<div className="right">

<EmailOutlinedIcon className='icon'/>
<NotificationsOutlinedIcon className='icon'/>

<Link to={`/profile/${currentUser.id}`} style={{textDecoration: 'none'}}>

<div className='user'>
  <img src={"/upload/" + currentUser.profilepic} alt="picture" className='userpic' />
  <span>{currentUser.name}</span>
  </div>
  </Link>

</div>

    </div>
  )
}

export default NavBar