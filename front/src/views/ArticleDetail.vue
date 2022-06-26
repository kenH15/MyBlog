<template>
  <div id="background">
    <el-row justify="center">
      <el-col :span="22">
        <div class="ArticleDetailContainer">
          <div class="common-layout">
            <el-container>
              <el-header height="60" id="title">
                <el-row>
                  <el-col :span="12" :offset="6">
                    <h2>{{ article.title }}</h2>
                  </el-col>
                  <el-col :span="3" id="deleteButton">
                    <el-button v-if="ifEdit" :icon="Edit" @click="editArticle" />
                    <el-button v-if="!ifEdit" type="success" :icon="Check" @click="save" />
                    <el-button type="danger" :icon="Delete" @click="deleteArticle" />
                  </el-col>
                  <el-col> </el-col>
                </el-row>
              </el-header>
              <el-main id="content">
                <el-row>
                  <v-md-preview v-if="ifEdit" :text="article.content"></v-md-preview>
                  <v-md-editor v-if="!ifEdit" v-model="text" height="550px"></v-md-editor>
                </el-row>
              </el-main>
              <Comment :articleId=props.id v-if="ifEdit"></Comment>
            </el-container>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive, toRefs, defineComponent } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Delete, Edit, Check } from "@element-plus/icons-vue";
import Comment from "../components/Comment.vue";

const props = defineProps({
  id: String,
  userid: String,
});

const router = useRouter();
let text = ref();
/*----------axios---------*/
const currentInstance: any = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;
/*-----------------------*/

let ifEdit = ref(true);

const article: any = reactive({
  title: "",
  content: "",
  updatedTime: "",
});

//const title=ref("");

/*-----------------getArticleDetail*----------------------*/
const getDetail = () => {
  console.log(props.id);
  $axios
    .get("/api/articles/" + props.userid + "/" + props.id + "/detail")
    .then((res: any) => {
      console.log("enter                               detail ");
      console.log(res);
      //title.value = res.data.body.title;
      article.title = res.data.body.title;
      article.content = res.data.body.content;
      article.updatedTime = res.data.body.updatedAt;
    })
    .catch((err: any) => {
      console.log("getArticle detail fial");
    });
};
getDetail();

/*-----------------deleteArticle*--------------------*/
const deleteArticle = () => {
  console.log("delete");
  $axios
    .delete("api/articles/" + props.id)
    .then((res: any) => {
      if (res.status === 204) {
        ElMessage({
          message: "deleted successfully",
          type: "success",
        });
      }
      router.back();
    })
    .catch((err: any) => {
      ElMessage({
        message:
          "Completing the incomplete information, please return the completed.",
        type: "warning",
      });
    });
};

/*-----------------editArticle*------------------------*/
const editArticle = () => {
  ifEdit.value = false;
  text.value = article.content;
};

const save = () => {
  ifEdit.value = true;
  interface props {
    content?: string,
  }
  let obj: props = {
    content: text.value,
  };
  console.log(obj.content);
  $axios
    .put("/api/articles/" + props.id, obj)
    .then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        ElMessage({
          message: res.data.msg,
          type: "success",
        });
        console.log("edit success");
      }
      getDetail();

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
</style>
