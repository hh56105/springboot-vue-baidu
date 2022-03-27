<template>
  <el-form :model='form' label-width='120px' style=' margin-top: 10%;' size='large' class='selectForm'>
    <el-form-item label='添加类型: '>
    </el-form-item>
    <el-form-item label='卡口搜索：' placeholder='请输入卡口编号或者卡口名称'>
      <el-input v-model='form.name' />
    </el-form-item>
    <el-form-item label='卡口范围：'>
      <!-- 这里添加 @click.native.prevent 是为了可以让 radio 恢复不选！ -->
      <el-radio-group v-model='selectType' :disabled='disableChoose' class='rg-choose'>
        <el-radio class='radio-square' :label='1' @click.native.prevent='clickChoose(1)'> 框选</el-radio>
        <el-radio class='radio-circle' :label='2' @click.native.prevent='clickChoose(2)'> 圈选</el-radio>
      </el-radio-group>
      <el-button type='primary' @click='clear'>清除</el-button>
      <el-button type='text' @click='dialogVisible = true'>卡口选择</el-button>
      <el-dialog v-model='dialogVisible' title='卡口选择' width='30%' draggable>
        <div style='text-align: left'>
        <el-radio-group >
          <el-radio-button label="区县" />
          <el-radio-button label="道路" />
        </el-radio-group>
        </div>
        <div style='text-align: right'>
          <el-tree
            ref="tree"
            :data="treeOptions"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            @node-click="handleNodeClick"
          />
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCheckBox">确 定</el-button>
        </span >
        </div>
      </el-dialog>
    </el-form-item>
    <el-form-item label='上传文件'>
      <el-upload
        ref='upload'
        class='upload-demo'
        action='https://jsonplaceholder.typicode.com/posts/'
        :limit='1'
        :on-exceed='handleExceed'
        :auto-upload='false'
      >
        <template #trigger>
          <el-button type='primary'>选择文件</el-button>
        </template>
        <el-button class='ml-3' type='success' @click='submitUpload'
        >上传文件
        </el-button
        >
        <template #tip>
          <div class='el-upload__tip' style='color: red'>
            最少上传一个文件，新文件将会覆盖旧文件
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-table :data='tableData' style='width: 100%;background:black;'
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column type='index' label='序号' width='80' />
      <el-table-column prop='codeGateNo' label='卡口编号' width='140' />
      <el-table-column prop='codeGateName' label='卡口名称' width='140' />
      <el-table-column label='操作'>
        <template #default="scope">
          <el-button type='text' size='small' @click='handleDelete(scope.$index)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChange"
                   @current-change="currentChange"
                   :current-page="page"
                   :page-size="size" :page-sizes="pageSizes"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </el-form>
</template>
<script>
import bus from '@/utils/Bus'
import { getTree } from '@/api/tree'
import { ElMessageBox } from "element-plus";

export default {
  name: 'test',
  data() {
    return {
      // 控制popover弹出框是否展示
      popoverVisible: false,
      showPointIndex: 1,
      treeOptions: [{
        id:'',
        name:'',
        children:[]
      }],
      // select选择框选项
      typeOption: [
        {
          id: '1',
          name: '父级1'
        },
      ],
      //地图框选数组，用于显示分页列表
      chooseGateList:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // select的值
      typeValue: [],
      allData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      page: 1, //第几页
      size: 3, //一页多少条
      total: 0, //总条目数
      pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
      dialogVisible: false,
      disableChoose: true,
      // 选择方式（不选为0，框选为1，圈选为2）
      selectType: 0,
      // 地图缩放等级
      zoom: '',
      // drawing manager
      drawingManager: null,
    }
  },
  created() {
    bus.on('openChoose', (data) => {
      this.disableChoose = data
      if (data === true) {
        this.selectType = 0
      }
    })
    this.handleNodeClick();
  },
  destroyed() {
    bus.off('openChoose')
  },
  methods: {
    // 处理框选点击
    clickChoose(e) {
      this.selectType = e
      bus.emit('click', e)
      bus.on("chooseGateList",(data)=>{
        this.chooseGateList.push({
          codeGateNo: data.id,
          codeGateName: data.name
        })
        this.allData.push(this.chooseGateList)
        this.getTableData2()
      })
    },
    clear() {
      this.selectType = 0
      this.allData = this.allData.filter(item => !this.chooseGateList.includes(item))
      console.log(this.allData)
      this.getTableData2()
      bus.emit('clear')
    },
    //文件上传
    handleExceed() {
      // upload.value.clearFiles()
      // upload.value.handleStart(files[0])
    },
    //删除按钮
    handleDelete(index) {
      ElMessageBox.confirm("是否确认删除", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.handleSure(index);
      }).catch(() => {
        });
    },
    handleSure(val) {
      this.dialogVisible = false;
      this.allData.splice(val, 1);
      this.getTableData2()
    },
    //树形控件-获取行政区划树
    handleNodeClick() {
      getTree().then(res=>{
        console.log(res.data)
        this.treeOptions =  res.data;
      })
    },
    submitUpload() {
    },
    confirmCheckBox() {
      const codeGateData = this.$refs.tree.getCheckedNodes()
      this.forData(codeGateData)
      this.total=this.tableData.length
      this.getTableData2()
    },
    forData(list){
      list.forEach((item)=>{
        if (item.children && item.children.length){
          return this.forData(item.children)
        }
        else if (item.id.length>6) {
          this.allData.push({
            codeGateNo: item.id,
            codeGateName: item.name
          })
        }
      })
    },
    //获取表格数据，自行分页（splice）
    getTableData2() {
      if (this.allData && this.allData.length){
        let data=JSON.parse(JSON.stringify(this.allData))
        this.tableData = data.splice(
          (this.page - 1) * this.size,
          this.size
        );
      }
      this.total=this.allData.length
    },
    //page改变时的回调函数，参数为当前页码
    currentChange(val) {
      console.log("翻页，当前为第几页", val);
      this.page = val;
      this.getTableData2();
    },
    //size改变时回调的函数，参数为当前的size
    sizeChange(val) {
      console.log("改变每页多少条，当前一页多少条数据", val);
      this.size = val;
      this.page = 1;
      this.getTableData2();
    },
  },
  watch: {
  }
}
</script>
<style>
.el-radio-group {
  margin-right: 12px;
}

.el-form-item {
  font-size: 20px;
}

#selectForm.el-form-item_label {
  font-size: 120px;
}

.el-form-item__label {
  font-size: 20px;
}
/* 把select的下拉框隐藏 */
.hiddenSel{
  display: none;
}
</style>

