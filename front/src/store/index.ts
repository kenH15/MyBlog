import { createStore } from "vuex";

export default createStore({
    state:{
        name:'kkken',
        status:'logout',
        token:'',
        userid:'',
        username:'',
        ifHasAvatar:false,
        imageUrl:''
    },
    //方法同步调用
    mutations:{  
        login_saveToken(state,token){
            function parseJwt(token:string){
                var base64Url = token.split('.')[1];
                var base64 = decodeURIComponent(
                    atob(base64Url).split('').map(function(c){
                        return '%' +('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
                );
                return JSON.parse(base64);
            }
            let userinfo = parseJwt(token);
            state.userid = userinfo.userid;
            state.username = userinfo.username;
            state.token = token;
            window.localStorage.setItem('token',state.token);
            state.status = 'login';
        },
        logout_delToken(state){
            window.localStorage.removeItem('token');
            state.token = '';
            state.userid = '';
            state.username = '';
            state.status = 'logout';
        },
        change_status(state,val){
            state.status = val;
        },
        change_Avatar_status(state){
          state.ifHasAvatar = true;
        },
        save_imageUrl(state,val){
          state.imageUrl= val;
        }
    },//异步调用
    actions:{
    } 
})

