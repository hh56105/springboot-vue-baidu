var BMapLib = (window.BMapLib = BMapLib || {})
;(function () {
    var b,
        a = (b = a || {
            version: "1.5.0"
        })
    a.guid = "$BAIDU$"
    ;(function () {
        window[a.guid] = window[a.guid] || {}
        a.dom = a.dom || {}
        a.dom.g = function (e) {
            if (typeof e == "string" || e instanceof String) {
                return document.getElementById(e)
            } else {
                if (e && e.nodeName && (e.nodeType == 1 || e.nodeType == 9)) {
                    return e
                }
            }
            return null
        }
        a.g = a.G = a.dom.g
        a.lang = a.lang || {}
        a.lang.isString = function (e) {
            return Object.prototype.toString.call(e) == "[object String]"
        }
        a.isString = a.lang.isString
        a.dom._g = function (e) {
            if (a.lang.isString(e)) {
                return document.getElementById(e)
            }
            return e
        }
        a._g = a.dom._g
        a.dom.getDocument = function (e) {
            e = a.dom.g(e)
            return e.nodeType == 9 ? e : e.ownerDocument || e.document
        }
        a.browser = a.browser || {}
        a.browser.ie = a.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent)
            ? document.documentMode || +RegExp.$1
            : undefined
        a.dom.getComputedStyle = function (f, e) {
            f = a.dom._g(f)
            let h = a.dom.getDocument(f),
                g
            if (h.defaultView && h.defaultView.getComputedStyle) {
                g = h.defaultView.getComputedStyle(f, null)
                if (g) {
                    return g[e] || g.getPropertyValue(e)
                }
            }
            return ""
        }
        a.dom._styleFixer = a.dom._styleFixer || {}
        a.dom._styleFilter = a.dom._styleFilter || []
        a.dom._styleFilter.filter = function (f, j, k) {
            for (var e = 0, h = a.dom._styleFilter, g; (g = h[e]); e++) {
                if ((g = g[k])) {
                    j = g(f, j)
                }
            }
            return j
        }
        a.string = a.string || {}
        a.string.toCamelCase = function (e) {
            if (e.indexOf("-") < 0 && e.indexOf("_") < 0) {
                return e
            }
            return e.replace(/[-_][^-_]/g, function (f) {
                return f.charAt(1).toUpperCase()
            })
        }
        a.dom.getStyle = function (g, f) {
            const i = a.dom
            g = i.g(g)
            f = a.string.toCamelCase(f)
            let h =
                g.style[f] ||
                (g.currentStyle ? g.currentStyle[f] : "") ||
                i.getComputedStyle(g, f)
            if (!h) {
                var e = i._styleFixer[f]
                if (e) {
                    h = e.get ? e.get(g) : a.dom.getStyle(g, e)
                }
            }
            if ((e = i._styleFilter)) {
                h = e.filter(f, h, "get")
            }
            return h
        }
        a.getStyle = a.dom.getStyle
        a.dom._NAME_ATTRS = (function () {
            const e = {
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing",
                colspan: "colSpan",
                rowspan: "rowSpan",
                valign: "vAlign",
                usemap: "useMap",
                frameborder: "frameBorder"
            }
            if (a.browser.ie < 8) {
                e.for = "htmlFor"
                e.class = "className"
            } else {
                e.htmlFor = "for"
                e.className = "class"
            }
            return e
        })()
        a.dom.setAttr = function (f, e, g) {
            f = a.dom.g(f)
            if (e == "style") {
                f.style.cssText = g
            } else {
                e = a.dom._NAME_ATTRS[e] || e
                f.setAttribute(e, g)
            }
            return f
        }
        a.setAttr = a.dom.setAttr
        a.dom.setAttrs = function (g, e) {
            g = a.dom.g(g)
            for (const f in e) {
                a.dom.setAttr(g, f, e[f])
            }
            return g
        }
        a.setAttrs = a.dom.setAttrs
        a.dom.create = function (g, e) {
            const h = document.createElement(g),
                f = e || {}
            return a.dom.setAttrs(h, f)
        }
        a.object = a.object || {}
        a.extend = a.object.extend = function (g, e) {
            for (const f in e) {
                if (e.hasOwnProperty(f)) {
                    g[f] = e[f]
                }
            }
            return g
        }
    })()
    const c = (BMapLib.LuShu = function (g, f, e) {
        if (!f || f.length < 1) {
            return
        }
        this._map = g
        this._path = f
        this.i = 0
        this._setTimeoutQuene = []
        this._projection = this._map.getMapType().getProjection()
        this._opts = {
            icon: null,
            speed: 4000,
            defaultContent: ""
        }
        this._setOptions(e)
        this._rotation = 0
        if (!this._opts.icon instanceof BMap.Icon) {
            this._opts.icon = defaultIcon
        }
    })
    c.prototype._setOptions = function (e) {
        if (!e) {
            return
        }
        for (const f in e) {
            if (e.hasOwnProperty(f)) {
                this._opts[f] = e[f]
            }
        }
    }
    ;(c.prototype.start = function () {
        const f = this,
            e = f._path.length
        if (f.i && f.i < e - 1) {
            if (!f._fromPause) {
                return
            } else {
                if (!f._fromStop) {
                    f._moveNext(++f.i)
                }
            }
        } else {
            f._addMarker()
            f._timeoutFlag = setTimeout(function () {
                f._addInfoWin()
                if (f._opts.defaultContent == "") {
                    f.hideInfoWindow()
                }
                f._moveNext(f.i)
            }, 400)
        }
        this._fromPause = false
        this._fromStop = false
    }),
    (c.prototype.stop = function () {
        this.i = 0
        this._fromStop = true
        clearInterval(this._intervalFlag)
        this._clearTimeout()
        for (
            let g = 0, f = this._opts.landmarkPois, e = f.length;
            g < e;
            g++
        ) {
            f[g].bShow = false
        }
    })
    c.prototype.pause = function () {
        clearInterval(this._intervalFlag)
        this._fromPause = true
        this._clearTimeout()
    }
    c.prototype.hideInfoWindow = function () {
        this._overlay._div.style.visibility = "hidden"
    }
    c.prototype.showInfoWindow = function () {
        this._overlay._div.style.visibility = "visible"
    }
    a.object.extend(c.prototype, {
        _addMarker: function (f) {
            if (this._marker) {
                this.stop()
                this._map.removeOverlay(this._marker)
                clearTimeout(this._timeoutFlag)
            }
            this._overlay && this._map.removeOverlay(this._overlay)
            const e = new BMap.Marker(this._path[0])
            this._opts.icon && e.setIcon(this._opts.icon)
            this._map.addOverlay(e)
            e.setAnimation(BMAP_ANIMATION_DROP)
            this._marker = e
        },
        _addInfoWin: function () {
            const f = this
            const e = new d(f._marker.getPosition(), f._opts.defaultContent)
            e.setRelatedClass(this)
            this._overlay = e
            this._map.addOverlay(e)
        },
        _getMercator: function (e) {
            return this._map.getMapType().getProjection().lngLatToPoint(e)
        },
        _getDistance: function (f, e) {
            return Math.sqrt(Math.pow(f.x - e.x, 2) + Math.pow(f.y - e.y, 2))
        },
        _move: function (n, j, m) {
            let i = this,
                h = 0,
                e = 10,
                f = this._opts.speed / (1000 / e),
                l = this._projection.lngLatToPoint(n),
                k = this._projection.lngLatToPoint(j),
                g = Math.round(i._getDistance(l, k) / f)
            if (g < 1) {
                i._moveNext(++i.i)
                return
            }
            i._intervalFlag = setInterval(function () {
                if (h >= g) {
                    clearInterval(i._intervalFlag)
                    if (i.i > i._path.length) {
                        return
                    }
                    i._moveNext(++i.i)
                } else {
                    h++
                    const o = m(l.x, k.x, h, g),
                        r = m(l.y, k.y, h, g),
                        q = i._projection.pointToLngLat(new BMap.Pixel(o, r))
                    if (h == 1) {
                        let p = null
                        if (i.i - 1 >= 0) {
                            p = i._path[i.i - 1]
                        }
                        if (i._opts.enableRotation == true) {
                            i.setRotation(p, n, j)
                        }
                        if (i._opts.autoView) {
                            if (!i._map.getBounds().containsPoint(q)) {
                                i._map.setCenter(q)
                            }
                        }
                    }
                    i._marker.setPosition(q)
                    i._setInfoWin(q)
                }
            }, e)
        },
        setRotation: function (l, startPoint, endPoint) {
            const j = this
            const x = endPoint.lng - startPoint.lng //lng-?????????lat-??????
            const y = endPoint.lat - startPoint.lat
            if (x == 0) {
                return j._marker.setRotation(0)
            }
            if (x > 0) {
                var z = Math.sqrt(x * x + y * y)
                var jiaodu = Math.round((Math.asin(y / z) / Math.PI) * 180) //????????????
                if (jiaodu >= 0) {
                    return j._marker.setRotation(180 - jiaodu)
                } else {
                    return j._marker.setRotation(180 + Math.abs(jiaodu))
                }
            }
            if (x < 0) {
                var z = Math.sqrt(x * x + y * y)
                var jiaodu = Math.round((Math.asin(y / z) / Math.PI) * 180) //????????????
                if (jiaodu >= 0) {
                    return j._marker.setRotation(360 + jiaodu)
                } else {
                    return j._marker.setRotation(360 - Math.abs(jiaodu))
                }
            }

            return
        },
        linePixellength: function (f, e) {
            return Math.sqrt(
                Math.abs(f.x - e.x) * Math.abs(f.x - e.x) +
                    Math.abs(f.y - e.y) * Math.abs(f.y - e.y)
            )
        },
        pointToPoint: function (f, e) {
            return (
                Math.abs(f.x - e.x) * Math.abs(f.x - e.x) +
                Math.abs(f.y - e.y) * Math.abs(f.y - e.y)
            )
        },
        _moveNext: function (e) {
            const f = this
            if (e < this._path.length - 1) {
                f._move(f._path[e], f._path[e + 1], f._tween.linear)
            }
        },
        _setInfoWin: function (g) {
            const f = this
            if (!f._overlay) {
                return
            }
            f._overlay.setPosition(g, f._marker.getIcon().size)
            const e = f._troughPointIndex(g)
            if (e != -1) {
                clearInterval(f._intervalFlag)
                f._overlay.setHtml(f._opts.landmarkPois[e].html)
                f._overlay.setPosition(g, f._marker.getIcon().size)
                f._pauseForView(e)
            } else {
                f._overlay.setHtml(f._opts.defaultContent)
            }
        },
        _pauseForView: function (e) {
            const g = this
            const f = setTimeout(function () {
                g._moveNext(++g.i)
            }, g._opts.landmarkPois[e].pauseTime * 1000)
            g._setTimeoutQuene.push(f)
        },
        _clearTimeout: function () {
            for (const e in this._setTimeoutQuene) {
                clearTimeout(this._setTimeoutQuene[e])
            }
            this._setTimeoutQuene.length = 0
        },
        _tween: {
            linear: function (f, j, h, i) {
                const e = f,
                    l = j - f,
                    g = h,
                    k = i
                return (l * g) / k + e
            }
        },
        _troughPointIndex: function (f) {
            let h = this._opts.landmarkPois,
                j
            for (let g = 0, e = h.length; g < e; g++) {
                if (!h[g].bShow) {
                    j = this._map.getDistance(
                        new BMap.Point(h[g].lng, h[g].lat),
                        f
                    )
                    if (j < 10) {
                        h[g].bShow = true
                        return g
                    }
                }
            }
            return -1
        }
    })
    function d(e, f) {
        this._point = e
        this._html = f
    }
    d.prototype = new BMap.Overlay()
    d.prototype.initialize = function (e) {
        const f = (this._div = a.dom.create("div", {
            style: "border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;"
        }))
        f.innerHTML = this._html
        e.getPanes().floatPane.appendChild(f)
        this._map = e
        return f
    }
    d.prototype.draw = function () {
        this.setPosition(
            this.lushuMain._marker.getPosition(),
            this.lushuMain._marker.getIcon().size
        )
    }
    a.object.extend(d.prototype, {
        setPosition: function (h, i) {
            const f = this._map.pointToOverlayPixel(h),
                e = a.dom.getStyle(this._div, "width"),
                g = a.dom.getStyle(this._div, "height")
            ;(overlayW = parseInt(this._div.clientWidth || e, 10)),
            (overlayH = parseInt(this._div.clientHeight || g, 10))
            this._div.style.left = f.x - overlayW / 2 + "px"
            this._div.style.bottom = -(f.y - i.height) + "px"
        },
        setHtml: function (e) {
            this._div.innerHTML = e
        },
        setRelatedClass: function (e) {
            this.lushuMain = e
        }
    })
})()
