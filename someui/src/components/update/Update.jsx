import "./update.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {useState} from 'react'

export const Update = ({setOpenUpdate, user}) => {

  const [cover,setCover] = useState(null)
  const [profile,setProfile] = useState(null)
  const [inputs,setInputs] = useState({
    name:"",
    website:"",
    city:"",
    
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
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverpic;
    profileUrl = profile ? await upload(profile) : user.profilepic;
    
    mutation.mutate({ ...inputs, coverpic: coverUrl, profilepic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  }
  
  return (
    <div className="update">
      <span>Update</span>

      <form action="">
<input type="file" onChange={e=>setCover(e.target.files[0])}/>
<input type="file" onChange={e=>setProfile(e.target.files[0])}/>
<input type="text" name="name" onChange={handleChange}/>
<input type="text" name="name" onChange={handleChange}/>
<input type="text" name="name" onChange={handleChange}/>
<button onClick={handleClick}>submit</button>
      </form>

<button onClick={()=>setOpenUpdate(false)}>x</button>
    </div>
    
  )
}
export default Update