
import './rightBar.scss'
const RightBar = () => {
  return (
    <div className='rightbar'>
<div className="container">
    <div className=' menu suggestions'>
        <span >suggestions for you</span>
        
        <div className='point suggestion'>
        <div className='user' >
                    <img src="" alt="person"  />
                    <span > person name</span>
                </div>
                <div className='buttons'>
                    <button className='follow'>Follow</button>
                    <button>Dismiss</button>
        </div>

            
        </div>

    </div>
    <div className='menu activities'>
    <span>latest activities</span>
        
        <div className='point activity'>
            
                <div className='user'>
                    <img src="" alt="person" />
                    <span > person name</span>
                </div>
                <span>acivity</span>
                <span>time ago</span>
        </div>
        </div>
        <div className=' menu onlines'>
        <span>online friends</span>
        

    <div className='point online'>
   
    <div className='user'>
                    <img src="" alt="person" />
                    <span > person name</span>
                </div>
                 
                <span>time ago</span>
    </div>
</div>  
    </div>
    
</div>


   
  )
}

export default RightBar