<template>
  <div class="common-layout" id="articlebox-layout">
    <el-container>
      <el-header id="articlebox-el-header">{{ title }}</el-header>
      <el-container>
        <el-aside
          v-if="ifImage(props.imageUrl)"
          id="image"
          :style="{ backgroundImage: 'url(' + props.imageUrl + ')' }"
        ></el-aside>
        <el-container>
          <el-main id="articlebox-el-main">{{ content }}</el-main>
          <el-footer id="articlebox-el-footer" style="height: 20px">{{
            updatedTime
          }}</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, getCurrentInstance, reactive } from "vue";
const props = defineProps({
    title: {
      type: String,
      required: true,
      default: "",
    },
    updatedTime: {
      type: String,
      required: true,
      default: "",
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    imageUrl: {
      type: String,
      requireed: true,
      default: "",
    },
})

  
    const router = useRouter();
    const store = useStore();
    let showImage = ref("false");
    const imageUrl = ref("");
    const ifImage = (imageUrl:string) => {
      console.log("IMGGGGGGGGGGGGGGGGGGGGG")
      console.log(props.imageUrl)
      if (props.imageUrl == "") {
        return false;
      } else {
        return true;
      }
    };
    // imageUrl = 'http://t15.baidu.com/it/u=484802429,477048929&fm=224&app=112&f=JPEG?w=500&h=500'
    // console.log(props.title);
    // console.log(props.image);
    //if (props.image) {
    // console.log("noimagge")
    // ifImage = true;
    //}



</script>

<style>
.common-layout#articlebox-layout {
  background: whitesmoke;
  opacity: 0.5;
  border-radius: 25px;
  margin-top: 20px;
}
.common-layout#articlebox-layout:hover {
  transform: scale(1.01);
  transition: all 300ms linear;
}
.el-header#articlebox-el-header {
  margin-top: 10px;
  margin-right: auto;
  font-weight: bold;
  font-size: 20px;
  height: 30px;
  text-decoration: underline;
}
.el-header#articlebox-el-header:hover {
  cursor: pointer;
  font-size: 21px;
  color: #f54c53;
}
.el-footer#articlebox-el-footer {
  margin-left: auto;
}
.el-main#articlebox-el-main {
  text-align: left;
  margin-bottom: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  white-space: nowrap;
}
.el-aside#image {
  width: 20%;
  height: auto;
  background-repeat: no-repeat;
  margin-left: 20px;
  background-size: 100% 100%;
}
</style>