import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = {
      firstname: firstname,
      lastname: lastname,
    };
    const data = await axios.post(`/api/register`, person);
    console.log(data);
  };
  return (
    <div
      style={{ backgroundColor: "pink", height: "100vh" }}
      className=" d-flex justify-content-center align-items-center "
    >
      <form
        className="w-75 border p-5 rounded"
        style={{ backgroundColor: "white" }}
      >
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <label className="py-3" htmlFor="fname">
            Enter Your First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            aria-describedby="fname"
            placeholder="First Name"
            name="firstname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="py-3" htmlFor="lastname">
            Enter Your Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Last Name"
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
