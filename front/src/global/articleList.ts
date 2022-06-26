import { App } from "vue";
import { ElDescriptions, ElDescriptionsItem, ElPagination } from 'element-plus'
const components = [ElDescriptions,ElDescriptionsItem,ElPagination]
export default function (app:App):void{
    for(const component of components){
        app.component(component.name,component)
    }
}