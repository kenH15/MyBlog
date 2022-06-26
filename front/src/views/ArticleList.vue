<template>
  <div id="background" style="position: relative">
    <el-row justify="center">
      <el-col :span="20">
        <div class="articleContainer" v-for="item in lists.article" :key="item.id">
          <articleItem :title="item.title" :updatedTime="item.updatedAt" :content="item.content" :imageUrl="item.imgUrl"
            @click="routeToArticleById(item._id)"></articleItem>
        </div>
      </el-col>
      <!--<pageination :total="pageTotal" background @pageChange="handleChangePage"></pageination>-->
    </el-row>
    <div style="position: absolute; bottom: 3%; right: 0">
      <el-row>
        <el-col>
          <el-pagination :total="pageTotal" :page-size="5" background layout="prev, pager, next"
            :current-page="currentPage" @current-change="handleCurrentChange"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
import articleItem from "@/components/ArticleItem.vue";

export default defineComponent({
  components: {
    articleItem,
  },
  props: {},

  setup(props, context) {
    const currentPage: any = ref();
    const pageSize: any = ref(10);

    const store = useStore();
    const userid = store.state.userid;

    let pageTotal: any = ref(1);
    const handleCurrentChange = (val: string) => {
      console.log(val);
      currentPage.value = val;
      router.push("/articlelists/" + userid + "/" + currentPage.value);
      console.log(currentPage.value);
    };

    const lists: any = reactive({ article: [] });
    const currentInstance: any = getCurrentInstance();
    const { $axios } = currentInstance.appContext.config.globalProperties;

    const getList = (page: string) => {
      $axios
        .get("/api/articles/" + userid + "/" + page)
        .then((res: any) => {
          if (res.status === 200) {
            console.log("body");
            console.log(res.data.body);
            lists.article = res.data.body;
            pageTotal.value = res.data.num;
            console.log(pageTotal.value);
            return lists.article;
          }
        })
        .catch((err: any) => {
          console.log("get articles fail");
        });
    };


    watchEffect(() => {
      lists.article = getList(currentPage.value);
      console.log(currentPage.value);
    });

    /*---------routerToArticleById------------ */
    const router = useRouter();
    const routeToArticleById = (id: string) => {
      router.push("/articles/" + id + "/detail");
    };

    return {
      lists,
      pageTotal,
      currentPage,
      pageSize,
      handleCurrentChange,
      routeToArticleById,
    };
  },
});
</script>

<style>
.el-descriptions {
  margin-top: 20px;
}
</style>
