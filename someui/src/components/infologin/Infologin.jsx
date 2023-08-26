import React from 'react';
import "./infologin.scss";
import CloseIcon from '@mui/icons-material/Close';
const Infologin = ({ onClose }) => {

    const handleExit = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
       
        <div className='info'>    
                <div className="info-header">
                    <h1>Hello! and welcome to devconnect!</h1>
                    <CloseIcon className="exit-button" onClick={handleExit}/>
                </div>
                <h2>This is a social media demo by <span className="author">Victor Justesen</span></h2>
    
                <p>
                    Because this is a demo, I would advise you not to insert any sensitive information onto my site. 
                    The passwords are hashed, and the users are authenticated, but I don't know enough about security 
                    to be 100% certain the site is secure. For this reason, I have chosen not to implement any password 
                    or email requirements to make it easy for you to access the site.
                </p>
    <p>Feel free to write to me if you Have any questions, or you find any bugs  </p>
                <p>If you would like to know more about me, please visit my website: <a href="https://victorweb.tech" className="website-link" target="_blank" rel="noopener noreferrer">victorweb.tech</a></p>
                
       
        </div>
    )
}

export default Infologin;
