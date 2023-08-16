import {useState} from 'react'
import "./post.scss"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import Comments from "../comments/Comments"
import {Link } from 'react-router-dom'

const Post = ({post}) => {
    const [liked, setLiked]=useState(false)
    const [commentOpen, setCommentOpen]=useState(false)
  return (
    <div className='post'>
      <div className="head">
    <div className="user">
    <img src={`${post.img}`} alt="picture" />
        
        
            <Link className="userinfo" to={`/profile/${post.userId}`}>
            <span className='name'>{post.name}</span>
            <span className='timeago'>Time ago</span>
            </Link>
    
        </div>
        
        <MoreHorizIcon/>
        
  </div>


    <div className="content">
        <p>{post.desc}</p>
        <img src={`${post.img}`} alt="picture" />
    
    </div>
    <div className="buttom">
   
        {
      liked 
      ? <div className='item'  onClick={() => setLiked(false)}><FavoriteOutlinedIcon /><span>Likes</span></div> 
      : <div className='item'  onClick={() => setLiked(true)}><FavoriteBorderOutlinedIcon  /><span>Likes</span></div>
    }
    
       
         
   
       <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon  />
       
        
            <span>Comments</span>
       </div>
        <div className='item'>
            <ShareOutlinedIcon/>
        
        <span>Share</span>
    
        </div>
        </div>
    {commentOpen && <Comments/>}
    </div>
  )
}

export default Post