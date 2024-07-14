const express = require("express");
const app = express();
const Database = require("./database");
const Users = require("./userSchema");

app.use(express.json()); //it allows json data

app.post("/api/register", (req, res) => {
  // create a new user document in the MongoDB database
  Users.create(req.body)
    .then(() => {
      return res.status(201).json({
        //201 - indicates that the resource has been created successfully.
        success: true,
        message: "Register success",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Register failed",
      });
    });
  // get all user API
});

// Delete API
app.delete("/api/delete/:id", async (req, res) => {
  const userId = req.params;

  await Users.findByIdAndDelete(userId.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "delete user success",
      });
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: "request error",
      });
    });
});

//get all users
app.get("/api/getallusers", (req, res) => {
  console.log("Request received for /api/getallusers");
  Users.find()
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "get all user success",
        data,
      });
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: "request error",
      });
    });
});

// get single user

app.get("/api/getsingleuser/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: "get single user",
        user,
      });
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: "request error",
      });
    });
});
app.put("/api/update/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  await Users.findByIdAndUpdate(id, { firstname, lastname })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Update the user",
      });
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: "Error",
      });
    });
});
// update user

app.put("/api/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;

  await Users.findByIdAndUpdate(
    id,
    {
      firstname: firstname,
      lastname: lastname,
    },
    { new: true }
  )
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "update success",
      });
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: "request error",
      });
    });
});
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
