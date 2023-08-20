import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid }) => {
    const [desc, setDesc] = useState("")
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
  
   
    
    const handleClick = async (e) => {
      e.preventDefault();
      
      mutation.mutate({ desc, postid });
      setDesc("");
     //console.log("./upload/"+currentUser)
     

    };
  

    return (
        <div className="comments">
            <div className="write">
                <img src={"./upload/"+currentUser.profilepic} alt="picture" />
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
                        <img src={"./upload/"+comment.profilepic} alt="picture" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className="timeago">
                            {moment(comment.createdat).fromNow()}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
