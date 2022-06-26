<template>
    <div class="common-layout">
        <el-container id="commentContainer">
            <el-aside width="25">{{username}}</el-aside>
            <el-container>
                <el-header height="10px" style="margin-right:auto">{{updatedTime}}</el-header>
                <el-main style="margin-right:auto" >{{ content }}</el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    content: {
        type: String,
        required: true,
        default: "",
    },
    updatedTime: {
        type: String,
        required: true,
        default: "",
    },
    username: {
        type: String,
        required: true,
        default: "",
    },

})
</script>
<style>
#commentContainer {
    border-bottom: 1px solid #ccc;
    
}
</style>