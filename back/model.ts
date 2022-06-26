export{}
let db = require ('./db.ts');
let Schema = db.Schema;

let UserSchema = new Schema(
    {
        fullname:String,
        username:String,
        role:{
            type:String,
            enum:['admin','user'],
            default:'user',
        },
        password:String,
        avatar:String,
    },
    {timestamps:true}
);

let ArticleSchema = new Schema(
    {
        userid:String,
        username:String,
        title:String,
        content:String,
        imgUrl:String,    
    },
    {timestamps:true}
);


let CommentSchema = new Schema(
    {
        userid:String,
        username:String,
        content:String,
        articleid:String,
    },
    {timestamps:true}
)
let Users = db.model('User',UserSchema);
let Articles = db.model('Article',ArticleSchema);
let Comments = db.model('Comment',CommentSchema);

module.exports = {Users,Articles,Comments};

