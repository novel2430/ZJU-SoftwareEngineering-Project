# ZJU Software Engineering Project [CustomerService Module]

## Introduction
范例前端文件，后端Java，数据库都架设在远端服务器  
访问整体网页进行操作可以浏览[Here](https://yejsgk.top)  
可以使用的帐号密码  
```
<Service>
snovel00 00000000

<Patient>
pnovel00 00000000
```

## BackEnd
后端使用了Java Servlet + MyBatis 实现  
数据库选用了MySQL  
在编译后端代码前，需要对``/BackEnd/src/main/resources/mybatis-config.xml``进行配置，填入自己使用的数据库帐号密码  
数据库使用的表以及其格式，可见SQL文件夹下的建表文件  
完成配置后，可以使用以下命令进行编译  
```
cd ./BackEnd
mvn clean compile package
```
完成编译后，war包在target文件夹下，最后将war包放入Tomcat中就完成了

## FrontEnd
前端使用了Vue3进行实现  
本地调适时，可以开在本地的8081端口进行调适(为了夸域)
### customer_service_support

This template should help get you started developing with Vue 3 in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
