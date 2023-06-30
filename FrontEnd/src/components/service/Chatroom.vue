<template>
  <div class="chatroom-panel">
    <div class="chatroom-panel-left">
      <div class="chatroom-panel-left-content">
        <div class="service-chat-list-title" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
          <h>待回答列表</h>
        </div>
        <div class="service-chat-lists" >
          <el-scrollbar>
            <el-menu
              active-text-color="#0d6efd"
              background-color="#ffffff"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#424243"
              style="border: 0px;"
              @select="handelTitleSelect"
            >
              <el-menu-item v-for="n in chatrooms" :index="n.chatId" :style="{ boxShadow: `var(--el-box-shadow-light)`,}" class="title-item">
                <a style="font-size:17px; margin-right:10px;">[{{n.chatId}}] </a>
                <span class="title-text">{{n.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="chatroom-panel-right">
      <div class="service-chat-list-title" :style="{ boxShadow: `var(--el-box-shadow-dark)`,}">
        <h>聊天室 [{{currentChatId}}]</h>
      </div>
      <div class="chat-area">
        <el-scrollbar ref="contentScroll">
          <div ref=contentRef>
            <div v-for="n in contentItems">
              <div v-if="n.from=='service'" class="service-chat" :style="{ boxShadow: `var(--el-box-shadow)`,}">
                <a>{{n.content}}</a>
                <div style="display: flex; justify-content:flex-end;">
                  <a style="font-weight: bold; color:#ffffff;">- Service -</a>
                </div>
              </div>
              <div v-if="n.from=='patient'" class="patient-chat" :style="{ boxShadow: `var(--el-box-shadow)`,}">
                <a>{{n.content}}</a>
                <div style="display: flex; justify-content:flex-end;">
                  <a style="font-weight: bold; color:#ffffff">- Patient -</a>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="chat-input-area" :style="{ boxShadow: `var(--el-box-shadow-light)`,}">
        <el-input
          v-model="message"
          :rows="3"
          type="textarea"
          style="font-size:20px;"
          placeholder="Please input"
        />
        <div class="chat-btns">
          <el-button 
            type="primary" 
            round
            style="width:100px;"
            @click="sendMessage()"
          >发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
export default {
  data(){
    return{
      message:'',
      websocket: null,
      currentChatId: 0,
      chatrooms:[],
      contentItems:[],
    }
  }, 
  mounted() {
    this.enterChatRoom()     
  },
  beforeUnmount(){
    if(this.websocket != null){
      this.websocket.close()
    }
  },
  updated() {
  },
  props:{
    data: Number
  },
  methods: {
    handelTitleSelect(index){
      this.currentChatId = index 
      this.getContent()
    },
    enterChatRoom(){
      if(this.websocket==null){
        this.init_websocket()
      }
    },
    init_websocket() {
      var url = this.$global.wsBasic + '/chat/service'
      this.websocket = new WebSocket(url)
      this.websocket.onopen = this.onopen_websocket
      this.websocket.onmessage = this.onmessage_websocket
      this.websocket.onclose = this.onclose_websocket
    },
    onopen_websocket() {
      console.log('WebSocket is connected.')
      this.getTitles()
      this.sendWsSuccessNotification("您成功进入聊天室！") 
    },
    onmessage_websocket(e) {
      console.log('WebSocket is received a message.')
      var msg = JSON.parse(e.data)
      console.log(data)
      if(msg.state == 1){
        if(msg.type == 1){
          // 收到一则病人发来的消息
          var data = msg.data
          var chatId = data.chatId
          if(this.currentChatId == chatId){
            var row = {
              type: msg.type,
              id: chatId,
              msg: data.text,
              time: data.time,
            }
            this.inputOneChatContentInTables(row, 'patient', 'service')
          }
          else{
            var str = '聊天室[' + chatId + ']：' + data.text
            this.sendNotifiacation('讯息提醒', str)
          }
        }
        else if(msg.type == 0){
          // 被安排了新聊天室
          this.getTitles()
          this.sendNotifiacation('聊天室新建', '您被安排了新的聊天室')
        }
        else if(msg.type == 2){
          // 有聊天室结束
          this.getTitles()
          this.sendNotifiacation('聊天室结束', '聊天室['+msg.data+'] 已结束')
          if(msg.data==this.currentChatId){
            this.contentItems = []
            this.currentChatId = 0
          }
        }
      }
      else{
        alert('Websocket Error!')
      }
    },
    onclose_websocket() {
      console.log('WebSocket is closed.')
      this.websocket = null
      this.$emit("changePage",1) 
      this.sendWsWarningNotification('您成功离开聊天室')
    },
    sendNotifiacation(title_, content_){
      ElNotification({
        title: title_,
        message: content_,
      })
    },
    sendWsSuccessNotification(content_){
      ElMessage({
        showClose: true,
        message: content_,
        type: 'success',
      })
    },
    sendWsWarningNotification(content_){
      ElMessage({
        showClose: true,
        message: content_,
        type: 'warning',
      })
    },
    sendMessage(){
      if(this.message != '' && this.websocket != null && this.currentChatId>0){
        var data = {
          type: 1,
          id: this.currentChatId,
          msg: this.message,
          time: this.getNowDate(),
        }
        var jsonData = JSON.stringify(data)
        this.websocket.send(jsonData)
        this.inputOneChatContentInTables(data, 'service', 'patient')
      }
      this.message = ''
    },
    setScrollBarBottom(){
      this.$nextTick(() => {
        var height = this.$refs.contentRef.clientHeight
        this.$refs.contentScroll.setScrollTop(height)
      })
    },
    inputOneChatContentInTables(data, from_, to_){
      var row = {
        content: data.msg,
        from: from_,
        to: to_,
        time: data.time
      }
      this.contentItems.push(row)
      this.setScrollBarBottom()
    },
    getNowDate(){
      var today = new Date()
      var month = (today.getMonth()+1).toString().padStart(2,'0')
      var day = today.getDate().toString().padStart(2,'0')
      var hour = today.getHours().toString().padStart(2,'0')
      var min = today.getMinutes().toString().padStart(2,'0')
      var sec = today.getSeconds().toString().padStart(2,'0')
      var date = today.getFullYear()+'-'+month+'-'+day
      var time = hour + ":" + min + ":" + sec
      var dateTime = date+' '+time
      return dateTime
    },
    async getTitles(){
      var url = this.$global.httpBasic + '/api/service/chatroom/get/titles' 
      var res = await this.$axios.get(url)
      if(res.data.state == 1){
        console.log(res)
        var items = res.data.content
        this.chatrooms = items
      }
    },
    async getContent(){
      if(this.currentChatId>0){
        this.contentItems.splice(0, this.contentItems.length)
        var url = this.$global.httpBasic + '/api/service/chatroom/get/content' 
        var res = await this.$axios.get(url,{
          params:{
            'id': this.currentChatId,
          }
        })
        if(res.data.state == 1){
          console.log(res)
          for(let i=0; i<res.data.content.length; ++i){
            this.contentItems.push(res.data.content[i])
          }
          this.setScrollBarBottom()
        }
      }
    },
    
  },
}
</script>

<style>
.chatroom-panel{
  margin: 10px;
  display: flex;
  justify-content: center;
  height: 870px;
}
.chatroom-panel-left{
  width: 340px;
  display: flex;
  align-content: center;
  flex-direction: column;
  padding-right: 20px;
}
.service-chat-list-title{
  border-bottom: 6px solid #0d6efd;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  margin-bottom: 10px;
}
.service-chat-lists{
  display: flex;
  flex-direction: column;
  height: 750px;
  padding-bottom: 30px;
}
.title-item{
  margin-bottom: 25px;
  border-bottom: 4px solid #3b77ce;
  margin-left: 5px; 
  margin-right: 5px; 
  height:100px;
}
.title-text {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
  font-size: 18px;
}

.chatroom-panel-right{
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
}
.chat-area{
  height: 70%;
  display: flex;
  align-content: center;
  flex-direction: column;
}
.service-chat{
  background-color: #81a5da;
  padding: 20px;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  flex-direction: column;
  animation: right-to-left 1s ease;
}
@keyframes right-to-left {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: none;
  }
}
.patient-chat{
  background-color: #81c0da;
  padding: 20px;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 20px;
  border-radius: 10px;
  animation: left-to-right 1s ease;
}
@keyframes left-to-right {
  0% {
    transform: translateX(-500px);
  }
  100% {
    transform: none;
  }
}
.chat-input-area{
  border: 4px solid #0d6efd;
  padding: 20px;
  display: flex;
  align-content: space-around;
  flex-direction: column;
  border-radius: 20px
}
.chat-btns{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}


</style>
