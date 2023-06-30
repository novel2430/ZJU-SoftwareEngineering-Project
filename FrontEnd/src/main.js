import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/index.css';
import global from './global.js'
import axios from 'axios';


// 页面的权限保护
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 需要权限
      //判断当前是否拥有权限
      if (global.currentType == to.meta.type && global.isLogin) {
        next();
      }
      else {  // 无权，跳转登录
        global.sendAlert('提示', '请先登入！');
        next({
          path: '/login',
          //query: {redirect: to.fullPath}   //登录成功后重定向到当前页面
        })
      }
  } else {  // 不需要权限，直接访问
      next();
  }
})

const app = createApp(App)
// 可以使用this.$axiox调用axios
app.config.globalProperties.$axios = axios.create({
  withCredentials: true,
})
// 可以使用this.$global调用全局变量
app.config.globalProperties.$global = global
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.mount('#app')
