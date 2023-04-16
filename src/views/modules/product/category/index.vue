<template>
  <div>
    <el-switch
      v-model="draggable"
      active-text="开启拖拽"
      inactive-text="关闭拖拽"
    >
    </el-switch>
    <el-button v-show="draggable" @click="batchUpdateNodes" type="primary">批量保存</el-button>
    <el-button type="danger" @click="batchDeleteNodes">批量删除</el-button>
    <el-tree
      :data="categoryList"
      :props="defaultProps"
      show-checkbox
      node-key="catId"
      :default-expanded-keys="expandedkeys"
      :draggable="draggable"
      :allow-drop="allowDrop"
      @node-drop="handleDrop"
      ref="three"
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
            @click="() => edit(data)"
          >
            修改
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

    <!--  增加节点的对话框表单  -->
    <el-dialog :title="form.catId?'修改节点':'新增节点'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="节点名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="form.productUnit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>

export default {
  name: 'Category',
  data() {
    return {
      // 是否被拖拽了
      isDrop: false,
      pCid: [],
      // 是否可以拖拽
      draggable: false,
      // 拖拽后最新节点的数据
      updateNodes: [],
      // 最大层级
      maxLevel: 0,
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
        catId: '',
        name: '',
        // 层级
        catLevel: 0,
        // 父id
        parentCid: 0,
        // 默认显示
        showStatus: 1,
        // 排序
        sort: 0,
        icon: '',
        productUnit: ''
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
      let that = this
      this.$API.category.reqGetCategoryList().then(
        Response => {
          that.categoryList = Response.categoryList
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
      this.expandedkeys = [data.parentCid]
    },

    /**
     * 节点增加or修改的方法
     */
    confirmBtn() {
      if (this.form.name === '' || this.form.name === null) {
        return this.$message.warning('请输入节点名称哦')
      }
      this.$API.category.reqAddOrEditCategory(this.form).then(
        Response => {
          this.$message.success(Response.msg)
          // 在响应中获取最新列表才能更新试图，不知道为啥
          this.getData()
        }
      )
      this.dialogFormVisible = false
      // 放这不可以
      //this.getData()
      this.expandedkeys = [this.form.parentCid]
      this.form = {
        catId: '',
        name: '',
        // 层级
        catLevel: 0,
        // 父id
        parentCid: 0,
        // 默认显示
        showStatus: 1,
        // 排序
        sort: 0,
        icon: '',
        productUnit: ''
      }
    },

    /**
     * 取消按钮
     */
    cancel() {
      this.dialogFormVisible = false
      this.form = {
        catId: '',
        name: '',
        // 层级
        catLevel: 0,
        // 父id
        parentCid: 0,
        // 默认显示
        showStatus: 1,
        // 排序
        sort: 0,
        icon: '',
        productUnit: ''
      }
    },

    /**
     * 节点删除方法
     * @param node 节点上下文
     * @param data 节点数据
     */
    remove(node, data) {
      this.$confirm(`此操作将删除【${data.name}】节点, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [data.catId]
        this.$API.category.reqRemoveCategoryNode(ids).then(
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
    },

    /**
     * 修改节点
     * @param data
     */
    edit(data) {
      this.dialogFormVisible = true
      // 获取最新节点的数据
      this.$API.category.reqCategoryById(data.catId).then(
        Response => {
          this.form = Response.data
        }
      )
    },

    /**
     * 拖拽时判定目标节点能否被放置。
     */
    allowDrop(draggingNode, dropNode, type) {
      //1 被拖动的当前节点以及所在的父节点总层数不能大于3
      //1 被拖动的当前节点总层数
      this.countNodeLevel(draggingNode)
      // 当前正在拖动的节点+父节点所在的深度不大于3即可
      let deep = Math.abs(this.maxLevel - draggingNode.level) + 1
      // this.maxLevel
      if (type === 'inner') {
        return deep + dropNode.level <= 3
      } else {
        return deep + dropNode.parent.level <= 3
      }
    },

    /**
     * 递归计算被拖拽节点的最大层级
     * @param node
     */
    countNodeLevel(node) {
      // 找到所有子节点，求出最大深度
      if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (node.childNodes[i].level > this.maxLevel) {
            this.maxLevel = node.childNodes[i].level
          }
          this.countNodeLevel(node.childNodes)
        }
      }
    },

    /**
     * 节点被拖拽成功时的回调
     * @param draggingNode 被拖拽的节点
     * @param dropNode 参考的节点：被拖拽的节点跟他同级（before、after）还是进入他（inner）
     * @param dropType before、after、inner
     * @param ev event
     */
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // 1、当前节点的兄弟节点的数组
      let subNode = null
      let pCid = 0
      // 获取draggingNode的最父节点的id
      if (dropType === 'before' || dropType === 'after') {
        // 同级，则父节点的id为dropNode的parentId
        pCid = dropNode.parent.data.catId === undefined ? 0 : dropNode.parent.data.catId
        subNode = dropNode.parent.childNodes
      } else {
        // inner
        pCid = dropNode.data.catId
        subNode = dropNode.childNodes
      }
      this.pCid.push(pCid)
      // 2、获取draggingNode的最新顺序
      subNode.forEach((item, index) => {
        // 如果子节点的catId等于被拖拽节点的catId（说明拖动了参考节点的下一层子节点）
        if (item.data.catId === draggingNode.data.catId) {
          let catLevel = draggingNode.level
          if (item.level !== draggingNode.level) {
            // 当前节点的层级发生变化
            catLevel = item.level
            // 修改当前节点的子节点的层级
            this.updateChildNodeLevel(item)
          }
          this.updateNodes.push({ catId: item.data.catId, sort: index, parentCid: pCid, catLevel: catLevel })
        } else {
          this.updateNodes.push({ catId: item.data.catId, sort: index })
        }
      })
      // 3、获取draggingNode的最新层级
      // 拖拽成功，发送请求
      this.isDrop = true

    },
    /**
     * 更新子节点的层级
     * @param node
     */
    updateChildNodeLevel(node) {
      if (node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const cNode = node.childNodes[i].data
          this.updateNodes.push({ catId: cNode.catId, catLevel: node.childNodes[i].level })
          this.updateChildNodeLevel(node.childNodes[i])
        }
      }
    },

    /**
     * 批量更新节点
     * @returns {ElMessageComponent}
     */
    batchUpdateNodes() {
      if (!this.isDrop) {
        return this.$message.info('还没有被拖拽呢')
      }
      this.$API.category.reqDropUpdateCategory(this.updateNodes).then(
        Response => {
          this.$message.success(Response.msg)
          this.getData()
          this.expandedkeys = this.pCid
          this.maxLevel = 0
          this.updateNodes = []
          //this.pCid = 0
          this.isDrop = false
        }
      )
    },

    /**
     * 批量删除节点
     */
    batchDeleteNodes() {
      let deleteNodesIds = []
      let deleteNodesName = []
      let checkedNodes = this.$refs.three.getCheckedNodes()
      if (checkedNodes.length === 0) {
        this.$message.info('还没有选择节点啦')
        return
      }
      let extendKeys = checkedNodes[0].parentCid
      checkedNodes.forEach(item => {
        deleteNodesIds.push(item.catId)
        deleteNodesName.push(item.name)
      })
      this.$confirm(`此操作将删除【${deleteNodesName}】节点, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$API.category.reqRemoveCategoryNode(deleteNodesIds).then(
          Response => {
            this.$message.success('批量删除成功')
            this.getData()
            this.expandedkeys = [extendKeys]
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
