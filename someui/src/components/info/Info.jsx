import React, { useState } from 'react';
import "./info.scss";
import CloseIcon from '@mui/icons-material/Close';
const Info = ({onClose}) => {
    const src="/upload/"
    const tutorialData = [
        {
            text: "Welcome to the Home screen! At the top you can see some functionality, starting from the left the home icon takes you to the home page, the Moon/soon triggers darkmode/lightmode, and the User profile takes ypu to your profile, then in the upper right corner you can see you name picture, and if you press it you go to your Profile",
            imageSrc: src+"1.png"
        },
        {
            text: "on the left you can see the left bar, starting from the top you can see your profile, and when pressing info you can see your info.",
            imageSrc: "/images/page2.jpg"
        },
        {
            text: "On the the middle of the home page, here you can see the posts of the people you follow as well as your own. you automatically follow the introduction user, Try clicking on them or your own and will get to their profile",
            imageSrc: "/images/page3.jpg"
        },
        {
            text: "And this is the final page!",
            imageSrc: "/images/page4.jpg"
        }
    ];
    
    const [currentPage, setCurrentPage] = useState(0);
    
    const handleNext = () => {
        if (currentPage < tutorialData.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleExit = () => {
        if (onClose) {
            onClose();
            
        }
    };


    return (
        <div className='Info'>
           <div className='top'>
                <CloseIcon className="exit-button" onClick={handleExit}/>
                <img src={tutorialData[currentPage].imageSrc} alt="Tutorial Step" />
                <p>{tutorialData[currentPage].text}</p>
           </div>

            <div className='buttons'>
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentPage === tutorialData.length - 1}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Info;