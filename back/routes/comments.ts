export{}
const Router = require('@koa/router');
const { Comments,Articles} = require('../model.ts');
const router = new Router();

let getComments = async function (ctx, next) {
    let result = await Comments.find();
    if (result.length) {
        ctx.body = {
            status: 1,
            msg: 'get comments success',
            body: result,
        };
    } else {
        ctx.body = {
            status: 0,
            msg: 'no comments',
            body: [],
        }
    }
};

let postComments = async function(ctx,next){
    let articleid = ctx.params.aid;
    let body = ctx.request.body;
    let {username,userid,content} = body;
    let article = await Articles.findOne({
        _id: articleid
    });
    if (content==""){
        ctx.status = 400;
        ctx.body={
            status:0,
            msg:'Comment must no be blank',
        };
        return;
    }
    if(!article){
        ctx.status =400;
        ctx.body = {
            status:0,
            msg:'article not exist'
        };
        return;
    }
    let newComment = new Comments({
        username,
        userid,
        content,
        articleid,
    });
    let result = await newComment.save();
    if(result){
        ctx.body = {
            status:1,
            msg:' success',
            data:{id:result.id},
        }
    }else{
        ctx.body={
            status:0,
            msg:'add new comment fail',
        };
    }
};

let getCommetnsByArticleId = async function(ctx,next){
    let articleid = ctx.params.aid;
    let result = await Comments.find({articleid});
    if (result.length){
        ctx.body = {
            status:1,
            msg:'success',
            body:result,
        };
    }else{
        ctx.body ={
            status:0,
            msg:'no comments',
            body:[]
        };
    }
}
router.prefix('/comments');
router.get('/',getComments);
router.post('/:aid',postComments);
router.get('/:aid',getCommetnsByArticleId);
module.exports = router;

