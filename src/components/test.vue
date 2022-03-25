<template>
   <el-form :model="form" label-width="120px" style=" margin-top: 10%;" size="large" class="selectForm">
    <el-form-item label="添加类型: " >
    </el-form-item>
    <el-form-item label="卡口搜索：" placeholder="请输入卡口编号或者卡口名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="卡口范围：">
     <el-radio-group v-model="selectType" :disabled="disableChoose" class="rg-choose">
          <el-radio class="radio-square" :label="1" @click="clickChoose(1)"> 框选 </el-radio>
          <el-radio class="radio-circle" :label="2" @click="clickChoose(2)"> 圈选 </el-radio>
    </el-radio-group>
    <el-button type="text" @click="dialogVisible = true">卡口选择</el-button>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
      <span>可拖动界面</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确定</el-button
            >
          </span>
        </template>
    </el-dialog>
    </el-form-item>
    <el-form-item label="上传文件">
        <el-upload
        ref="upload"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload"
          >上传文件</el-button
        >
        <template #tip>
          <div class="el-upload__tip" style="color: red">
            最少上传一个文件，新文件将会覆盖旧文件
          </div>
        </template>
      </el-upload>
<<<<<<< HEAD
     <el-button type="text" @click="dialogVisible = true">卡口选择
    </el-button>
    <el-dialog v-model="dialogVisible" title="卡口选择" width="30%" draggable>
      <el-radio-group v-model="labelPosition" style="float:left">
        <el-radio-button label="left">道路</el-radio-button>
        <el-radio-button label="right">区县</el-radio-button>
      </el-radio-group>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
=======
>>>>>>> 8b82786abbb60f27e81eedc151c9313db97b8478
    </el-form-item>
      <el-table :data="tableData" style="width: 100%;background:black;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="serNo" label="序号" width="80" />
        <el-table-column prop="codeGateNo" label="卡口编号" width="140" />
        <el-table-column prop="codeGateName" label="卡口名称" width="140" />
        <el-table-column prop="opeation" label="操作" >
          <template #default>
            <el-button type="text" size="small" @click="handleClick">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    <el-pagination
              layout= "total, sizes,prev,pager,next,jumper"
              :page-size= "pageSize"
              :page-sizes= "[3,5,7,10]"
              :total= "total"
              v-model:currentPage= "currPage"
              @current-change= "handleSizeChange"
              @size-change= "handleCurrentChange"
/>
  </el-form>
</template>
<script>
import { ref } from 'vue'

const upload = ref()

const handleExceed = (files) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}
const submitUpload = () => {
  upload.value.submit()
}
export default {
    data() {
        return {
          showPointIndex: 1,
          form:{
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
            tableData : [
               {
                serNo: '1',
                codeGateNo: '22123214213123',
                codeGateName: '广州市越秀区',
                operator:'删除'
               }
            ],
          pageSize: 10,
          currPage: 0,
          list: [],
          total: 20,
          dialogVisible: false,
<<<<<<< HEAD
          formLabelAlign: [
            {
            name: '',
            region: '',
            type: '',
            }
          ],
           // 操作员字典
          czyOptions: []
=======
          disableChoose: false,
          // 选择方式（不选为0，框选为1，圈选为2）
          selectType: 0,
          // 地图缩放等级
          zoom: '',
          // drawing manager
          drawingManager: null,
>>>>>>> 8b82786abbb60f27e81eedc151c9313db97b8478
        }
    },
    created() {
    },
    methods:{
         // 初始化数据,显示地图
    async init() {
      // const dataGroup = await this.getProvinceData()
      // this.HNProvince = dataGroup.total
      // this.HNLevel = dataGroup.level
      // this.childrenList = dataGroup.children
      // const dataList = await this.getHNGateList()
      // this.mapData = dataList.list
      this.showMap()

      // 实例化绘制工具
      const styleOptions = {
        strokeColor: '#5E87DB', // 边线颜色
        fillColor: '#5e87db', // 填充颜色
        strokeWeight: 2, // 边线宽度
        strokeOpacity: 1, // 边线透明度
        fillOpacity: 0.3, // 填充透明度
        strokeStyle: 'solid' // 边线样式
      }
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        circleOptions: styleOptions, // 圆的样式
        rectangleOptions: styleOptions // 矩形的样式
      })
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      this.drawingManager.addEventListener('overlaycomplete', this.overlayComplete)
    },
    // 处理框选点击
    clickChoose(e) {
      if (this.showPointIndex === 1) return
      e === this.selectType ? this.selectType = 0 : this.selectType = e
      if (this.selectType > 0) {
        this.clearCustomerOverlays('choose')
        this.enableDrawingMode()
      } else {
        this.disableDrawingMode()
          }
    },
    // 开启绘制模式
    enableDrawingMode() {
      console.log('开启绘制模式')
      this.drawingManager.close()
      this.map.disableDragging() // 禁止地图拖拽
      if (this.selectType === 1) {
        this.drawingManager._drawingType = 'rectangle'
      } else if (this.selectType === 2) {
        this.drawingManager._drawingType = 'circle'
      }
      this.drawingManager.open()
    },
        // 关闭绘制模式
    disableDrawingMode() {
      this.selectType = 0
      this.map.enableDragging() // 恢复地图拖拽
      this.drawingManager.close()
    },
        // 删除绘制的overlays(如:框选等)
    clearCustomerOverlays(type) {
      switch (type) {
        case 'choose':
          for (let i = 0; i < this.chooseOverlays.length; i++) {
            this.map.removeOverlay(this.chooseOverlays[i])
          }
          this.chooseOverlays.length = 0
          break

        case 'routing':
          for (let i = 0; i < this.routingOverlays.length; i++) {
            this.map.removeOverlay(this.routingOverlays[i])
          }
          this.routingOverlays.length = 0
          break
      }
    },
     // 获取选中图标路径
    getIconHovel(type) {
      let iconHover = ''
      switch (type) {
        case '1':
          iconHover = `${this.kk_road_hover}`
          break
        case '2':
          iconHover = `${this.kk_police_hover}`
          break
        case '3':
          iconHover = `${this.kk_speed_hover}`
          break
        case '4':
          iconHover = `${this.kk_monitor_hover}`
          break
        case '5':
          iconHover = `${this.kk_park_hover}`
          break
        case '6':
          iconHover = `${this.kk_phone_hover}`
          break
      }
      return iconHover
    },
        // 获取正常图标路径
    getIconNormal(type) {
      let iconNormal = ''
      switch (type) {
        case '1':
          iconNormal = `${this.kk_road}`
          break
        case '2':
          iconNormal = `${this.kk_police}`
          break
        case '3':
          iconNormal = `${this.kk_speed}`
          break
        case '4':
          iconNormal = `${this.kk_monitor}`
          break
        case '5':
          iconNormal = `${this.kk_park}`
          break
        case '6':
          iconNormal = `${this.kk_phone}`
          break
      }
      return iconNormal
    },
        // 清空缓存的选中数据（并将当前页所有选中ICON还原）
    clear() {
      this.clearCustomerOverlays('choose')
      this.clearCustomerOverlays('routing')
      this.clickData = []
      this.arr = []
      sessionStorage.removeItem('mapChoose')
      this.resetGateState()
    },
    // 重置卡口状态
    resetGateState() {
      if (this.map.getZoom() >= 15) {
        this.pointsArr.forEach((item) => {
          if (document.querySelector(item.classN) != null) {
            document.querySelector(item.classN).firstChild.firstChild.src = this.getIconNormal(item.type)
          }
        })
      }
    },
    //文件上传
    handleExceed() {
      upload.value.clearFiles()
      upload.value.handleStart(files[0])
    },
    //删除按钮
    handleClick() {
    },
    //翻页
    handleSizeChange(pagesize) {
      this.pageSize = pagesize
      this.currPage = 1
      this.getList(this.currPage, this.pageSize)
    },
    //跳转
    handleCurrentChange(currPage) {
      this.currPage = currPage
      this.loadRoles()
      this.getList(this.currPage, this.pageSize)
    },
    //获取当前页数据
     getnewList() {
    },
    //树形控件-获取行政区划树
    handleNodeClick() {}
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
</style>

