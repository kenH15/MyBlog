import { App } from "vue";
import { ElAside, ElContainer, ElFooter, ElHeader, ElMain } from 'element-plus'
const components = [ElContainer,ElHeader,ElAside,ElMain,ElFooter]
export default function (app:App):void{
    for(const component of components){
        app.component(component.name,component)
    }
}