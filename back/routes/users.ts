export{}
const Router = require('@koa/router');
const { Users } = require('../model.ts');
const router = new Router();
//jwt
const jwt = require('jsonwebtoken');
const { jwtsecret, expiresIn } = require('../secret');

let signup = async function (ctx, next) {

    let { fullname, username, password } = ctx.request.body;
    let result = await Users.findOne({ username });
    if (result) {
        ctx.status = 401;
        ctx.body = {
            msg: 'username exist',
            status: 0,
        };
        return;
    }
    let user = new Users({
        fullname,
        username,
        password,
    });
    await user.save();
    ctx.body = {
        msg: 'success',
        status: 1,
        body: user,
    };
};
let showUsers = async function (ctx, next) {
    let result = await Users.find();
    if (result.length) {
        ctx.body = {
            status: '1',
            msg: 'have users',
            body: result,
        }
    } else {
        ctx.body = {
            status: 0,
            msg: 'no users',
            body: [],
        }
    }

};
let login = async function (ctx, next) {
    let { username, password } = ctx.request.body;
    console.log(username, password);

    let result = await Users.findOne({ username, password });
    console.log(result);

    if (result) {
        let token = jwt.sign(
            {
                userid: result.id,
                username: username
            }, jwtsecret,
            {
                expiresIn: expiresIn  //valid time for token
            }
        );
        ctx.body = {
            msg: 'login success',
            status: 1,
            token,
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            msg: 'login error',
            status: 0,
            token: null,
        };
    }
};
let info = async function (ctx, next) {
    let username = ctx.params.username;
    let result = await Users.findOne({ username });
    if (result) {
        ctx.body = {
            msg: 'success',
            status: 1,
            data: {
                username: username,
                fullname: result.fullname,
                avatar: result.avatar,
            },
        };
    } else {
        ctx.status = 401;
        ctx.body = {
            msg: 'error',
            status: 0,
        };
    }
};
let update = async function (ctx, next) {
    let { username, password, fullname, avatar } = ctx.request.body;
    let user = await Users.findOne({ username });
    interface userdata {
        avatar?: string;
        fullname?: string;
        password?: string;
      }
    if (!user) {
        console.log('there is no user');
        ctx.status = 401;
        ctx.body = {
            status: 0,
            msg: 'User does not exist!',
        }
    }

   //let decode = ctx.state.user;
    //let operatorUsername = decode.username;
 
    //if (operatorUsername == username){}

    let body:userdata = {};

    if (password) {
        body.password = password;
    }
    if (fullname) {
        body.fullname = fullname;
    }
    if (avatar || avatar === '') {
        body.avatar = avatar;
    }
    let result = await Users.updateOne(
        {
            username,
        },{
            $set:body,
        }
    );
    if (result){
        ctx.body = {
            status:1,
            msg:'success',
        };
    }else{
        ctx.body={
            status:0,
            msg:'update error',
        };
    }
};
router.prefix('/users');
router.post('/signup', signup);
router.post('/login',login);
router.get('/', showUsers);
router.get('/info/:username', info);
router.post('/update',update);

module.exports = router;