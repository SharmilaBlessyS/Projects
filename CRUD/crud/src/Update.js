import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';
const Update = () => {
    const {id} = useParams();
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");

    useEffect(()=>{
            
        async function getUser(){
          const {data} = await axios.get(`/api/getsingleuser/${id}`);
          console.log(data);
          setFirstName(data.user.firstname);
          setLastName(data.user.lastname)
        }
        getUser()
    },[])
  
  const handleSubmit = async(e)=>{
      e.preventDefault();

      const person = {
        firstname:firstname,
        lastname:lastname
   };
       await axios.put(`/api/updateuser/${id}`,person);
        // if(true) window.location.href = "/home"
  }

  return (
    <div style={{backgroundColor:"aliceblue",height:"100vh"}} className=" d-flex justify-content-center align-items-center">
      <form className="w-75 border p-5 rounded" style={{backgroundColor:"white"}}>
            <h2 className="text-center">Update</h2>
        <div className="form-group">
          <label className="py-3" htmlFor="exampleInputEmail1">Enter Your First Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="First Name........."
            name="firstname"
            onChange={(e)=>setFirstName(e.target.value)}
            value={firstname}
          />
        </div>
        <div className="form-group">
          <label className="py-3" htmlFor="exampleInputPassword1">Enter Your Last Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
           placeholder="Last Name........."
            name="lastname"
            onChange={(e)=>setLastName(e.target.value)}
            value={lastname}
          />
        </div>
       <div className="d-flex justify-content-center align-items-center mt-3">
       <button type="submit" onClick={handleSubmit}  className="btn btn-primary">
          Update
        </button>
       </div>
      </form>
    </div>
  )
}

export default Update;