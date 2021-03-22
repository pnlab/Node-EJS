/**
 * !B1
 * TODO "npm i mongoose"
 * */
const mongoose = require("mongoose");
/**
 * !B2
 * TODO Khởi tạo file database (Kết nối database)
 */
mongoose.connect("mongodb://localhost/name", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

/**
 * !B3
 * TODO Create table sqlite
 */
const userSchema = new mongoose.Schema({
  name: String,
});
// tạo model
const user = mongoose.model("user", userSchema);

/**
 * !B4
 * TODO CRUD (create, read, update, delete)
 */
function Create(name) {
  return new Promise((resolve, reject) => {
    user.create({
      name: name,
    });
  });
}
function Read() {
  return new Promise((resolve,reject)=>{
      user.find().exec((err, users) => {        
        resolve(users)
      });
  })
  
}

function Update() {
  return new Promise((resolve, reject) => {
    user.update(
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(console.log("Result :", result));
        }
      }
    );
  });
}

function Delete(name) {
  return new Promise((resolve,reject)=>{
    user.deleteOne({ name: name },(err,res)=>{
      if (err){
        reject(console.error(err))
      }
      resolve(console.log(res))
    });
  })
  

}
// Read().then(ms=>{console.log(ms)})

// async function a() {
//   await Read();
//   await Delete();
//   await Read();
// }
// a();

module.exports = { Create, Read, Update, Delete };
