<template>
    <el-row justify="center">
        <el-col :span="20">
            <el-input v-model="textarea" placeholder="Leave your comment" autosize type="textarea" resize="none">
            </el-input>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" size="default" @click="submitComment">comment</el-button>
        </el-col>
        <el-col :span="22">
            <div v-for=" item in lists.comments" :key="item.id">
                <CommentItem :username="item.username" :content ="item.content" :updatedTime="item.updatedAt.substr(0,19).replace(/T/g,' ')"></CommentItem>
            </div>
        </el-col>
    </el-row>
    
</template>

<script setup lang="ts">
import { ref, getCurrentInstance,reactive, watchEffect} from 'vue';
import { useStore } from 'vuex';
import CommentItem from '@/components/CommentItem.vue'
import { any } from 'webidl-conversions';
import { ElMessage } from "element-plus";

const currentInstance: any = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;
const store = useStore();
const props = defineProps({
    articleId: {
        type: String,
        required: true,
        default: "",
    }
})

const textarea = ref();
const submitComment = () => {
    console.log(textarea.value);
    console.log(props.articleId);
    interface props {
        userid:string,
        username:string,
        content:string,
    }
    let obj = {
        userid: store.state.userid,
        username: store.state.username,
        content:textarea.value,
    };
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(obj.content);
    if(obj.content == undefined){

    }
    $axios
        .post("/api/comments/" + props.articleId, obj)
        .then((res: any) => {
            console.log(res);
            if(res.status === 400){
                 ElMessage({
                    message: res.data.msg,
                    type: "warning",
                });
            }
            if (res.status === 200) {
                ElMessage({
                    message: res.data.msg,
                    type: "success",
                });
            }
        })
        .catch((err: any) => {
            console.log(err.response.data);
            ElMessage({
                message: err.response.data.msg,
                type: "warning",
            });
        });
    textarea.value = "";
    getComment()
};

const lists: any = reactive({ comments: [] });
const getComment = () =>{
    $axios.get("/api/comments/" + props.articleId)
    .then((res:any)=>{
        if(res.status === 200){
            console.log(res.data.body)
            lists.comments = res.data.body;
            return lists.comments.reverse();
        }
    }).
    catch((err:any) =>{
        console.log(err.response.data.msg);
    })
}

watchEffect(()=>{
    lists.comments = getComment()
})
</script>