const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ndata", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
module.exports = { mongoose };