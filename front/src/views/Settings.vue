<template>
  <el-card class="box-card">
    <el-row justify="center">
      <el-col :span="2" id="font">
        <p>Avatar Set</p>
      </el-col>
      <el-col :span="10">
        <Settings />
      </el-col>
      <el-col :span="2" style="align-self: center">
        <el-button id="settingsButton" @click="saveChange">save</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import Settings from "@/components/Settings.vue"; // @ is an alias to /src
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
const currentInstance: any = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;

const store = useStore();
const saveChange = () => {
  console.log("save");
  store.commit("change_Avatar_status");
  interface Props {
    avatar?: string;
    username?: string;
    password?: string;
    //title?:string  ?:可有可无
  }
  let obj: Props = {
    username: store.state.username,
    avatar: store.state.imageUrl,
  };
  $axios
    .post("/api/users/update", obj)
    .then((res: any) => {
      console.log(res);
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
};
</script>


<style>
#font {
  align-self: center;
}
#settingsButton {
  background: #f54c53;
  border: 2px solid #f54c53 !important;
  width: 100px;
}
:root {
  --el-color-primary: #f54c53;
}
.el-button:hover {
  --el-button-hover-text-color: #ffffff;
}
</style>