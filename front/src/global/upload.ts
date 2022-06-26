import { App } from "vue";
import { ElUpload,ElImage, ElCard } from 'element-plus'
const components = [ElUpload,ElImage,ElCard]
export default function (app:App):void{
    for(const component of components){
        app.component(component.name,component)
    }
}