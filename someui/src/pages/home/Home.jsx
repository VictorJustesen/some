

import "./home.scss"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import {useContext} from "react"
import { AuthContext } from '../../context/authContext';



const Home = () => {
  
  return (
<div className="Home">
<Share/>
<Posts />
</div>

  )
}

export default Home