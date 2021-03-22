const mongoose = require("./../initdb").mongoose

const usersSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  gender:String,
  email: String,
  username: String,
  password: String,
  role:{
    type: Number,
    default:2,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  token:String,

});
// tạo model
const users = mongoose.model("users", usersSchema);

/**
 * !B4
 * TODO CRUD (create, read, update, delete)
 */
function Create(user) {
  return new Promise((resolve, reject) => {
    users.create(user);
  });
}
function Read(username) {
  return new Promise((resolve, reject) => {
    user.find({username: username}).exec((err, users) => {
      resolve(users);
    });
  });
}

function Update() {
  return new Promise((resolve, reject) => {
    user.update(function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(console.log("Result :", result));
      }
    });
  });
}

function Delete(name) {
  return new Promise((resolve, reject) => {
    user.deleteOne({ name: name }, (err, res) => {
      if (err) {
        reject(console.error(err));
      }
      resolve(console.log(res));
    });
  });
}


module.exports = {users, Create, Read, Update, Delete };
