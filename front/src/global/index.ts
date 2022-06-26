import { App } from 'vue'
import signup from './signup'
import navbar from './navbar'
import upload from './upload'
import icon from './icon'
import container from './container'
import articleList from './articleList'
import 'element-plus/dist/index.css'

export function globalRegister  (app:App):void{
    app.use(signup).use(navbar).use(upload)
    app.use(icon).use(container).use(articleList)
    
}