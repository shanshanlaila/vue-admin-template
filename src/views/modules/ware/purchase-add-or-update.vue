<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px"
    >
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="dataForm.priority" placeholder="优先级"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAddOrEditPurchase } from '@/api/modules/ware'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        assigneeId: '',
        assigneeName: '',
        phone: '',
        priority: '',
        status: 0,
        wareId: '',
        amount: '',
        createTime: '',
        updateTime: ''
      },
      dataRule: {
        assigneeId: [
          { required: true, message: '采购人id不能为空', trigger: 'blur' }
        ],
        assigneeName: [
          { required: true, message: '采购人名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '优先级不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        wareId: [
          { required: true, message: '仓库id不能为空', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '总金额不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建日期不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '更新日期不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$API.ware.reqGetWarePurchaseById(this.dataForm.id).then(
            Response => {
              Object.assign(this.dataForm, Response.data)
            }
          )
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$API.ware.reqAddOrEditPurchase(this.dataForm).then(
            Response => {
              this.$message({
                message: Response.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          )
        }
      })
    }
  }
}
</script>
