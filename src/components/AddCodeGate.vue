<template>
    <div class="containt">
        <el-container style="height='100%'">
            <el-aside width="456px">
                    <test class="search"></test>
            </el-aside>
            <el-main style="padding: 0">
                <!-- 百度地图 -->
                <BaiduMap></BaiduMap>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import LeftBar from "./LeftBar"
import test from "./test"
import BaiduMap from "./BMapMarker"
 
export default {
    data() {
        return {
            mapType: "bigemap",
            Search: true,
            isList: false,
            sourceData: []
        }
    },
    components: {
        LeftBar,
        BaiduMap,
        test
    },
    // computed: {
    //     // 业务类型
    //     mapType:()=>{
    //       // 当前页面数据 bizDoc
    //       return this.$store.state.bizDoc.type // should return A || B || C
    //     },
    mounted() { },
    methods: {
        goto(type) {
            if (type === 1) {
                console.log(1)
                this.$router.push("/carSearch/addressSearch")
                this.editableTabs("/carSearch/addressSearch")
                localStorage.removeItem("mapChoose")
            } else if (type === 2) {
                this.$router.push("/carSearch/batchSearch")
                this.editableTabs("/carSearch/batchSearch")
                localStorage.removeItem("mapChoose")
            }
        },
        back() {
            this.$router.go(-1)
            // this.$router.push('/home/search')
            // this.editableTabs('/carSearch/search')
        },
        editableTabs(path) {
            const editableTabs = JSON.parse(localStorage.getItem("editableTabs"))
            editableTabs.find((item) => {
                if (item.title === "轨迹分析") {
                    item.path = path
                }
            })
            localStorage.setItem("editableTabs", JSON.stringify(editableTabs))
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/style/_handle.scss';

.containt {
    position: relative;
    /deep/ .el-header {
        padding: 0;
    }
    .header {
        /* margin-left: 20px; */
        padding-left: 12px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 48px;
        background-color: #192538;
        @include background_color('background_color15');
        .img {
            width: 48px;
            height: 48px;
            /* margin-left: 10px; */
            background-color: #113d72;
            display: flex;
            justify-content: center;
            align-items: center;
            // opacity: 0.3;
            cursor: pointer;
            @include background_color('background_color21');
            &:hover {
                background-color: #0f151e !important;
            }
            img {
                width: 24px;
                height: 24px;
            }
        }
        .img3 {
            width: 48px;
            height: 48px;
            /* margin-left: 10px; */
            background-color: #113d72;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            @include background_color('background_color21');
            img {
                width: 24px;
                height: 24px;
            }
        }
        /* .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        background-color: #113D72;
    @include background_color("background_color21");
      } */
        .first {
            cursor: default;
            width: 33.33%;
            /* padding-left: 40px;
        padding-right: 40px; */
            box-sizing: border-box;
            div {
                font-size: 14px;
                line-height: 44px;
                text-align: center;
                color: #ffffff;
                @include font_color('font_color2');
                border-bottom: 5px solid #0179f9;
            }
        }
        .sec {
            cursor: pointer;
            width: 33.33%;
            div {
                font-size: 14px;
                line-height: 44px;
                text-align: center;
                color: #ffffff;
                @include font_color('font_color2');
                &:hover {
                    color: #0179f9;
                    @include font_color('font_color3');
                    cursor: pointer;
                }
            }
        }
        .thr {
            cursor: pointer;
            width: 33.33%;
            div {
                font-size: 14px;
                line-height: 44px;
                text-align: center;
                color: #ffffff;
                @include font_color('font_color2');
                &:hover {
                    color: #0179f9;
                    @include font_color('font_color3');
                    cursor: pointer;
                }
            }
        }
    }
    .infoDetail {
        font-size: 14px;
        box-sizing: border-box;
        position: absolute;
        right: 10px;
        top: 15px;
        text-align: right;
        z-index: 1;
        color: #8596a9;
        @include font_color('font_color12');
        .rw1:hover {
            color: #0179f9;
            @include font_color('font_color3');
        }
        .el-icon-arrow-right {
            color: #8596a9;
            @include font_color('font_color12');
            font-size: 14px;
            font-weight: 900;
        }
        span {
            margin-right: 10px;
            cursor: pointer;
            &:first-child {
                color: #fff;
                @include font_color('font_color2');
                cursor: none;
            }
        }
    }
}
</style>
