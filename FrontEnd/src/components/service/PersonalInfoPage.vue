<template>
  <div class="image">
    <img class="main-pic" src="@/assets/gura.jpg">
  </div>
  <div class="simple-text">
    Hello! Service {{username}}!
    <br>
    Here's your profile.
  </div>
  <div class="profile">
    <div class="profile-blocks">
      <div class="profile-block" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
        <div class="title">ID</div>
        <div class="profile-text">{{id}}</div>
      </div>
      <div class="profile-block" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
        <div class="title">Name</div>
        <div class="profile-text">{{name}}</div>
      </div>
      <div class="profile-block" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
        <div class="title">Phone</div>
        <div class="profile-text">{{phoneNumber}}</div>
      </div>
      <div class="profile-block" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
        <div class="title">Mail</div>
        <div class="profile-text">{{email}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: this.$global.name,
            id: 0,
            name: "",
            phoneNumber: "",
            email: "",
        };
    },
    methods: {
        async getPersonalInfo(){
          var url = this.$global.httpBasic + '/api/service/data'
          const res = await this.$axios.get(url)
          if(res.data.state == 1){
            var content = res.data.content
            this.id = content.id
            this.name = content.service_name
            this.phoneNumber = content.phone
            this.email = content.mail
          }
        },
    },
    mounted() {
      //往server获取数据。
      this.getPersonalInfo()
    },
}
</script>

<style scoped>
.image{
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.simple-text{
  margin-top: 60px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #0d6efd;
}
.profile{
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.profile-blocks{
  display: flex;
  flex-direction: row;
  width: 1000px;
  justify-content: space-between;
}
.profile-block{
  height: 200px;
  width: 200px;
  border-bottom: 6px solid #0d6efd;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title{
  margin-top: 30px;
  font-size: 35px;
  font-weight: bold;
  color: #0d6efd;

}
.profile-text{
  margin-top: 30px;
  font-size: 19px;
  color: #0d6efd;
  border-bottom: 3px solid #0d6efd;
}
</style>
