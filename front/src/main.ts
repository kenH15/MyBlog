import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from 'axios'
let serverUrl = 'http://127.0.0.1/node/';
//let serverUrl = 'http://127.0.0.1/node/';

axios.defaults.baseURL = serverUrl;
//
//*--element-plus *------------------//
import {globalRegister} from './global'
//全局引入css
import '../style/headup.css'
import '../style/navbar.css'
import '../style/articleDetail.css'

//markdown

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import VMdPreviw from'@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'


VMdEditor.use(githubTheme);
VMdPreviw.use(githubTheme);

//全局请求拦截。
axios.interceptors.request.use(
    (config:any) => {

      // store.commit('increment');
        let token = store.state.token;
        console.log(token);
        if(token){
            
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log("requestuse");
        console.log('interceptors config=',config)

        console.log(config.headers);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log("responesetuse");
        console.log(response.data);
        return response;
    },
    (err) =>{
        return Promise.reject(err);
    }
)

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(globalRegister).use(store).use(router).use(VMdEditor).use(VMdPreviw).mount('#app')
