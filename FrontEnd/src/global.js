import { ElMessageBox } from 'element-plus'

// http basic url
// const httpBasic = "https://yejsgk.top:443/back/demo2"
const httpBasic = "http://localhost:8080/demo2"
// websocket basic url
// const wsBasic = "wss://yejsgk.top:443/back/demo2"
const wsBasic = "ws://localhost:8080/demo2"
// current user type
let currentType = ''
// current user name
let name = ''
// current user login state
let isLogin = false
let serviceCurrentPage = 1

function sendAlert(title, content) {
  ElMessageBox.alert(content, title)
}

export default{
  httpBasic,
  wsBasic,
  currentType,
  name,
  isLogin,
  sendAlert,
  serviceCurrentPage,
} 
