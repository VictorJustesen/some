import {useState, useContext} from 'react'
import "./post.scss"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import Comments from "../comments/Comments"
import {Link } from 'react-router-dom'
import moment from 'moment'

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios"
import { AuthContext } from '../../context/authContext';

const Post = ({ post, commentOpen, toggleComments }) => {

    const[menuOpen,setMenuOpen]=useState(false)
    const {currentUser} = useContext(AuthContext)
   
      const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postid="+post.id).then((res) => {
          return res.data;
        })
      );


      const queryClient = useQueryClient();

      const mutation = useMutation(
        (liked) => {
          if (liked) return makeRequest.delete("/likes?postid=" + post.id);
          return makeRequest.post("/likes", { postid: post.id });
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["likes"]);
          },
        }
      );
      const deleteMutation = useMutation(
        (postid) => {
          return makeRequest.delete("/posts/" + postid);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
      );
    
      const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));
      };
    
      const handleDelete = () => {
        deleteMutation.mutate(post.id);
      };
  return (
    <div className='post'>
      <div className="head">
    <div className="user">
    <Link to={`/profile/${post.userid}`}>
    <img src={`/upload/${post.profilepic}`} alt="picture" />
        </Link>
        
            <Link className="userinfo" to={`/profile/${post.userid}`}>
            <span className='name'>{post.name}</span>
            <span className='timeago'>{moment(post.createdat).fromNow()}</span>
            </Link>
    
        </div>
        <div className='delete'>
        <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
        {menuOpen && <button onClick={handleDelete}>delete</button>}
        </div>
  </div>


    <div className="content">
    <p>{post.desc}</p>
       {post.img &&  <img src={"./upload/"+post.img} alt="picture" />}
    
    </div>
    <div className="buttom">
   
    <div className="item" onClick={handleLike}>
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }}/>
            ) : (
              <FavoriteBorderOutlinedIcon  />
            )}
            
 {data?.length} likes
</div>
    
       
         
   
<div className='item' onClick={toggleComments}>
          <TextsmsOutlinedIcon />
          <span>Comments</span>
          </div>
        <div className='item'>
            <ShareOutlinedIcon/>
        
        <span>Share</span>
    
        </div>
        </div>
         
        {commentOpen && <Comments postid={post.id} />}
    </div>
   
    
  )
  }

export default Post

