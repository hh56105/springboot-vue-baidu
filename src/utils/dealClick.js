
import {reactive,onMounted,onUnmounted} from "vue"

var BMapLib = window.BMapLib = BMapLib || {};
export function dealClick(){
  const map = new BMap.Map('container')
  let oneMarker = reactive({
    data:{
      id: "",
      kkmc: "",
      xzqh: "",
      kklx2: "",
      kkzt: ""
    }
  })
  onMounted(()=>{
    // 鼠标over响应
    this.oneMarker.addEventListener('mouseover', () => {
      markerPointMouseover({ line: point, item: item })
    })

    // 鼠标离开响应
    this.oneMarker.addEventListener('mouseout', () => {
      map.closeInfoWindow()
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
  function markerPointMouseover(data) {
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
    map.openInfoWindow(infoWindow, point)
  }

  return {
    oneMarker
  }
}
