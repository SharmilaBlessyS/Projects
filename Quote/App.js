const express = require("express");
const app = express();
const dataBase = require("./dataBase");
const User = require("./UserSchema");

app.use(express.json());

app.post("/api/sendquote/:id?", (req, res) => {
  const userId = req.params.id;
  const newQuote = req.body.quote;

  if (userId) {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        user.quote.push(newQuote);

        return user.save();
      })
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "Quote added successfully!",
          user: user,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: "Failed to add quote",
          error: error.message,
        });
      });
  } else {
    const user = new User({
      quote: [newQuote],
    });

    user
      .save()
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "Quote added successfully!",
          user: user,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: "Failed to add quote",
          error: error.message,
        });
      });
  }
});

// Get all quotes
app.get("/api/getallquote", (req, res) => {
  User.find()
    .then((users) => {
      return res.status(200).json({
        success: true,
        message: "Successful!",
        users: users,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Failed",
        error: error.message,
      });
    });
});

// Get single quote
app.get("/api/quote/:userId/:index", (req, res) => {
  const userId = req.params.userId;
  const index = parseInt(req.params.index, 10);

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const quote = user.quote[index];
      if (!quote) {
        return res.status(404).json({
          success: false,
          message: "Quote not found",
        });
      }

      return res.status(200).json({
        success: true,
        quote: quote,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to get quote",
        error: error.message,
      });
    });
});

//Delete
app.delete("/api/deletequote/:userId/:index", (req, res) => {
  const userId = req.params.userId;
  const index = parseInt(req.params.index, 10);

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.quote.splice(index, 1);

      return user.save();
    })
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: "Quote deleted successfully!",
        user: user,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to delete quote",
        error: error.message,
      });
    });
});

// Update
app.put("/api/updatequote/:userId/:index", (req, res) => {
  const userId = req.params.userId;
  const index = parseInt(req.params.index, 10);
  const updatedQuote = req.body.quote;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (index < 0 || index >= user.quote.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid index",
        });
      }

      user.quote[index] = updatedQuote;

      return user.save();
    })
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: "Quote updated successfully!",
        user: user,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to update quote",
        error: error.message,
      });
    });
});

//Port
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
