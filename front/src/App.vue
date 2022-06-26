<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  mounted():void {
    let token = window.localStorage.getItem("token");
    const store = useStore();

    if (token) {
      console.log("these is a token");
      store.commit("login_saveToken", token);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
:root {
  --el-color-primary: #f54c53;
}
</style>
