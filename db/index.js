let mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/data', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', ()=> {
    console.log('Error connecting to mongo database')
});
db.once('open', ()=> {
    console.log('Success connecting to mongo database')
});


let mongooseSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  fullAddress: String,
  ssn: String
});

let Model = new mongoose.model('data', mongooseSchema);

const save = (data, callback) => {

  let model = Model({
    firstName: `${data.firstName}`,
    lastName: `${data.lastName}`,
    phoneNumber: `${data.phoneNumber}`,
    fullAddress: `${data.fullAddress}`,
    ssn: `${data.ssn}`,
  });

  model.save((err, res) => {
      if (err) {
          callback(err);
      } else {
          console.log('successful save in db/index.js');
          callback(null, res)
      }
  })
};

const find = (callback) => {
  console.log('find fires');
  Model.find((err, data) => {
      if(err) {
          console.log('error in find');
          callback(err)
      } else {
          console.log('successful find', data);
          callback(null, data)
      }
  })
};


module.exports = {
  save,
  find
};