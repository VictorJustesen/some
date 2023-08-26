import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

const Comments = ({ postid }) => {
    const [desc, setDesc] = useState("")
    const[menuOpen,setMenuOpen]=useState(false)
    const { currentUser } = useContext(AuthContext);
    
    // Move the useQuery hook here instead of inside the comments function.
    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postid=" + postid).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newComment) => {
        return makeRequest.post("/comments", newComment);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["comments"]);
        },
      }
    );
  
    const deleteMutation = useMutation(
        (commentid) => {
            return makeRequest.delete("/comments/" + commentid);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );
    
    const handleClick = async (e) => {
      e.preventDefault();
      
      mutation.mutate({ desc, postid });
      setDesc("");
     //console.log("./upload/"+currentUser)
     
    };
  
    const handleDelete = (commentid) => {
        deleteMutation.mutate(commentid);
    };
    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentUser.profilepic} alt="picture" />
                <input type="text"
                 placeholder="Write a comment" 
                 onChange={e=>setDesc(e.target.value)}
                 value={desc} />
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? (
                "loading"
            ) : (
                data.map(comment => (
                    <div key={comment.id} className="comment">
                        <img src={"/upload/"+comment.profilepic} alt="picture" />
                        <div className="cinfo">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        
                        <div>
                            <span className="timeago">
                                {moment(comment.createdat).fromNow()}

                            </span>
                            {/*console.log(comment.userid,currentUser.id)*/}
                            {comment.userid==currentUser.id &&
                            <div className='delete'>
                             <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
                             
                             {menuOpen && <button onClick={() => handleDelete(comment.id)}>delete</button>}   
                             </div>}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
