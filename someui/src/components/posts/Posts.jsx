import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";

const Posts = ({userid}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userid="+userid).then((res) => {
      return res.data;
    })
  );
  
  const [openCommentsForPost, setOpenCommentsForPost] = useState(null);

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => 
            <Post 
              post={post} 
              key={post.id} 
              commentOpen={openCommentsForPost === post.id}
              toggleComments={() => setOpenCommentsForPost(prev => prev === post.id ? null : post.id)}
            />
          )}
    </div>
  );
};

export default Posts;