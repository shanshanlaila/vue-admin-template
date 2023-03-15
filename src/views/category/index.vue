<template>
  <div>
    <el-tree
      :data="categoryList"
      :props="defaultProps"
      show-checkbox
      node-key="catId"
      :default-expanded-keys="expandedkeys"
    >
<span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)"
            v-show="data.catLevel<=2"

          >
            增加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
            v-show="node.childNodes.length===0"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <!--  dialog  -->
    <el-dialog title="增加节点" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="节点名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import request from '@/utils/request'

export default {
  name: 'Category',
  data() {
    return {
      // 节点数据
      categoryList: [],
      // 默认展开节点
      expandedkeys: [],
      // tree结构配置
      defaultProps: {
        children: 'children', /* 对应当前节点的子节点的字段名 */
        label: 'name' /* 对应当前节点名称的字段名 */
      },
      dialogFormVisible: false,
      form: {
        name: '',
        // 层级
        catLevel: 0,
        // 父id
        parentCid: 0,
        // 默认显示
        showStatus: 1,
        // 排序
        sort: 0
      }
    }
  },
  mounted() {
    this.getData()
  },

  methods: {
    /**
     * 获取分类数据
     * @returns {Promise<void>}
     */
    getData() {
      this.$API.product.reqGetCategoryList().then(
        Response => {
          this.categoryList = Response.categoryList
        }
      )
    },

    /**
     * 点击节点增加按钮
     * @param data 节点数据
     */
    append(data) {
      this.dialogFormVisible = true
      this.form.parentCid = data.catId
      this.form.catLevel = data.catLevel * 1 + 1
      console.log(this.form)
    },

    /**
     * 节点增加的方法
     */
    addCategory() {
      this.$API.product.reqAddCategory(this.form).then(
        Response => {
          this.$message.success(Response.msg)
        }
      )
      this.dialogFormVisible = false
      this.getData()
      this.expandedkeys = [this.form.parentCid]
    },

    /**
     * 节点删除方法
     * @param node 节点上下文
     * @param data 节点数据
     */
    remove(node, data) {
      console.log(node)
      this.$confirm(`此操作将删除【${data.name}】节点, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [data.catId]
        this.$API.product.reqRemoveCategoryNode(ids).then(
          Response => {
            this.$message.success(Response.msg)
            this.getData()
            // 设置默认展开节点
            this.expandedkeys = [node.parent.data.catId]
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>


<style scoped>

</style>
