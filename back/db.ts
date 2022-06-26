var mongoose = require('mongoose');
var testDB = 'mongodb://127.0.0.1:27017/myblog';
mongoose.connect(
    testDB,
    {useNewUrlParser:true,useUnifiedTopology:true},
    function(err){
        if(err){
            console.log('MongoDB connect fail.');
        }else{
            console.log('MongoDB connect success.');
        }
    }
);
console.log('enter2');
module.exports = mongoose;