import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest, } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userid = useLocation().pathname.split("/")[2]

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userid).then((res) => {
      return res.data;
    })
  );


  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
    
      makeRequest.get("/relationships?followeduserid=" + userid).then((res) => {
        
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userid=" + userid);
      return makeRequest.post("/relationships", { userid });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const logout = () => {
    makeRequest.post('/auth/logout')
    localStorage.removeItem("user");
    window.location.reload();}


  return (
    
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          {openUpdate && <Update className="update" setOpenUpdate={setOpenUpdate} user={currentUser.id}/>}
          <div className="images">
            <img src={"/upload/"+data.coverpic} alt="" className="cover" />
            <img src={"/upload/"+data.profilepic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
            <div className="left">
    {data.facebook ? (
        <a href={data.facebook}>
            <FacebookTwoToneIcon fontSize="large" />
        </a>
    ) : null}

    {data.instagram ? (
        <a href={data.instagram}>
            <InstagramIcon fontSize="large" />
        </a>
    ) : null}

    {data.twitter ? (
        <a href={data.twitter}>
            <TwitterIcon fontSize="large" />
        </a>
    ) : null}

    {data.linkedin ? (
        <a href={data.linkedin}>
            <LinkedInIcon fontSize="large" />
        </a>
    ) : null}

    {!data.facebook && !data.instagram && !data.twitter && !data.linkedin ? (
        <span>User has not added links.</span>
    ) : null}
</div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item" >
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <a className="item" href={`http://${data.website}`} style={{textDecoration: "none"}}>                    <LanguageIcon />
                    <span>{data.website}</span>
                  </a>
                </div>
                
              </div>
              <div className="right">

              {rIsLoading ? (
                  "loading"
                ) : userid == currentUser.id ? (
                <div className="buttons">
                    <button onClick={() => {
                      setOpenUpdate(true);
                    
                   }}>Update</button>
                   <button className="logout" onClick={logout}>Logout</button>
                </div>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                  
                )}

                <EmailOutlinedIcon />
                <MoreVertIcon />

                
              </div>
              
         
             
            </div>
            <p>{data.desc}</p>
            
          </div>
          <Posts key={userid} userid={userid} />
        </>
      )}
      
     
    </div>
  );
};

export default Profile;