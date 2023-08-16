import "./comments.scss"
import { AuthContext } from "../../context/authContext"
import {useContext} from 'react'

const Comments = () => {
const {currentUser} = useContext(AuthContext)
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
            desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae.",
            },
    
    ];
    return (
        <div className="comments">
            <div className="write">
            <img src={currentUser.profilepic} alt="picture"/>
            <input type="text" placeholder="Write a comment" />
            <button>Send</button>
            </div>
            {
                comments.map(comment => (
                    <div key={comment.id} className="comment">
                       
                        <img src={comment.profilepic} alt="picture" />
                        <div className="info"> 
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                        </div>
                        
                        <span className="timeago">time ago </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments
