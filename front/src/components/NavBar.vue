<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1">MyBlog</el-menu-item>
    <el-sub-menu v-if="store.state.status == 'login'" index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">Create Article</el-menu-item>
      <el-menu-item index="2-2">My Articles</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>{{ username }}</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-sub-menu
      v-if="store.state.status == 'login'"
      style="margin-left: auto"
      index="3"
    >
      <template #title>
        <div v-if="store.state.ifHasAvatar" class="avatar">
          <el-avatar
            style="vertical-align: middle"
            :src="store.state.imageUrl"
          />
        </div>
        {{ username }}
      </template>
      <el-menu-item index="3-1">Logout</el-menu-item>
      <el-menu-item index="3-2">Settings</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script  setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const username = computed(() => {
  // console.log(store.state.token)
  return store.state.username;
});
const handleSelect = (index: string) => {
  if (index == "1") {
    if (store.state.status == "logout") {
      router.push({ name: "signup" });
    } else if (store.state.status == "login") {
      router.push({ name: "home" });
    }
  } else if (index == "3-1") {
    console.log("logout");
    router.push({ name: "signup" });
    store.commit("logout_delToken");
  } else if (index == "3-2") {
    router.push({ name: "settings" });
  } else if (index == "2-1") {
    router.push({ name: "articles" });
  } else if (index == "2-2") {
    router.push("/articlelists/" + store.state.userid + "/1");
  }
};
</script>

<style>
</style>