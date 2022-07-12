<template>
  <!-- <el-breadcrumb separator="" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">基本设置<i class="iconfont icon-arrow-right" style="margin-left:5px"></i></el-breadcrumb-item>
      <el-breadcrumb-item style="margin-left:-12px">签证机关</el-breadcrumb-item>
    
  </el-breadcrumb> -->
    <div class="bread-input">
      <el-input v-model="inputSearch" placeholder="输入内容搜索">
      <template #suffix>
        <i class="iconfont icon-search"></i>
      </template>
    </el-input>
    </div>
  <div class="visaAuth">
    <!-- 表格数据 -->
    <el-table :data="tableData" class="tableBox" stripe style="width: 100%">
      <el-table-column prop="code" width="100px" align="center" label="代码" />
      <el-table-column prop="descript" align="center" label="中文描述" />
      <el-table-column prop="address" width="300px" align="center" label="归类" />
      <el-table-column prop="status" width="80px" align="center" label="停用">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="T" inactive-value="F" />
        </template>
      </el-table-column>
      <el-table-column prop="seq" width="80px" align="center" label="排序" />
      <el-table-column prop="fox" align="center" label="最近修改" />
      <el-table-column prop="changed" width="200px" align="center" label="修改时间" />
    </el-table>
  </div>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
  setup(){
    const inputSearch=ref('')
    const tableData= ref([
      {
        code: 'CO1',
        descript: '北京',
        address: 'No. 189, Grove St, Los Angeles',
        status:'T',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'1'
      },
      {
        code: 'CO2',
        descript: '天津',
        status:'T',
        address: 'No. 189, Grove St, Los Angeles',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'2'
      },
      {
        code: '111',
        descript: '河北',
        status:'T',
        address: 'No. 189, Grove St, Los Angeles',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'3'
      },
      {
        code: 'TTS',
        descript: '河北石家庄',
        status:'T',
        address: 'No. 189, Grove St, Los Angeles',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'4'
      },
    ]);
    return{
      tableData,
      inputSearch
    }
  }

}
</script>

<style lang="scss">
.bread-input{
  height: 48px;
  position: relative;
  // margin-top: 15px;
  // padding-left: 15px;
  // margin-bottom: 10px;
  .el-input{
    width: 439px;
    position: absolute;
    top: -1px;
    right: 0;
  }
  .el-input__inner{
    height: 50px;
    box-shadow: none;
    line-height: 50px;
    border-left: 1px solid #e4e7ed;
  }
  .el-input__suffix{
    cursor: pointer;
    font-size: 13px;
    color: #4e82d5;
    border-left: 1px solid #e4e7ed;
    padding: 0 20px 0 20px;
    line-height: 50px;
  }
}
.visaAuth{
  .tableBox {
     th {
       border-top: 1px solid #e4e7ed;
       padding: 0 !important;
       height: 45px;
       line-height: 45px;
     }
     td {
       padding: 0 !important;
       height: 40px;
       line-height: 40px;
     }
   }
}
</style>