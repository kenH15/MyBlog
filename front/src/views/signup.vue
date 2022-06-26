<template>
  <div id="background">
    <el-row>
      <el-col :span="6" :offset="16" style="margin-top: 15%">
        <el-tabs stretch type="border-card">
          <el-tab-pane label="Sign up">
            <el-form ref="refFromData" :model="FormData" class="signupForm">
              <el-form-item prop="fullname">
                <el-input
                  type="text"
                  v-model="FormData.fullname"
                  placeholder="Full Name"
                />
              </el-form-item>
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="FormData.username"
                  placeholder="Username"
              /></el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="FormData.password"
                  placeholder="Password"
              /></el-form-item>
              <el-form-item prop="password2">
                <el-input
                  type="password"
                  v-model="FormData.password2"
                  placeholder="Confirm password"
              /></el-form-item>
              <el-button id="signupBtn" @click="submitSignup"
                >Sign up</el-button
              >
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Login">
            <el-form ref="refFromData2" :model="FormData" class="signupForm">
              <el-form-item prop="loginUsername">
                <el-input
                  type="text"
                  v-model="FormData.loginUsername"
                  placeholder="Username"
              /></el-form-item>
              <el-form-item prop="loginPassword">
                <el-input
                  type="password"
                  v-model="FormData.loginPassword"
                  placeholder="Password"
              /></el-form-item>
              <el-button id="loginBtn" @click="submitLogin">Login</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from "vue";
//const { globalProperties } = useCurrentInstance();
//console.log(globalProperties);
//-------stroe--------//
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();

const currentInstance: any = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;

const refFromData = ref();
const refFromData2 = ref();
interface user {
  username: string;
  fullname: string;
  password: string;
  password2: string;
  loginUsername: string;
  loginPassword: string;
}
interface Props {
  fullname?: string;
  username: string;
  password: string;
  //title?:string  ?:可有可无
}
const FormData: user = reactive({
  username: "",
  fullname: "",
  password: "",
  password2: "",
  loginUsername: "",
  loginPassword: "",
});
const submitSignup = () => {
  if (FormData.password !== FormData.password2) {
    console.log("not same");
    ElMessage({
      message:
        "The password and confirmation password are different.  Please double-check these fields and try again.",
      type: "warning",
    });
  } else if (
    FormData.username &&
    FormData.fullname &&
    FormData.password &&
    FormData.password2
  ) {
    let obj: Props = {
      fullname: FormData.fullname,
      username: FormData.username,
      password: FormData.password,
    };

    $axios
      .post("/api/users/signup", obj)
      .then((res: any) => {
        console.log(res);
        if (res.status === 401) {
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
    refFromData.value.resetFields();
  } else {
    ElMessage({
      message:
        "Completing the incomplete information, please return the completed.",
      type: "warning",
    });
  }
  // refFromData.value.resetFields();
};
const submitLogin = () => {
  if (FormData.loginUsername && FormData.loginPassword) {
    let obj: Props = {
      username: FormData.loginUsername,
      password: FormData.loginPassword,
    };
    $axios
      .post("/api/users/login", obj)
      .then((res: any) => {
        if (res.status === 401) {
          ElMessage({
            message: res.data.msg,
            type: "warning",
          });
        } else if (res.status === 200) {
          let token = res.data.token;
          console.log(token);
          store.commit("login_saveToken", token);
          console.log(store.state.status);
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
          router.push({ name: "home" });
        }
      })
      .catch((err: any) => {
        ElMessage.error(err.response.data.msg);
      });
    refFromData2.value.resetFields();
  } else {
    ElMessage({
      message:
        "Completing the incomplete information, please return the completed.",
      type: "warning",
    });
  }
};
</script>

<style>
.el-tab-pane#signup {
  border-collapse: separate;
  border-spacing: 5px;
}
.el-table__body {
  -webkit-border-vertical-spacing: 13px;
}
.signupForm {
  text-align: center;
}
#signupBtn {
  background: #f54c53;
  border: 2px solid #f54c53 !important;
  width: 100px;
}

#loginBtn {
  background: #f54c53;
  border: 2px solid #f54c53 !important;
  width: 100px;
}
.el-button:hover {
  --el-button-hover-text-color: #ffffff;
}
:root {
  --el-color-primary: #f54c53;
}
</style>
