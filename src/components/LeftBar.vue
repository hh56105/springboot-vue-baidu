<!--
 * @Author: your name
 * @Date: 2021-10-25 14:48:57
 * @LastEditTime: 2021-11-04 17:49:13
 * @LastEditors: Please set LastEditors
 * @Description: 资源中心-卡口标签-添加标签-道路标签-搜索组件
 * @FilePath: \front-vue\src\views\Configure\kkLabelAdd\search.vue
-->
<template>
    <div>
        <!-- 搜索 -->
        <div class="travel_search">
            <div class="s">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="ruleForm">
                    <el-form-item label="标签类型：" prop="bqlx">
                        <span>{{ ruleForm.bqlx }}</span>
                    </el-form-item>
                    <el-form-item label="标签名称：" prop="bqmc">
                        <el-input style="width: 80%" v-model="ruleForm.bqmc" maxlength="10" show-word-limit placeholder="请输入标签名称" />
                    </el-form-item>
                    <el-form-item label="分析区域：" style="margin-top: 26px; line-height: 36px">
                        <div class="flexnw">
                            <div class="flexc">
                                <div class="img1" @click="handleClickQueir(4)">
                                    <img v-show="chooseQuair" src="@/assets/img/vehicle/quairchoose-light.png" alt="" />
                                    <img v-show="!chooseQuair" src="@/assets/img/vehicle/quair-light.png" alt="" />
                                </div>
                                <div class="img1" @click="handleClickQueir(5)">
                                    <img v-show="chooseCircle" src="@/assets/img/vehicle/circle-choose-light.png" alt="" />
                                    <img v-show="!chooseCircle" src="@/assets/img/vehicle/circle-light.png" alt="" />
                                </div>
                            </div>

                            <div @click="handleClickKkxz" class="kkxz">
                                卡口选择
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="批量导入：" prop="tollgateID">
                        <div class="flexnw">
                            <div class="flexc">
                                <el-upload action="#" :show-file-list="false" :before-upload="beforeUpload">
                                    <el-button type="primary">上传文件</el-button>
                                </el-upload>
                                <el-tooltip effect="dark" content="支持格式，只支持Excel文件，单个文件不能超过20MB" placement="bottom">
                                    <img v-if="!isHover" @mouseenter.stop="mouseEnter" src="@/assets/img/tip-light.png" class="tip" alt="" />
                                    <img v-else @mouseleave.stop="mouseLeave" src="@/assets/img/tip-hover.png" class="tip" alt="" />
                                </el-tooltip>
                            </div>

                            <div @click="downLoadTemplate" class="kkxz">
                                下载模板
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="rwglList">
                    <el-table :height="tableHeight" :data="kkData">
                        <el-table-column label="序号" type="index" width="50px"></el-table-column>
                        <el-table-column label="卡口编号" show-overflow-tooltip width="110px" prop="kkbh"></el-table-column>
                        <el-table-column label="卡口名称" show-overflow-tooltip min-width="80px" prop="name"></el-table-column>
                        <el-table-column label="操作" width="50px">
                            <template slot-scope="{ row, $index }">
                                <el-button type="text" icon="el-icon-delete" @click="handleDelete(row, $index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="btn-border2" @click='allClose'>
                    <img class="clear" src="@/assets/img/clear.png" alt="" />
                    清空数据
                </div>
                <div class="page">
                    <el-pagination :pager-count="5" background @current-change="handleCurrentChange" :current-page="pageIndex"
                        :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="kktotal">
                    </el-pagination>
                </div>
                <div class="bottom">
                    <div class="button-border" @click="cancel">取消</div>
                    <div class="button-bgc" @click="submitForm">保存</div>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="showKk" class="tree" title="卡口选择" width="30%">
            <!-- <el-input placeholder="请输入代码或名称" v-model="searchKey" suffix-icon="el-icon-search" /> -->
            <el-tree v-if="showTree" ref="tree" @check="currentChange" lazy :load="lazyLoad" :props="props" show-checkbox>
            </el-tree>
            <div class="bottom">
                <div class="button-border" @click="kkCancel">取消</div>
                <div class="button-bgc" @click="submitKk">确定</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Api from "@/api/Configure"
import vehicleApi from "@/api/vehicleApi.js"

export default {
    data() {
        return {
            showTree: false,
            treeData: [],
            props: {
                label: "dmsm1",
                children: "childrenList"
            },
            searchKey: "",
            isHover: false,
            tableData: [],
            chooseCircle: false,
            chooseQuair: false,
            Close: false,
            restaurants: [],
            state: "",
            dialogCheIcon: false,
            timeout: null,
            nowDate: "",
            tip: require("@/assets/img/vehicle/wh.png"),
            ruleForm: {
                plateNo: "",
                bqlx: "",
                bqmc: "",
                carInfoList: [
                    {
                        plateNo: null,
                        plateClass: null,
                        vehicleBrand: null,
                        plateColor: null
                    }
                ],
                passTimeBegin: null,
                passTimeEnd: null,
                tollgateID: [],
                pageNum: 1,
                pageSize: 10
            },
            rules: {
                bqmc: [
                    {
                        required: true,
                        message: "必填项不能为空",
                        trigger: "change"
                    }
                ]
            },
            // 页面组件
            list: [], //列表
            listId: [], // 列表卡口编号
            tableHeight: "",
            showKk: false,
            queryData: [], // 通过路由传递的列表数据
            queryIdData: [], // 通过路由传递的卡口编号数据
            pageSize: 10, // 查看卡口数量详情的时候用的
            pageIndex: 1, // 查看卡口数量详情的时候用的
            kkData: [],
            loadData: [],
            ids: [],
            kkLabelData: null
        }
    },
    activated() {
        this.kkLabelData = JSON.parse(sessionStorage.getItem("kkLabelData"))
        this.ruleForm.bqlx = this.kkLabelData.labelType
        if (this.kkLabelData.tableData) {
            this.queryData = this.kkLabelData.tableData.map(item => {
                return {
                    kkbh: item.kkbh,
                    name: item.kkmc
                }
            })
            this.ruleForm.bqmc = this.kkLabelData.tagName
            this.queryIdData = this.kkLabelData.kkbh

            this.tableData = this.queryData
            this.ruleForm.tollgateID = this.queryIdData
            this.kkData = this.tableData.slice(0, 10)
        }
        this.showTree = true
    },
    mounted() {
        this.getRegionTree()
        this.tableHeight = document.querySelector(".rwglList").clientHeight - 0
        window.onresize = () => {
            this.tableHeight = document.querySelector(".rwglList").clientHeight - 0
        }
        this.$bus.$on("sentKKObj", arr => {
            const selectArr = JSON.parse(sessionStorage.getItem("mapChoose2"))
            // if (arr.length != 0) {
            this.Close = true
            this.placeCode = arr.length
            this.ruleForm.tollgateID = [...this.queryIdData, ...arr, ...this.listId]
            const arr2 = selectArr.map(item => {
                return {
                    name: item.name,
                    kkbh: item.id
                }
            })
            this.tableData = [...this.queryData, ...arr2, ...this.list]
            this.kkData = this.tableData.slice(0, 10)
            // }
            // else {
            //     this.Close = false
            //     this.placeCode = ""
            //     this.ruleForm.tollgateID = []
            //     this.tableData = []
            // }
            // this.ruleForm.kkbhs = arr.join(",")add
        })
        this.$bus.$on("resetImg", () => {
            this.chooseCircle = false
            this.chooseQuair = false
        })
    },
    deactivated() {
        window.onresize = null
    },
    computed: {
        // 查看卡口数量详情的时候用的
        kktotal() {
            return this.tableData.length
        },
    },
    methods: {
        handleCurrentChange(e) {
            this.pageIndex = e
            const start = e == '1' ? '0' : e * 10 - 10
            const end = e == '1' ? '10' : e * 10
            this.kkData = this.tableData.slice(start, end)
        },
        beforeUpload(file) {
            console.log(file)
            const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension = testmsg === 'xls'
            const extension2 = testmsg === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 20

            if (!extension && !extension2) {
                this.$message.error('只支持Excel文件，单个文件不能超过20MB')
                return false
            }
            if (!isLt2M) {
                this.$message.error('只支持Excel文件，单个文件不能超过20MB')
                return false
            }
            const data = {
                file
            }
            Api.uploadTemplate(data).then(res => {
                if (res.data.code === 200) {
                    if (res.data.data.backMessage) { this.$message.error(res.data.data.backMessage) }
                    const result = []
                    const resultKkbh = []
                    res.data.data.tagSysCodeGateVoList.forEach(item => {
                        result.push({
                            id: item.id,
                            backMessage: item.backMessage,
                            kkbh: item.kkbh,
                            name: item.kkmc
                        })
                        resultKkbh.push(item.kkbh)
                    })
                    this.tableData = [...this.queryData, ...this.list, ...result]
                    this.kkData = this.tableData.slice(0, 10)
                    this.ruleForm.tollgateID = [...this.ruleForm.listId, ...this.queryIdData, ...resultKkbh]
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        currentChange(node) {
            if (!node.dmsm1.endsWith("区") && !node.dmsm1.endsWith("县") && !node.dmsm1.endsWith("市")) {
                if (!this.listId.includes(node.dmz)) {
                    this.list.push({
                        kkbh: node.dmz,
                        name: node.dmsm1
                    })
                    this.listId.push(node.dmz)
                } else {
                    this.list.splice(this.listId.indexOf(node.dmz), 1)
                    this.listId.splice(this.listId.indexOf(node.dmz), 1)
                }
            }
        },
        // tree懒加载
        lazyLoad(node, reslove) {
            if (node.level == 0) {
                return reslove(this.treeData)
            }
            if (node.level == 1) {
                for (let i = 0; i < this.treeData.length; i++) {
                    if (this.treeData[i].dmz == node.data.dmz) {
                        return reslove(this.treeData[i].childrenList)
                    }
                }
            }
            if (node.level > 1 && !node.data.childrenList) {
                const data = {
                    region: node.data.dmz,
                    regionLevel: this.ruleForm.bqlx == '道路标签' ? '2' : '1'
                }
                Api.getCodeGateListByRegion(data).then(res => {
                    if (res.data.code === 200) {
                        const result = res.data.data.map(item => {
                            return {
                                dmsm1: item.codeGateName,
                                dmz: item.codeGateCode
                            }
                        })
                        reslove(result)
                    }
                    else {
                        this.$message.error(res.data.message)
                    }
                })
            } else {
                for (let i = 0; i < this.loadData.length; i++) {
                    if (node.data.dmz == this.loadData[i].dmz) {
                        reslove(this.loadData[i].data)
                    }
                }
            }
        },
        getRegionTree() {
            const data = {
                type1: "",
                type2: "01"
            }
            vehicleApi.getRegionTree(data).then(res => {
                if (res.data.code == 200) {
                    this.treeData = res.data.data.map(item => {
                        return {
                            ...item,
                            disabled: true
                        }
                    })
                }
                else {
                    this.$message.error(res.data.message)
                }
            })
        },
        submitKk() {
            const checkNode = this.$refs.tree.getCheckedNodes()
            for (let i = 0; i < checkNode.length; i++) {
                if (checkNode[i].dmz.length < 7 && !checkNode[i].childrenList) {
                    const data = {
                        regionLevel: this.ruleForm.bqlx == '道路标签' ? '2' : '1',
                        region: checkNode[i].dmz
                    }
                    Api.getCodeGateListByRegion(data).then(res => {
                        if (res.data.code === 200) {
                            const result = res.data.data.map(item => {
                                this.list.push({
                                    kkbh: item.codeGateCode,
                                    name: item.codeGateName
                                })
                                this.listId.push(item.codeGateCode)
                                return {
                                    dmsm1: item.codeGateName,
                                    dmz: item.codeGateCode
                                }
                            })
                            this.loadData.push({
                                dmz: checkNode[i].dmz,
                                data: result
                            })

                            this.setTreeChldrenList(this.treeData, checkNode[i].dmz, result)
                        }
                        else {
                            this.$message.error(res.data.message)
                        }
                    })
                }
            }
            setTimeout(() => {
                this.tableData = [...this.queryData, ...this.list]
                this.ruleForm.tollgateID = [...this.queryIdData, ...this.listId]
                this.kkData = this.tableData.slice(0, 10)
            }, 500)
            this.kkCancel()
        },
        // 直接选择市区，没有进行lazyLoad时，为treeData添加childrenList
        setTreeChldrenList(arr, dmz, list) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].dmz == dmz) {
                    this.$set(arr[i], "childrenList", list)
                    break
                }
                if (arr[i].childrenList) {
                    this.setTreeChldrenList(arr[i].childrenList, dmz, list)
                }
            }
        },
        kkCancel() {
            this.showKk = false
        },
        mouseEnter() {
            this.isHover = true
        },
        mouseLeave() {
            this.isHover = false
        },
        handleDelete(row, index) {
            this.$confirm("是否删除此卡口记录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                if (sessionStorage.getItem("mapChoose2")) {
                    const mapChoose = JSON.parse(sessionStorage.getItem("mapChoose2"))
                    mapChoose.forEach((item, index) => {
                        if (item.id == row.kkbh) {
                            mapChoose.splice(index, 1)
                        }
                    })
                    sessionStorage.setItem("mapChoose2", JSON.stringify(mapChoose))
                    this.$bus.$emit("closeItem")
                }

                const start = this.pageIndex == '1' ? 0 : this.pageIndex * 10 - 10
                const end = this.pageIndex == '1' ? 10 : this.pageIndex * 10
                this.tableData.splice(index + start, 1)
                this.ruleForm.tollgateID.splice(index + start, 1)
                this.kkData = this.tableData.slice(start, end)
                this.$message({
                    type: "success",
                    message: "删除成功!"
                })
            })
        },
        allClose() {
            this.Close = false
            this.placeCode = ""
            this.tableData = []
            this.kkData = []
            this.ruleForm.tollgateID = []
            this.list = []
            this.listId = []
            this.queryData = []
            this.queryIdData = []
            this.$bus.$emit("allClose")
        },
        // 卡口选择
        handleClickKkxz() {
            this.showKk = true
            this.getRegionTree()
        },
        // 下载模板
        downLoadTemplate() {
            const link = document.createElement("a")
            link.style.display = "none"
            link.href = "/template/kktemplate.xls"
            link.setAttribute("download", "卡口标签模板.xls")
            document.body.appendChild(link)
            link.click()
        },
        // 选中框框
        handleClickQueir(type) {
            if (type === 4) {
                this.$message.success("当前为框选模式")
                this.chooseQuair = true
                this.chooseCircle = false
                this.$bus.$emit("handleClickArea", type)
            }
            else if (type === 5) {
                this.$message.success("当前为圆形模式")
                this.chooseQuair = false
                this.chooseCircle = true
                this.$bus.$emit("handleClickArea", type)
            }
        },
        cancel() {
            this.ruleForm.bqmc = ""
            this.ruleForm.bqlx = ""
            this.$router.push("/kkLabel")
            this.tableData = []
            this.kkData = []
            this.ruleForm.tollgateID = []
            this.list = []
            this.listId = []
            this.queryData = []
            this.queryIdData = []
            this.showTree = false
            sessionStorage.removeItem("mapChoose2")
        },
        //  添加 编辑
        submitForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    const data = {
                        kkbh: this.ruleForm.tollgateID,
                        tagPid: this.ruleForm.bqlx == '道路标签' ? '14' : '15',
                        tagName: this.ruleForm.bqmc,
                        tagType: '2',
                        tagId: this.kkLabelData.tagId,
                        isEffective: this.kkLabelData.isEffective == 'false' ? '0' : '1'
                    }
                    Api.editCodeGateTag(data).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success('提交成功')
                            this.cancel()
                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/style/_handle.scss';
/deep/ .el-table .cell {
    font-size: 14px !important;
}
.flexnw {
    padding-right: 40px;
    .flexc {
        .img1 {
            margin-right: 40px;
        }
        .el-button {
            margin-right: 20px;
        }
    }
}
.tree {
    margin-top: 32px;
    /deep/ .el-tree {
        padding: 24px;
        background-color: #0f151e;
        height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
        @include background_color('background_mask_color');
    }

    /deep/
        .el-tree--highlight-current
        .el-tree-node.is-current
        > .el-tree-node__content {
        background: none !important;
    }
    /deep/ .el-tree-node__content:hover {
        background: #0179f9 !important;
        color: #fff;
        @include font_color('font_color2');
        @include background_color('background_table_hover_color');
    }
}
.clear {
    width: 12px;
    height: 12px;
}
.page2 {
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
}
/deep/ .el-pagination {
    margin-top: 10px;
}
.btn-border2 {
    display: inline-block;
    margin-left: 24px;
    margin-top: 22px;
    padding: 5px 3px;
    font-size: 14px;
    color: #0179f9;
    border: 1px solid #0179f9;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;

    &:hover {
        border-color: #06309a !important;
        color: #06309a !important;
    }
}
/* /deep/.el-input__inner {
  background: none;
  border-color: #03bfd1;
  @include background_color("background_color11");
} */
/deep/ .el-input .el-input__count .el-input__count-inner {
    background: none;
}
/deep/.el-form-item {
    margin-bottom: 20px;
}
.ruleForm {
    padding: 12px 0;
}
.bottom {
    margin-top: 12px;
}
.rwglList {
    padding: 0 20px;
    height: calc(100vh - 580px);
}
/deep/ .el-table__empty-block {
    height: 50% !important;
}
.travel_search {
    border-top: 1px solid #192538;
    /deep/.el-form-item__label {
        color: #fff;
        @include font_color('font_color7');
    }
    /* width: 456px; */
    background: #0f151e;
    @include background_color('background_color4');
    opacity: 0.9;
    height: calc(100vh - 112px);
    /* overflow-y: hidden; */
    box-sizing: border-box;
    color: #fff;
    @include font_color('font_color1');
    /* padding-left: 40px; */
    .t {
        color: #fff;
        @include font_color('font_color1');
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        background: #02a7f0;
    }
}
.img1 {
    cursor: pointer;
    img {
        width: 36px;
        height: 24px;
        vertical-align: middle;
    }
}
.tip {
    // width: 16px;
    // height: 16px;
    vertical-align: middle;
}
.kkxz {
    text-align: center;
    border-bottom: 1px solid #fff;
    line-height: 24px;
    margin-top: 5px;
    cursor: pointer;
    @include border_color('border_color22');
}

/deep/ .el-input__inner {
    background-color: #a2b3ce !important;
    @include background_color('background_color11');
    height: 40px;
    border-radius: 4px !important;
    /* border: solid 1px #a2b3ce !important; */
    /* @include border_color("border_color5"); */
}
</style>
