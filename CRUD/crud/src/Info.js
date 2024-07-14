import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Info = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function Getallusers() {
      const { data } = await axios.get(`/api/getallusers`);

      setUserData(data.data);
    }
    Getallusers();
  }, []);

  const handlDelete = async (id) => {
    
    const { data } = await axios.delete(`/api/delete/${id}`);
    window.location.reload();
  };

  const Updateusers = (id) => {
    navigate(`/update/${id}`);
  };
  return (
    <div
      className="p-3"
      style={{
        backgroundColor: "aliceblue",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <table className="table  w-50">
        <thead>
          <tr>
            <th>NO:</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((items, index) => (
              <tr key={items._id}>
                <td>{index + 1}</td>
                <td>{items.firstname}</td>
                <td>{items.lastname}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => Updateusers(items._id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handlDelete(items._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
