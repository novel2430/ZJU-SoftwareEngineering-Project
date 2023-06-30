<template>
  <div class="header">
    <el-menu
      class="el-menu"
      mode="horizontal"
      background-color="#0d6efd"
      text-color="#ffffff"
      active-text-color="#fec776"
    >
      <el-menu-item index="1" @click="currentPage=0;">客服面板</el-menu-item>
      <el-menu-item index="2" @click="currentPage=1">个人中心</el-menu-item>
      <el-menu-item index="3" @click="currentPage=2">回答纪录</el-menu-item>
      <el-menu-item index="4" @click="currentPage=3">回答区</el-menu-item>
    </el-menu>
  </div>
  <div class="main">
    <MainPage v-if="currentPage==0"/>
    <PersonalInfoPage v-if="currentPage==1"/>
    <ChatDataPage v-if="currentPage==2"/>
    <Chatroom 
      v-if="currentPage==3"
      :data="currentPage"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import MainPage from './MainPage.vue'
import PersonalInfoPage from './PersonalInfoPage.vue';
import ChatDataPage from './ChatDataPage.vue';
import Chatroom from './Chatroom.vue';
export default {
  components:{
    MainPage,
    PersonalInfoPage,
    ChatDataPage,
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
