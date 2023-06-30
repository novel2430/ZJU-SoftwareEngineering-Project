<template>
  <div class="header">
    <el-menu
      class="el-menu"
      mode="horizontal"
      background-color="#0d6efd"
      text-color="#ffffff"
      active-text-color="#fec776"
    >
      <el-menu-item index="1">病人面板</el-menu-item>
      <el-menu-item index="2" @click="currentPage=1">聊天室</el-menu-item>
    </el-menu>
  </div>
  <div class="main">
    <Chatroom 
      v-if="currentPage==1"
      :data="currentPage"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import Chatroom from './Chatroom.vue';
export default {
  components:{
    Chatroom,
  },
  data(){
    return{
      currentPage: 1,
    }
  },
  methods:{
    changePage(param){
      this.currentPage = param
      console.log(param)
    },
  },
  updated() {
  },
}
</script>

<style>


</style>
