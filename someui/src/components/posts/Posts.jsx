import "./posts.scss"
import Post from "../post/Post"


import React from 'react'

const Posts = () => {

    const posts =[{
        id:1,
        name:"john doe",
        userId:1,
        profilepic:"",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nisl tellus. Etiam aliquam nibh non turpis aliquet, vel finibus mauris accumsan. Sed a interdum nisl, eu accumsan turpis. Morbi rhoncus aliquet dui, ut efficitur nisi feugiat id. Mauris sit amet nunc nec neque hendrerit fringilla. Vivamus porta consectetur tempus. Proin pulvinar eget ipsum et consectetur. Phasellus hendrerit tellus ut iaculis aliquam. Vivamus leo sapien, lacinia vel ornare et, elementum vel tortor. Sed est lectus, porta nec egestas at, faucibus ut ex. Nam sed augue in magna vulputate mattis.",
        img:""},
        
        {
        id:2,
        name:"john2",
        userId:1,
        profilepic:"",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nisl tellus. Etiam aliquam nibh non turpis aliquet, vel finibus mauris accumsan. Sed a interdum nisl, eu accumsan turpis. Morbi rhoncus aliquet dui, ut efficitur nisi feugiat id. Mauris sit amet nunc nec neque hendrerit fringilla. Vivamus porta consectetur tempus. Proin pulvinar eget ipsum et consectetur. Phasellus hendrerit tellus ut iaculis aliquam. Vivamus leo sapien, lacinia vel ornare et, elementum vel tortor. Sed est lectus, porta nec egestas at, faucibus ut ex. Nam sed augue in magna vulputate mattis.",
        img:""},
    
        {
            id:3,
            name:"john3",
            userId:1,
            profilepic:"",
            desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nisl tellus. Etiam aliquam nibh non turpis aliquet, vel finibus mauris accumsan. Sed a interdum nisl, eu accumsan turpis. Morbi rhoncus aliquet dui, ut efficitur nisi feugiat id. Mauris sit amet nunc nec neque hendrerit fringilla. Vivamus porta consectetur tempus. Proin pulvinar eget ipsum et consectetur. Phasellus hendrerit tellus ut iaculis aliquam. Vivamus leo sapien, lacinia vel ornare et, elementum vel tortor. Sed est lectus, porta nec egestas at, faucibus ut ex. Nam sed augue in magna vulputate mattis.",
            img:""},
    
    ]

  return <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
      
    
    </div>;
};
export default Posts