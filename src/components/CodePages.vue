<template>
    <div class="u202203">
    <el-form :inline= "true" :model= "formInline" class="demo-form-inline" style="text-align: left;margin-left: 10%;">
    <el-form-item label="名称">
      <el-input v-model= "formInline.nameOrCode" placeholder="请输入卡口名称或编号"></el-input>
    </el-form-item>
    <el-form-item label="行政区划">
      <el-select v-model= "formInline.placeCode" placeholder="请选择">
        <el-option v-for= "code in formInline" :value= "code.placecode" :key= "code.placecode"
               :label= "code.placename"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="种类">
        <el-select v-model= "codeGateApplication.value" placeholder="请选择">
            <el-option
                v-for= "item in codeGateApplication"
                :key= "item.value"
                :label= "item.lable"
                :value= "item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="状态">
    <el-select v-model= "codeGateStatus.value" placeholder="请选择">
        <el-option
          v-for= "item in codeGateStatus"
          :key= "item.value"
          :label= "item.lable"
          :value= "item.value">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary" @click= "onSubmit">查询</el-button> -->
       <el-button type="primary" @click= "onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
    </div>
  <div class="u1200">
    <div class="t202203">
        <el-radio-group v-model="codeGateClass" >
            <el-radio-button label="1" class="t202203_01" size="large" style="float:left">环粤</el-radio-button>
            <el-radio-button label="2" class="t202203_01" size="large" style="float:left">环广</el-radio-button>
        </el-radio-group>
           <el-radio-group v-model="codeGateClass" style="float: right;">
            <el-radio-button size="large" @click="addClick">添加卡口</el-radio-button>
        </el-radio-group>
    </div>
    <el-table :data= "tableData">
      <el-table-column prop="no" label="序号" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="codeGateNo" label="编号" />
      <el-table-column prop="placeCode" label="行政区划" />
      <el-table-column prop="type" label="种类" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="opeation" label="操作" >
      <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  <div class="demonstration" >
<el-pagination
              layout= "total, sizes,prev,pager,next,jumper"
              :page-size= "pageSize"
              :page-sizes= "[3,5,7,10]"
              :total= "total"
              v-model:currentPage= "currPage"
              @current-change= "handleSizeChange"
              @size-change= "handleCurrentChange"
/>
</div>
</div>
</template>
<script>
import axios from '../utils/http.js'

export default {
  name: 'codePages',
  data() {
    return {
      formInline: {
      },
      codeGateApplication: [
        { value: '1', lable: '公路卡口' },
        { value: '2', lable: '电子警察卡口' },
        { value: '3', lable: '固定测速卡口' },
        { value: '4', lable: '视频监控卡口' },
        { value: '5', lable: '停行车和住宅小区卡口' },
        { value: '6', lable: '移动终端卡口' }
      ],
      codeGateStatus: [
        { value: '1', lable: '在用' },
        { value: '2', lable: '报废' },
        { value: '3', lable: '维修' },
        { value: '4', lable: '故障' }
      ],
      codeGateClass: 1,
      pageSize: 10,
      currPage: 0,
      list: [],
      total: 20
    }
  },
  created() {
    this.getnewList()
    this.tableData = this.getList()
  },
  methods: {
    handleSizeChange(pagesize) {
      this.pageSize = pagesize
      this.currPage = 1
      this.getList(this.currPage, this.pageSize)
    },
    handleCurrentChange(currPage) {
      this.currPage = currPage
      this.loadRoles()
      this.getList(this.currPage, this.pageSize)
    },
    getnewList() {
      axios.axiosGet('/vc/api/service/codeGate/getPlaceCode').then(res => {
        console.log(res)
        this.formInline = res.data
      })
        .catch(err => {
          console.log(err)
        })
    },
    getList() {
      axios.axiosPost('/vc/api/service/codeGate/getPage', {
        codeGateName: this.nameOrCode,
        placeCode: this.placeCode,
        codeGateUse: this.codeGateApplication.value,
        codeGateStatus: this.codeGateStatus.value,
        codeGateClass: this.codeGateClass
      }
      ).then(res => {
        console.log(res.data)
        this.tableData = res.data.records
      })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      console.log('传参==', this.nameOrCode, this.placeCode, this.type, this.codeGateStatus, this.codeGateClass)
      this.getList()
    },
    handleClick() {
    },
    addClick() {
      console.log('页面跳转')
      this.$router.push({
        path: 'add'
      })
    }
  }
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.u1200 {
    position: absolute;
    margin-right: 10%;
    margin-left: 10%;
    width: 80%;
    height: 200px;
    background: inherit;
    background-color: rgba(230, 230, 230, 1);
    border: none;
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
    border-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.el-pagination.is-background {
    color: #18ab8f;
    text-align: center;
    width: 800px;
    margin-left: 30%;
}
.t202203 {
  text-align: left;
  background-color: white;
}
.u202203_01 {
    text-align: left;
    width: 80%;
}
.t202203_02 {
  text-align: right;
}
</style>
