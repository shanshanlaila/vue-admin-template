<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="id"></el-table-column>
      <el-table-column prop="spuName" header-align="center" align="center" label="名称"></el-table-column>
      <el-table-column prop="spuDescription" header-align="center" align="center" label="描述"></el-table-column>
      <el-table-column prop="catalogId" header-align="center" align="center" label="分类"></el-table-column>
      <el-table-column prop="brandId" header-align="center" align="center" label="品牌"></el-table-column>
      <el-table-column prop="weight" header-align="center" align="center" label="重量"></el-table-column>
      <el-table-column prop="publishStatus" header-align="center" align="center" label="上架状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.publishStatus === 0">新建</el-tag>
          <el-tag v-if="scope.row.publishStatus === 1">已上架</el-tag>
          <el-tag v-if="scope.row.publishStatus === 2">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" header-align="center" align="center" label="修改时间"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.publishStatus === 0"
            type="text"
            size="small"
            @click="productUp(scope.row.id)"
          >上架
          </el-button>
          <el-button type="text" size="small" @click="attrUpdateShow(scope.row)">规格</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
<!--    <el-dialog title="商品规格" :visible.sync="cateRelationDialogVisible">
      <attrupdate :spuId="spuId" :catalogId="catalogId"></attrupdate>
    </el-dialog>-->
  </div>

</template>

<script>
import PubSub from 'pubsub-js'
import Attrupdate from '@/views/modules/product/attrupdate.vue'

export default {
  components: { Attrupdate },
  data() {
    return {
      dataSub: null,
      dataForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      cateRelationDialogVisible: false,
      spuId: '',
      catalogId: ''
    }
  },
  props: {
    catId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.getDataList()
    this.dataSub = PubSub.subscribe('dataForm', (msg, val) => {
      // 接收父组件pub过来的事件
      this.dataForm = val
      this.getDataList()
    })
  },
  methods: {
    /**
     * 商品上架
     * @param id
     */
    productUp(id) {
      this.$API.spuInfo.reqSkuUp(id).then(
        Response => {
          this.$message({
            message: Response.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        }
      )
    },
    /**
     * 点击规格按钮
     * @param row
     */
    attrUpdateShow(row) {
      console.log(row)
      this.cateRelationDialogVisible = true
      //this.spuId = row.id
      //this.catalogId = row.catalogId
      // 进行路由跳转
      this.$router.push({
        path: '/attrUpdate',
        query: { spuId: row.id, catalogId: row.catalogId }
      })
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      let param = {}
      // 对象合并
      Object.assign(param, this.dataForm, {
        page: this.pageIndex,
        limit: this.pageSize
      })
      this.$API.spuInfo.reqGetSpuList(param).then(
        Response => {
          if (Response.code === 200) {
            this.dataList = Response.data.records
            this.totalPage = Response.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        }
      )
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
    }
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.dataSub)
  }
}
</script>
