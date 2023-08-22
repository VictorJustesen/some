import "./update.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {useState} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
export const Update = ({setOpenUpdate, user}) => {
  const { updateProfile } = useContext(AuthContext);
  const [cover,setCover] = useState(null)
  const [profile,setProfile] = useState(null)
  const [inputs, setInputs] = useState({
    name: "",
    website: "",
    city: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: ""
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
      <div className="input-group file">
    <span>Cover picture</span>
    <input type="file" onChange={e => setCover(e.target.files[0])} />
</div>

<div className="input-group file">
    <span>Profile picture</span>
    <input type="file" onChange={e => setProfile(e.target.files[0])} />
</div>

<div className="input-group">
    <span>Name</span>
    <input type="text" name="name" onChange={handleChange} />
</div>

<div className="input-group">
    <span>Website</span>
    <input type="text" name="website" onChange={handleChange} />
</div>

<div className="input-group">
    <span>City</span>
    <input type="text" name="city" onChange={handleChange} />
</div>

<div className="input-group">
    <span>Twitter</span>
    <input type="text" name="twitter" placeholder="https://twitter.com/yourusername" onChange={handleChange} />
</div>

<div className="input-group">
    <span>Facebook</span>
    <input type="text" name="facebook" placeholder="https://facebook.com/yourusername" onChange={handleChange} />
</div>

<div className="input-group">
    <span>LinkedIn</span>
    <input type="text" name="linkedin" placeholder="https://linkedin.com/in/yourusername" onChange={handleChange} />
</div>

<div className="input-group">
    <span>Instagram</span>
    <input type="text" name="instagram" placeholder="https://instagram.com/yourusername" onChange={handleChange} />
</div>
        
        <button className="submit" onClick={handleClick}>submit</button>
      </form>

      <button className="close" onClick={() => setOpenUpdate(false)}>X</button>
    </div>
    
  )
}
export default Update