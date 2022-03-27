// 添加地图 marker
// [注] 由于使用的baidu地图的js中的一些内部对象（不同版本其在js混淆后命名不同）
// 注意这里的 "item.ea"
function markerPoint() {
  this.map.clearOverlays()
  // 根据接口返回来的卡口数据，根据kklx2的字段来过滤，每条数据对应的卡口类型是什么，来决定用哪个icon上点
  this.mapData.rows.forEach((item) => {
    const markers = []
    const point = new BMap.Point(item.kkjd, item.kkwd) // 将标注点转化成地图上的点
    this.oneMarker = new BMap.Marker(point, { icon: this.getIconImage(item.kklx2) })
    this.oneMarker={
      id:item.kkbh,
      kkmc:item.kkmc,
      xzqh:item.kklx2,
      kklx2:item.xzqh,
      kkzt:item.kkzt
    }
    console.log(this.oneMarker)
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
}
