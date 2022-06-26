<template>
  <div id="background">
    <div class="common-layout">
      <el-container style="margin-top: 50px">
        <el-header>
          <el-row>
            <el-col :span="19" :offset="1">
              <el-input
                v-model="title"
                placeholder="Title"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button id="loginBtn" @click="submitContent">Post</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="22" :offset="1">
              <v-md-editor v-model="text" height="550px"></v-md-editor>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const currentInstance:any = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;
const text = ref();
const title = ref();
let text2 = "1111111";
const store = useStore();

const siftImgurl = (articleContent:string) => {
  let reg = /!*\[(.+?)\]\((.+?)\)/g; //匹配![1](http://) => http://
  let result = reg.exec(articleContent);
  if (result) {
    return result[2];
  } else {
    return "";
  }
};
const submitContent = () => {
  let obj = {
    userid: store.state.userid,
    username: store.state.username,
    title: title.value,
    content: text.value,
    imgUrl: siftImgurl(text.value),
  };
  //siftImgurl(obj.content);
  console.log("this is content");
  console.log(obj);
  $axios
    .post("/api/articles", obj)
    .then((res:any) => {
      console.log(res);
      if (res.status === 200) {
        ElMessage({
          message: res.data.msg,
          type: "success",
        });
        console.log("post success");
      }
      title.value = "";
      text.value = "";
    })
    .catch((err:any) => {
      console.log("post fail");
    });
};
</script>

<style>
.el-header {
  height: 170px;
}
</style>