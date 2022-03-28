<template>
  <div id='allmap' class="app-container">
    <div class="operation">
      <div class="marker-choose">
        <span class="span-title">卡口选择</span>
        <!-- 这里添加 @click.native.prevent 是为了可以让 radio 恢复不选！ -->
        <el-radio-group v-model="selectType" :disabled="disableChoose" class="rg-choose">
          <el-radio class="radio-square" :label="1" @click.native.prevent="clickChoose(1)"> 框选 </el-radio>
          <el-radio class="radio-circle" :label="2" @click.native.prevent="clickChoose(2)"> 圈选 </el-radio>
        </el-radio-group>
        <span class="span-total"> 已选择总数：{{ arr.length }} </span>
        <el-button type="primary"  @click="clear">清除</el-button>
      </div>
    </div>
    <div id="container" />
  </div>
</template>
<script>
import { getGateGroup, getGateList } from '@/api/baidu'
import { reactive } from 'vue'
import  bus  from '@/utils/Bus.js'

export default {
  name: 'BMapMarker',
  setup() {
    reactive({
      oneMarker:{
        id: "",
        kkmc: "",
        xzqh: "",
        kklx2: "",
        kkzt: ""
      }
    })
    return  {}
  },
  created() {
    bus.on('click', (data) => {
      this.clickChoose(data)
    })
    bus.on("clear",() => {
      this.clear()
    })
  },
  data() {
    return {
      // 选择方式（不选为0，框选为1，圈选为2）
      selectType: 0,
      // 选择禁用
      disableChoose: true,
      // 地图实例
      map: null,
      // 地图缩放等级
      zoom: '',
      // 省卡口总数
      HNProvince: null,
      // 市州数组卡口汇总
      HNLevel: [],
      // 区县数组卡口汇总
      childrenList: [],
      // 卡口列表数据
      mapData: [],
      // 卡口显示模式（1：汇总 2：明细）,控制地图级别变化操作
      showPointIndex: 1,
      // 地图点聚合对象（我们修改了MarkerCluster_min.js, 控制了marker不会被聚合）
      clusterer: null,
      // 临时缓存已选择的卡口数组(id)
      arr: [],
      // 临时缓存已选择的卡口数组(数据)
      clickData: [],
      // 当前可视范围的卡口Marker数组
      boundMarker: [],
      // 缓存当前可视范围卡口自定义point数组
      pointsArr: [],

      // 不同卡口两种状态图标
      kk_monitor: require('@/assets/baidu/monitor.png'),
      kk_monitor_hover: require('@/assets/baidu/monitor-hover.png'),
      kk_police: require('@/assets/baidu/police.png'),
      kk_police_hover: require('@/assets/baidu/police-hover.png'),
      kk_phone: require('@/assets/baidu/phone.png'),
      kk_phone_hover: require('@/assets/baidu/phone-hover.png'),
      kk_road: require('@/assets/baidu/road.png'),
      kk_road_hover: require('@/assets/baidu/road-hover.png'),
      kk_speed: require('@/assets/baidu/speed.png'),
      kk_speed_hover: require('@/assets/baidu/speed-hover.png'),
      kk_park: require('@/assets/baidu/park.png'),
      kk_park_hover: require('@/assets/baidu/park-hover.png'),

      // drawing manager
      drawingManager: null,
      // 选择卡口时绘制的 overlays
      chooseOverlays: [],
      // 预判线路绘制的 overlays
      routingOverlays: [],

      // 起点,终点
      startMarker: null,
      endMarker: null,
      startPoint: '',
      endPoint: '',

      // 规划路径
      planRoutes: [],
      colorLists: [
        'rgb(220, 88, 11)',
        'rgb(220, 99, 168)',
        'rgb(22, 122, 177)',
        'rgb(22, 196, 198)',
        'rgb(1, 199, 235)',
        'blueviolet'
      ]
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.clear()
    bus.off('click');
    bus.off('clear');
  },
  methods: {
    // 初始化数据,显示地图
    async init() {
      const dataGroup = await this.getProvinceData()
      this.HNProvince = dataGroup.total
      this.HNLevel = dataGroup.level
      this.childrenList = dataGroup.children
      const dataList = await this.getHNGateList()
      this.mapData = dataList.list
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

    // 获取正常图标
    getIconImage(type) {
      let oneIcon = null
      // 为不同卡同类型加载不同的ICON
      const ZA_iconImage = new BMap.Icon(require('@/assets/baidu/monitor.png'), new BMap.Size(35, 35))
      const JC_iconImage = new BMap.Icon(require('@/assets/baidu/police.png'), new BMap.Size(35, 35))
      const SJ_iconImage = new BMap.Icon(require('@/assets/baidu/phone.png'), new BMap.Size(35, 35))
      const TC_iconImage = new BMap.Icon(require('@/assets/baidu/park.png'), new BMap.Size(35, 35))
      const GL_iconImage = new BMap.Icon(require('@/assets/baidu/road.png'), new BMap.Size(35, 35))
      const GD_iconImage = new BMap.Icon(require('@/assets/baidu/speed.png'), new BMap.Size(35, 35))
      /*
         1 公路卡口  2 电子警察卡口  3 固定测速卡口
         4 视频监控卡口  5 停车卡口  6 移动终端卡口
       */
      switch (type) {
        case '1':
          oneIcon = GL_iconImage
          break
        case '2':
          oneIcon = JC_iconImage
          break
        case '3':
          oneIcon = GD_iconImage
          break
        case '4':
          oneIcon = ZA_iconImage
          break
        case '5':
          oneIcon = TC_iconImage
          break
        case '6':
          oneIcon = SJ_iconImage
          break
      }
      return oneIcon
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

    // 绘制完毕处理
    overlayComplete(e) {
      this.chooseOverlays.push(e.overlay)
      this.pointsArr.forEach((item) => {
        const point = new BMap.Point(item.lng, item.lat)
        if ( BMapLib.GeoUtils.isPointInPolygon(point, this.chooseOverlays[this.chooseOverlays.length - 1])) {
          // 换为选中图标
          if (document.querySelector(item.classN) != null) {
            document.querySelector(item.classN).firstChild.firstChild.src = this.getIconHovel(item.type)
          }
          if (!this.arr.includes(item.id)) {
            this.arr.push(item.id)
            this.clickData.push({
              classN: item.classN,
              id: item.id,
              name: item.name,
              kklx2: item.type,
              lat: item.lat,
              lng: item.lng
            })
            sessionStorage.setItem('mapChoose', JSON.stringify(this.clickData))
          }
        }
      })
      this.disableDrawingMode()
      this.$store.commit("pushClickData",this.clickData)
      console.log("绘制完毕处理")
      bus.emit("drawingOver")
      // console.log("传入前监听",this.clickData.length)
    },

    // 获取广东各市区的卡口数量
    async getProvinceData() {
      const data = {
        total: '',
        level: [],
        children: []
      }
      await getGateGroup().then(response => {
        data.total = response.data.total
        response.data.rows.forEach(item => {
          data.level.push({
            dmsm1: item.dmsm1,
            dmsm4: item.dmsm4.split(','),
            total: item.total
          })
        })
        data.children.push(response.data.childrenList)
        console.log(data.children)
      })
      return data
    },

    // 获取广东全省卡口数据
    async getHNGateList() {
      const data = {
        total: '',
        list: []
      }
      await getGateList().then(response => {
        data.total = response.total
        data.list = response.data
      })
      return data
    },

    // 从缓存复制选中卡口到数组
    refreshChoosedPoints() {
      // 缩放地图时，将选中卡口重新复制到arr数组
      if (JSON.parse(sessionStorage.getItem('mapChoose'))) {
        this.arr = []
        this.clickData = JSON.parse(sessionStorage.getItem('mapChoose'))
        this.clickData.forEach(item => {
          this.arr.push(item.id)
        })
      }
    },

    // 重置汇总展示数据
    initProvinceData() {
      const style1 = {
        borderRadius: '5px',
        borderColor: '#ccc',
        padding: '10px 40px',
        lineHeight: '14px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#0179f9'
      }
      const style2 = {
        borderRadius: '5px',
        borderColor: '#ccc',
        padding: '10px 20px',
        lineHeight: '14px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#0179f9'
      }

      this.zoom = this.map.getZoom()
      let centerPoint

      if (this.map.getZoom() <= 8) {
        // <=8 级，显示按省汇总
        this.map.clearOverlays()
        const point = new BMap.Point(113.270708, 23.136617)
        const opts = {
          position: point
        }
        const province = '广东省' + this.HNProvince + '个'
        const label = new BMap.Label(province, opts)
        label.setStyle(style1)
        this.map.addOverlay(label)
        label.addEventListener('click', e => {
          this.map.clearOverlays()
          const jd = e.point.lng
          const wd = e.point.lat
          centerPoint = new BMap.Point(jd, wd)
          this.map.centerAndZoom(centerPoint, 9)
        })
      } else if (this.map.getZoom() === 9 || this.map.getZoom() === 10) {
        // 9，10 级，显示按市州汇总
        this.map.clearOverlays()
        this.HNLevel.forEach(item => {
          const point = new BMap.Point(item.dmsm4[0], item.dmsm4[1])
          const opts = {
            position: point
          }
          const name = item.dmsm1 + item.total + '个'
          const label = new BMap.Label(name, opts)
          label.setStyle(style2)
          this.map.addOverlay(label)
          label.addEventListener('click', e => {
            this.map.clearOverlays()
            const jd = e.point.lng
            const wd = e.point.lat
            centerPoint = new BMap.Point(jd, wd)
            this.map.centerAndZoom(centerPoint, 11)
          })
        })
      } else if (this.map.getZoom() === 11 || this.map.getZoom() === 12 || this.map.getZoom() === 13 || this.map.getZoom() === 14) {
        // 11，12，13，14 级，显示按区县汇总
        this.map.clearOverlays()
        const data = []
        this.childrenList.forEach(item => {
          item.forEach(arr => {
            data.push(arr)
          })
        })
        data.forEach(item => {
          if (item.dmsm4 !== '' && item.dmsm4 !== ',' && item.dmsm4 != null) {
            const po = item.dmsm4.split(',')
            const point = new BMap.Point(po[0], po[1])
            const opts = {
              position: point // 指定文本标注所在的地理位置
            }
            const name = item.dmsm1 + item.total + '个'
            const label = new BMap.Label(name, opts)
            label.setStyle(style2)
            this.map.addOverlay(label)
            label.addEventListener('click', e => {
              this.map.clearOverlays()
              const jd = e.point.lng
              const wd = e.point.lat
              centerPoint = new BMap.Point(jd, wd)
              this.map.centerAndZoom(centerPoint, 15)
            })
          }
        })
      } else if (this.map.getZoom() >= 15 && this.map.getZoom() <= 18) {
        // 卡口上点（这里不处理）
      }
    },

    // 展示地图
    showMap() {
      this.map = new BMap.Map('container')
      this.map.addControl(
        new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT })
      )
      let centerPoint = new BMap.Point(113.275, 28.21)
      this.map.centerAndZoom(centerPoint, 8)
      this.map.setMinZoom(8)
      this.map.setMaxZoom(17)
      this.map.enableScrollWheelZoom(true)
      this.map.enableDoubleClickZoom(true)

      const style = {
        borderRadius: '5px',
        borderColor: '#ccc',
        padding: '10px 40px',
        lineHeight: '14px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#0179f9'
      }

      // 初始化时，处理和上点展示全省卡口数量（蓝色方块）
      const point = new BMap.Point(113.270708, 23.136617)
      const opts = {
        position: point // 指定文本标注所在的地理位置
      }
      const province = '广东省' + this.HNProvince + '个'
      const label = new BMap.Label(province, opts)
      label.setStyle(style)
      this.map.addOverlay(label)
      label.addEventListener('click', e => {
        this.map.clearOverlays()
        const jd = e.point.lng
        const wd = e.point.lat
        centerPoint = new BMap.Point(jd, wd)
        this.map.centerAndZoom(centerPoint, 9)
      })
      // 移动地图时，根据地图级别来判断是否需要请求上点的
      this.map.addEventListener('moveend', (e) => {
        if (this.map.getZoom() >= 15) {
          if (this.clusterer) {
            setTimeout(() => {
              this.setClass(false)
            }, 100)
          }
        }
      })

      // 缩放地图时，根据地图级别来判断是否需要请求上点的
      this.map.addEventListener('zoomend', () => {
        if (this.map.getZoom() >= 15) {
          if (this.showPointIndex === 1) {
            // 刚从汇总切换到明细模式
            this.markerPoint()
            this.showPointIndex = 2
            this.disableChoose = false
            bus.emit("openChoose",this.disableChoose)
          }
          if (this.clusterer) {
            setTimeout(() => {
              this.setClass(true)
            }, 100)
          }
        }
        if (this.map.getZoom() < 15) {
          if (this.showPointIndex === 2) {
            // 刚从明细切换到汇总模式
            this.showPointIndex = 1
            this.clusterer.clearMarkers()
            this.disableChoose = true
            this.disableDrawingMode()
            bus.emit("openChoose",this.disableChoose)
          }
          this.initProvinceData()
        }
      })
    },

    // 添加地图 marker
    // [注] 由于使用的baidu地图的js中的一些内部对象（不同版本其在js混淆后命名不同）
    // 注意这里的 "item.ea"
    markerPoint() {
      this.map.clearOverlays()
      const markers = []

      // 根据接口返回来的卡口数据，根据kklx2的字段来过滤，每条数据对应的卡口类型是什么，来决定用哪个icon上点
      this.mapData.rows.forEach((item) => {
        const point = new BMap.Point(item.kkjd, item.kkwd) // 将标注点转化成地图上的点
        this.oneMarker = new BMap.Marker(point, { icon: this.getIconImage(item.kklx2) })
        this.oneMarker.id = item.kkbh
        this.oneMarker.kkmc = item.kkmc
        this.oneMarker.xzqh = item.xzqh
        this.oneMarker.kklx2 = item.kklx2
        this.oneMarker.kkzt = item.kkzt
        markers.push(this.oneMarker)

        // 鼠标over响应
        this.oneMarker.addEventListener('mouseover', () => {
          this.markerPointMouseover({ line: point, item: item })
        })

        // 鼠标离开响应
        this.oneMarker.addEventListener('mouseout', () => {
          this.map.closeInfoWindow()
        })

        // 鼠标点击响应
        this.oneMarker.addEventListener('click', event => {
          // 取出session保存的选中marker数组到 clickData 中
          if (JSON.parse(sessionStorage.getItem('mapChoose'))) {
            this.clickData = JSON.parse(
              sessionStorage.getItem('mapChoose')
            )
          } else {
            this.clickData = []
          }

          if (this.arr.length === 0) {
            // 如果临时选中缓存选中为空
            this.boundMarker.forEach(item => {
              // 使用这个判断会将同一坐标点的卡口都选中，但如果用id来判断则会因marker叠加导致有的卡口永远选不到
              if (item.point.lat === event.target.point.lat && item.point.lng === event.target.point.lng) {
                this.arr.push(item.id)
                // 将选中的卡号缓存（classN用于在地图DOM中检索）
                this.clickData.push({
                  classN: `.${item.ea}`,
                  id: item.id,
                  name: item.kkmc,
                  kklx2: item.kklx2,
                  lat: event.target.point.lat,
                  lng: event.target.point.lng
                })
              }
            })
            // 更新选中缓存 & 变化卡口图标
            sessionStorage.setItem('mapChoose', JSON.stringify(this.clickData))
            document.querySelector('.' + event.target.ea).firstChild.firstChild.src = this.getIconHovel(this.oneMarker.kklx2)
          } else {
            // 如果临时选中缓存选中不为空
            if (this.arr.includes(event.target.id)) {
              // 如果点击了已选中的（将其从 arr 及 clickData 中移除）
              for (let j = 0; j < this.clickData.length; j++) {
                if (this.clickData[j].lat === event.target.point.lat && this.clickData[j].lng === event.target.point.lng) {
                  this.arr.splice(this.arr.indexOf(this.clickData[j].id), 1)
                  this.clickData.splice(j, 1)
                  j--
                }
              }
              sessionStorage.setItem('mapChoose', JSON.stringify(this.clickData))
              document.querySelector('.' + event.target.ea).firstChild.firstChild.src = this.getIconNormal(this.oneMarker.kklx2)
            } else {
              // 如果点击了未选中的
              this.boundMarker.forEach(item => {
                if (item.point.lat === event.target.point.lat && item.point.lng === event.target.point.lng) {
                  this.arr.push(item.id)
                  this.clickData.push({
                    classN: `.${item.ea}`,
                    id: item.id,
                    name: item.kkmc,
                    kklx2: item.kklx2,
                    lat: event.target.point.lat,
                    lng: event.target.point.lng
                  })
                }
              })
              sessionStorage.setItem('mapChoose', JSON.stringify(this.clickData))
              document.querySelector('.' + event.target.ea).firstChild.firstChild.src = this.getIconHovel(this.oneMarker.kklx2)
            }
          }
        })
      })

      if (this.clusterer) {
        this.clusterer.clearMarkers()
      }
      this.clusterer = new BMapLib.MarkerClusterer(this.map, { markers: markers })
    },

    // 移入marker事件处理（弹出信息框）
    markerPointMouseover(data) {
      const { line, item } = data
      const html = `<div style='background:transparent; padding: 10px;font-size: 14px; color: #000'>${item.kkmc}</div>`
      const opts = {
        // boxStyle: {
        width: 210, // 信息窗口宽度
        height: 0, // 信息窗口高度
        enableMessage: true, // 设置允许信息窗发送短息
        offset: new BMap.Size(0, -20),
        message: ''
      }
      const infoWindow = new BMap.InfoWindow(html, opts)
      const point = new BMap.Point(line.lng, line.lat)
      this.map.openInfoWindow(infoWindow, point)
    },

    // 给可视范围所有卡口添加一个唯一的class，并且与缓存的进行比对
    async setClass(refresh) {
      this.pointsArr = []
      this.boundMarker = this.clusterer._getBoundsMarker()

      if (refresh) {
        this.refreshChoosedPoints()
      }

      // 这里item.AC应该是一个类DOM的属性，3.0版代码混淆后为AC
      this.boundMarker.forEach((item) => {
          item.Ac.id = item.id
          item.Ac.className = `${item.Ac.className} ${item.ea}` // 这里使得item在地图上能被querySelector得到！
        // 有侧边栏和顶部栏的时候 要减掉相应的宽高 才是真正的定位点
        const rect = document
          .querySelector(`.${item.ea}`)
          .getBoundingClientRect()

        this.pointsArr.push({
          x: rect.x - 80,
          y: rect.y - 80,
          id: item.id,
          name: item.kkmc,
          type: item.kklx2,
          classN: `.${item.ea}`,
          lat: item.point.lat,
          lng: item.point.lng,
          xzqh: item.xzqh,
          kkzt: item.kkzt
        })
        if (this.clickData) {
          for (let i = 0; i < this.clickData.length; i++) {
            if (item.id === this.clickData[i].id) {
              this.clickData[i].classN = `.${item.ea}`
              document.querySelector(`.${item.ea}`).firstChild.firstChild.src = this.getIconHovel(item.kklx2)
            }
          }
        }
      })
      if (this.clickData) {
        sessionStorage.setItem('mapChoose', JSON.stringify(this.clickData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.app-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);

  .operation{
    height: 30px;
    margin-bottom: 10px;

    .marker-choose{
      position: relative;
      float: left;
      width: 30%;
      .span-title{
        margin-right: 20px;
      }
      .span-total{
        margin-left: 20px;
        margin-right: 10px;
      }
    }

    .relation-build{
      width: 70%;
      float: left;
      .span-title{
        margin-right: 20px;
      }
      .marker-point{
        width: 180px;
        margin-right:10px;
      }
    }
  }

  #container {
    position: relative;
    width: 100%;
    height: 96%;
  }
}
</style>
