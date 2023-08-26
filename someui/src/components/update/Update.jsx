import "./update.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {useState} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import CloseIcon from '@mui/icons-material/Close';
export const Update = ({setOpenUpdate, user}) => {
  const { updateProfile, currentUser } = useContext(AuthContext);
  const [cover,setCover] = useState(null)
  const [profile,setProfile] = useState(null)
  const [inputs, setInputs] = useState({
    name: "",
    website: "",
    city: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    description: "" 
});

  const handleChange= e => {
    setInputs((prev)=> ({...prev, [e.target.name]: e.target.value}));
  };

  const upload = async (file ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
        updateProfile(data);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
  
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverpic;
    profileUrl = profile ? await upload(profile) : user.profilepic;
    
    const updatedInfo = {
      coverpic: coverUrl,
      profilepic: profileUrl
    };
  
    // Only include fields in the mutation that have values
    for (let key in inputs) {
      if (inputs[key].trim()) { // Check if the string is not empty or just whitespace
        updatedInfo[key] = inputs[key];
      }
    }
  
    mutation.mutate(updatedInfo);
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  }
  
  return (
       <div className="update">
      <span>Update</span>

      <form action="">
      <div className=" file">
    <span>Cover picture: </span>
    <input type="file" onChange={e => setCover(e.target.files[0])} />
</div>

<div className=" file">
    <span>Profile picture: </span>
    <input type="file" onChange={e => setProfile(e.target.files[0])} />
</div>

<div className="input-group">
    <span>Name</span>
    <input type="text" name="name" placeholder={currentUser.name || 'your name'} onChange={handleChange} />
</div>

<div className="input-group">
    <span>Website</span>
    <input type="text" name="website" placeholder={currentUser.website || 'your website'} onChange={handleChange} />
</div>

<div className="input-group">
    <span>City</span>
    <input type="text" name="city" placeholder={currentUser.city || 'your current city'} onChange={handleChange} />
</div>

<div className="input-group">
    <span>Twitter</span>
    <input type="text" name="twitter" placeholder={currentUser.twitter || 'link to your twitter profile'} onChange={handleChange} />
    </div>

<div className="input-group">
    <span>Facebook</span>
    <input type="text" name="facebook" placeholder={currentUser.facebook || 'link to your facebook profile'} onChange={handleChange} />
</div>

<div className="input-group">
    <span>LinkedIn</span>
    <input type="text" name="linkedin" placeholder={currentUser.linkedin || 'link to your linkedin profile'} onChange={handleChange} />
</div>

<div className="input-group">
    <span>Instagram</span>
    <input type="text" name="instagram" placeholder={currentUser.instagram || 'link to your instagram profile'} onChange={handleChange} />
</div>

<div className="input-group">
                <span>Description</span>
                <textarea
                className="descriptionf"
                    name="description"
                    placeholder="Tell us a bit about yourself..."
                    value={inputs.description}
                    onChange={handleChange}
                    rows="4"  // Set the number of rows for the textarea (you can adjust this)
                />
            </div>
        
        <button className="submit" onClick={handleClick}>submit</button>
      </form>

      <CloseIcon className="close" onClick={() => setOpenUpdate(false)}/>
    </div>
    
  )
}
export default Update