<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px"
    >
      <el-form-item label="等级名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="等级名称"></el-input>
      </el-form-item>
      <el-form-item label="所需成长值" prop="growthPoint">
        <el-input-number v-model="dataForm.growthPoint" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="默认等级" prop="defaultStatus">
        <el-checkbox v-model="dataForm.defaultStatus" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item label="免运费标准" prop="freeFreightPoint">
        <el-input-number :min="0" v-model="dataForm.freeFreightPoint"></el-input-number>
      </el-form-item>
      <el-form-item label="每次评价获取的成长值" prop="commentGrowthPoint">
        <el-input-number :min="0" v-model="dataForm.commentGrowthPoint"></el-input-number>
      </el-form-item>
      <el-form-item label="是否有免邮特权" prop="priviledgeFreeFreight">
        <el-checkbox v-model="dataForm.priviledgeFreeFreight" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item label="是否有会员价格特权" prop="priviledgeMemberPrice">
        <el-checkbox v-model="dataForm.priviledgeMemberPrice" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item label="是否有生日特权" prop="priviledgeBirthday">
        <el-checkbox v-model="dataForm.priviledgeBirthday" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="dataForm.note" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAddOrEditMemberLevel } from '@/api/modules/member/level'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        growthPoint: 0,
        defaultStatus: 0,
        freeFreightPoint: 0,
        commentGrowthPoint: 0,
        priviledgeFreeFreight: 0,
        priviledgeMemberPrice: 0,
        priviledgeBirthday: 0,
        note: ''
      },
      dataRule: {
        name: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' }
        ],
        growthPoint: [
          { required: true, message: '等级需要的成长值不能为空', trigger: 'blur' }
        ],
        defaultStatus: [
          { required: true, message: '是否为默认等级[0->不是；1->是]不能为空', trigger: 'blur' }
        ],
        freeFreightPoint: [
          { required: true, message: '免运费标准不能为空', trigger: 'blur' }
        ],
        commentGrowthPoint: [
          { required: true, message: '每次评价获取的成长值不能为空', trigger: 'blur' }
        ],
        priviledgeFreeFreight: [
          { required: true, message: '是否有免邮特权不能为空', trigger: 'blur' }
        ],
        priviledgeMemberPrice: [
          { required: true, message: '是否有会员价格特权不能为空', trigger: 'blur' }
        ],
        priviledgeBirthday: [
          { required: true, message: '是否有生日特权不能为空', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
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
          this.$API.level.reqGetMemberLevelInfo(this.dataForm.id).then(
            Response => {
              this.dataForm.name = Response.data.name
              this.dataForm.growthPoint = Response.data.growthPoint || 0
              this.dataForm.defaultStatus = Response.data.defaultStatus || 0
              this.dataForm.freeFreightPoint = Response.data.freeFreightPoint || 0
              this.dataForm.commentGrowthPoint = Response.data.commentGrowthPoint || 0
              this.dataForm.priviledgeFreeFreight = Response.data.priviledgeFreeFreight || 0
              this.dataForm.priviledgeMemberPrice = Response.data.priviledgeMemberPrice || 0
              this.dataForm.priviledgeBirthday = Response.data.priviledgeBirthday || 0
              this.dataForm.note = Response.data.note
            }
          )
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$API.level.reqAddOrEditMemberLevel(this.dataForm).then(
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
