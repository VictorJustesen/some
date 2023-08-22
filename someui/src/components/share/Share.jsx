import "./share.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MapIcon from "@mui/icons-material/Map";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

 
  
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
  }
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilepic} alt="" />
            <textarea
  placeholder={`What's on your mind ${currentUser.name}?`}
  rows="1"
  onChange={(e) => {
    setDesc(e.target.value);
    autoResize(e.target);
  }}
  value={desc}
></textarea>

          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        
        <div className="bottom">
          
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            
              <div className="item">
              <label htmlFor="file">
                <PersonAddIcon style={{fontSize: 25}}/>
                </label>
                <span>Add Image</span>
              </div>
           
            <div className="item">
              <MapIcon style={{fontSize: 25}}/>
              <span>Add Place</span>
            </div>
            <div className="item">
              <AddPhotoAlternateIcon style={{fontSize: 25}}/>
              <span>Tag Friends</span>
            </div>
            <button onClick={handleClick}>Share</button>
          </div>
         
            
         
      </div>
    </div>
  );
};

export default Share;