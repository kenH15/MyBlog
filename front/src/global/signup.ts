import { App } from "vue";
import { ElButton,ElForm,ElInput,ElRow,ElCol,ElTabs,ElTabPane,ElFormItem} from 'element-plus'
const components = [ElButton,ElForm,ElInput,ElRow,ElCol,ElTabs,ElTabPane,ElFormItem]
export default function (app:App):void{
    for(const component of components){
        app.component(component.name,component)
    }
}