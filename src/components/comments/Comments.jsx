import "./comments.scss"

import React from 'react'

const Comments = () => {

    const comments =[{
        id:1,
        name:"john doe",
        userId:1,
        profilepic:"",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.",
        },
        
        {
        id:2,
        name:"john2",
        userId:1,
        profilepic:"",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.",
        },
    
        {
            id:3,
            name:"john3",
            userId:1,
            profilepic:"",
            desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.",
            },
    
    ];
    return (
        <div className="comments">
            {
                comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <div className="info">
                        <img src={comment.profilepic} alt="picture" />
                        
                        <span>{comment.name}</span>
                        </div>
                        <p>{comment.desc}</p>
                        
                        <span className="timeago">time ago </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments
