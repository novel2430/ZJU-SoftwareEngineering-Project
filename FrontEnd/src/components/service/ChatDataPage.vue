<template>
  <div class="top">
    <div class="top-content" :style="{ boxShadow: `var(--el-box-shadow)`,}">
      <div class="search">
        <el-select @click="clearValue()" v-model="searchTypeValue" class="search-type" placeholder="选择你要搜寻的类型" size="large">
          <el-option
            v-for="item in searchType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="searchWayValue" class="m-2" placeholder="选择你要搜寻的方式" size="large">
          <el-option
            v-for="item in searchWay"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="value">
        <div class="value-input">
          <el-date-picker
            v-if="searchTypeValue=='start_time' || searchTypeValue=='end_time'"
            v-model="value"
            type="date"
            placeholder="选择日期"
            size="big"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
          <el-input v-if="searchTypeValue=='name' || searchTypeValue=='id'" v-model="value" placeholder="输入数值" />
          <el-select v-if="searchTypeValue=='star'" v-model="value" class="m-2" placeholder="星星" size="big">
            <el-option
              v-for="item in searchStar"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="value-btn">
          <el-button @click="getSearch()" class="search-bt" type="primary" round>搜寻</el-button>
          <el-button @click="getAll()" class="search-bt" type="primary" round>搜寻所有</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="down" >
    <div class='down-content'>
      <div class="table">
        <el-table :data="chatData" height=500 stripe>
          <el-table-column sortable prop="patient_id" label="患者编号" />
          <el-table-column sortable prop="patient_name" label="患者姓名"/>
          <el-table-column sortable prop="start_time" label="开始时间"/>
          <el-table-column sortable prop="end_time" label="结束时间"/>
          <el-table-column sortable prop="star" label="星星"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
export default {
  data(){
    return{
      searchType:[
        {value: 'id', label: '患者编号'},
        {value: 'name', label: '患者名'},
        {value: 'start_time', label: '开始时间'},
        {value: 'end_time', label: '结束时间'},
        {value: 'star', label: '星星'},
      ],
      searchTypeValue:'',
      searchWay:[
        {value: '=', label: '等于'},
        {value: '>', label: '大于'},
        {value: '<', label: '小于'},
      ],
      searchWayValue:'',
      searchStar:[
        {value: '0', label: '0 星'},
        {value: '1', label: '1 星'},
        {value: '2', label: '2 星'},
        {value: '3', label: '3 星'},
        {value: '4', label: '4 星'},
        {value: '5', label: '5 星'},
      ],
      value: '',
      chatData:[],
    }
  },
  methods:{
    getSearch(){
      var numReg = new RegExp("^[0-9]+$")
      if(this.value=='' || this.searchTypeValue=='' || this.searchWayValue==''){
        return
      }
      if(this.searchTypeValue=='id' && numReg.test(this.value)==false){
        this.$global.sendAlert('提示', '请输入正确的数值格式')
        return
      }
      this.goEndSearch(this.searchWayValue, this.value)
    },
    getAll(){
      this.getServiceChatDataAll()
    },
    goEndSearch(way, val){
      if(way=='='){
        this.getServiceChatDataEqual(val)
      }
      else if(way=='>'){
        this.getServiceChatDataMore(val)
      }
      else if(way=='<'){
        this.getServiceChatDataLess(val)
      }
    },
    async getServiceChatDataEqual(value){
      var url = this.$global.httpBasic + '/api/service/chat/get/equal'
      const res = await this.$axios.get(url,{
        params: {
          'search-type': this.searchTypeValue,
          'value': value,
        }
      })
      this.resultToTable(res)
    },
    async getServiceChatDataMore(value){
      var url = this.$global.httpBasic + '/api/service/chat/get/more'
      const res = await this.$axios.get(url,{
        params: {
          'search-type': this.searchTypeValue,
          'value': value,
        }
      })
      this.resultToTable(res)
    },
    async getServiceChatDataLess(value){
      var url = this.$global.httpBasic + '/api/service/chat/get/less'
      const res = await this.$axios.get(url,{
        params: {
          'search-type': this.searchTypeValue,
          'value': value,
        }
      })
      this.resultToTable(res)
    },
    async getServiceChatDataAll(){
      var url = this.$global.httpBasic + '/api/service/chat/get/all'
      const res = await this.$axios.get(url)
      this.resultToTable(res)
    },
    resultToTable(res){
      var state = res.data.state
      if(state==1){
        this.chatData = res.data.content;
      }
    },
    clearValue(){
      this.value = ''
    },
  },
  mounted(){
    this.getAll()
  },
}
</script>

<style scope>

.top{
  display:flex;
  justify-content:center;
  flex-direction: row;
  margin-top: 100px;
  margin-bottom: 50px;
}
.top-content{
  padding-top:30px;
  padding-bottom:30px;
  border: 6px solid #0d6efd;
  border-radius: 30px;
  width: 70%;

}
.down{
  display:flex;
  justify-content:center;
  flex-direction: row;
}
.down-content{
  border-radius: 10px;
  border: 4px solid #0d6efd;
  padding:20px;
  width: 90%;
}
.table{
  width: 100%;
}
.el-table{
  font-size: 16px;
}
.search{
  display:flex;
  justify-content:center;
  align-items: center;
}
.value{
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
}
.search-type{
  margin-right: 50px;
}

.value-btn{
  margin-top: 20px;
}


</style>
