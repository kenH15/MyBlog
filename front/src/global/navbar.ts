import { App } from "vue";
import { ElAvatar, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
const components = [ElMenu,ElMenuItem,ElSubMenu,ElIcon,ElAvatar]
export default function (app:App):void{
    for(const component of components){
        app.component(component.name,component)
    }
}