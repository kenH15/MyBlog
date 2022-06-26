export{}
const Router = require('@koa/router');
const { Articles } = require('../model.ts');
const router = new Router();

let getArticles = async function (ctx, next) {
    let result = await Articles.find();
    if (result.length) {
        ctx.body = {
            status: 1,
            msg: 'get articles success',
            body: result,
        };
    } else {
        ctx.body = {
            status: 0,
            msg: 'no articles',
            body: [],
        }
    }
};

let postArticle = async function(ctx,next){
    let body = ctx.request.body;
    let {username,userid,title,content,imgUrl} = body;
    let newArticle = new Articles({
        username,
        userid,
        title,
        content,
        imgUrl,
    });
    let result = await newArticle.save();
    if(result){
        ctx.body = {
            status:1,
            msg:'saved successed',
            data:{id:result.id},
        }
    }else{
        ctx.body={
            status:0,
            msg:'saved fail',
        };
    }
};

let getArticleById = async function(ctx,next){
    let id:String = ctx.params.id;
    let result = await Articles.findOne({_id:id});
    if (result) {
        
        ctx.body = {
            status:1,
            msg:'get successed',
            body:result,
        };
    }else{
        ctx.body = {
            status:0,
            msg:'article not exist',
            body:{},
        };
    }
};

let putArticleById = async function(ctx,next){
    let id:String = ctx.params.id;
    interface props{
        title?: string;
        content?: string;
    }
    let body:props = {
    
        content:"",
    };
    if(ctx.request.body.title !== undefined){
        body.title = ctx.request.body.title;
    }
    if(ctx.request.body.content !== undefined){
        body.content  = ctx.request.body.content;
    }
    let result = await Articles.updateOne(
        {
            _id:id,
        },
        {
            $set:body,
        }
    );
    if (result){
        ctx.body = {
            status:1,
            msg:'Edit Success',
        };
    }else{
        ctx.body = {
            status:0,
            msg:'update error',
        };
    }
}; 
let getArticlesByPage = async function(ctx,next){
     let currentpage = ctx.params.currentpage;
     let userid = ctx.params.userid;
     let total = await Articles.find({userid:userid}).count();
     let result = await Articles.find({userid:userid}).skip((currentpage-1)*5).limit(5);  //5 items 1 page
     if(result.length){
         ctx.body = {
             status:1,
             msg:'get articles success',
             num:total,
             body:result,
         };
     }
     else{
         ctx.body={
             status:0,
             msg:'no articles',
             body : [],
         }
     }
 }
let deleteArticleById = async function (ctx,next){
    let id:String = ctx.params.id;
    let result = await Articles.deleteOne({_id:id});
    if (result){
        ctx.status = 204;    //delete success NO CONTENT
       // ctx.body = {
          //  status:1,
          //  msg:'deleted successfully'
       // };
    }else{
        ctx.body = {
            status:0,
            msg:'delete error',
        };
    }
}

router.prefix('/articles');
router.get('/',getArticles);
router.post('/',postArticle);
router.get('/:userid/:id/detail',getArticleById);
router.put('/:id',putArticleById);
router.delete('/:id',deleteArticleById);
router.get('/:userid/:currentpage',getArticlesByPage);

module.exports = router;

