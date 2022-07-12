<template>
  <!-- <el-breadcrumb separator="" class="bread-box">
    <el-breadcrumb-item :to="{ path: '/home' }">基本设置<i class="iconfont icon-arrow-right" style="margin-left:5px"></i></el-breadcrumb-item>
    <el-breadcrumb-item style="margin-left:-12px">一般证件</el-breadcrumb-item>
  </el-breadcrumb> -->
  <!-- <br/> -->
  <div class="documents">
   <el-table highlight-current-row :data="tableData" @current-change="currentChange" id="rebateSetTable" stripe style="width: 100%" class="tableBox">
      <el-table-column prop="code" width="100px" align="center" label="代码" />
      <el-table-column prop="descript" align="center" label="中文描述" />
      <el-table-column prop="grp" width="100px" align="center" label="证件类型" >
        <template #default="scope">
          {{scope.row.grp=='T' ? '身份证' : scope.row.grp=='HM' ? '港澳通行证' : scope.row.grp=='TW' ? '台湾通行证' :'其他'}}
        </template>
      </el-table-column>
      <el-table-column prop="halt" width="80px" align="center" label="停用">
        <template #default="scope">
          <el-switch v-model="scope.row.halt" active-value="T" inactive-value="F" />
        </template>
      </el-table-column>
      <el-table-column prop="share" width="80px" align="center" label="共享" >
        <template #default="scope">
          <el-checkbox v-model="scope.row.share"  @change="changeCheck(scope.row.share)" true-label="T" false-label="F" size="large" />
        </template>
      </el-table-column>
      <el-table-column prop="distribute" width="80px" align="center" label="发布" >
        <template #default="scope">
          <el-checkbox v-model="scope.row.distribute" true-label="T" false-label="F" size="large" />
        </template>
      </el-table-column>
      <el-table-column prop="seq" width="80px" align="center" label="排序" />
      <el-table-column prop="fox" align="center" label="最近修改" />
      <el-table-column prop="changed" width="200px" align="center" label="修改时间" />
    </el-table>
    <el-aside width="auto" class="r-aside">
       <common-raside @chooseRaside="chooseRaside($event)"></common-raside>
    </el-aside>
    <!-- 添加弹窗 -->
    <el-dialog v-model="addFormFlag" @close="resetAddForm('addFormRef')" destroy-on-close :close-on-click-modal="false" title="新建证件" center width="550px" :show-close="false">
      <el-form :model="addForm" ref="addFormRef" label-position="left" :rules="addShiftFormRules">
        <el-form-item label="代码" :label-width="80" prop="code">
          <el-input v-model="addForm.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="中文描述" :label-width="80" prop="descript">
          <el-input v-model="addForm.descript" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文描述" :label-width="80" prop="descript1">
          <el-input v-model="addForm.descript1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="繁体描述" :label-width="80" prop="descript2">
          <el-input v-model="addForm.descript2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="证件类型" :label-width="80" prop="region">
          <el-select v-model="addForm.region" placeholder="请选择证件类型">
            <el-option label="身份证" value="T" />
            <el-option label="港澳通行证" value="HM" />
            <el-option label="台湾通行证" value="TW" />
            <el-option label="其他" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="80" prop="seq">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model.trim="addForm.seq" autocomplete="off" />
        </el-form-item>
        <el-form-item label="其他选项" :label-width="80" prop="radioChoose">
          <el-radio-group v-model="radioChoose" @change="changeRadio">
            <el-radio label="T">共享</el-radio>
            <el-radio label="F">发布</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn" @click="addFormFlag = false" >关闭</el-button>
          <el-button class="lightBtn" type="primary"  @click="addDocument" >新建</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog v-model="editFormFlag" @close="resetEditForm('editFormRef')" destroy-on-close :close-on-click-modal="false" title="修改证件" center width="550px" :show-close="false">
      <el-form :model="editForm" ref="editFormRef" label-position="left" :rules="addShiftFormRules">
        <el-form-item label="代码" :label-width="80" prop="code">
          <el-input v-model="editForm.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="中文描述" :label-width="80" prop="descript">
          <el-input v-model="editForm.descript" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文描述" :label-width="80" prop="descript1">
          <el-input v-model="editForm.descript1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="繁体描述" :label-width="80" prop="descript2">
          <el-input v-model="editForm.descript2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="证件类型" :label-width="80" prop="grp">
          <el-select v-model="editForm.grp" placeholder="请选择证件类型">
            <el-option label="身份证" value="T" />
            <el-option label="港澳通行证" value="HM" />
            <el-option label="台湾通行证" value="TW" />
            <el-option label="其他" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="80" prop="seq">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model.trim="editForm.seq" autocomplete="off" />
        </el-form-item>
        <el-form-item label="其他选项" :label-width="80">
          <el-checkbox v-model="editForm.share" true-label="T" false-label="F" >共享</el-checkbox>
          <el-checkbox v-model="editForm.distribute" true-label="T" false-label="F">发布</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn" @click="editFormFlag = false">关闭</el-button>
          <el-button class="lightBtn" type="primary" @click="editDocument">修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 下载弹窗 -->
    <el-dialog v-model="downFlag" destroy-on-close :close-on-click-modal="false" title="代码下载" custom-class="code-download" center width="829px" :show-close="false">
       <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="可下载" name="first">
          <el-table
            stripe
            ref="multipleTableRef"
            :data="downTableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55" />
            <el-table-column label="代码" align="center" width="120">
              <template #default="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column property="descript" align="center" label="中文描述" width="120" />
            <el-table-column property="descript1" align="center" label="英文描述" show-overflow-tooltip />
            <el-table-column property="descript2" align="center" label="繁体描述" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已下载" name="second">
          <el-table
            stripe
            ref="multipleTableRef"
            :data="downedTableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55" />
            <el-table-column label="代码" align="center" width="120">
              <template #default="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column property="descript" align="center" label="中文描述" width="120" />
            <el-table-column property="descript1" align="center" label="英文描述" show-overflow-tooltip />
            <el-table-column property="descript2" align="center" label="繁体描述" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="darkBtn"  @click="downFlag = false">关闭</el-button>
        <el-button class="lightBtn" type="primary" @click="downFlag = false" >下载</el-button
        >
      </span>
    </template>
    </el-dialog>
    <!-- 发布修改 -->
    <el-dialog v-model="releaseFlag" destroy-on-close :close-on-click-modal="false" title="发布修改" custom-class="release-edit" center width="760px" :show-close="false">
      <el-table
        stripe
        ref="multipleTableRef"
        :data="releaseTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column label="代码" width="120" align="center">
          <template #default="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column property="descript" label="中文描述" width="120" align="center" />
        <el-table-column property="seq" label="排序" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-input v-model="scope.row.seq" @keyup.enter="editReleased(scope.row)"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn"  @click="releaseFlag = false">关闭</el-button>
          <el-button class="redBtn" @click="releaseFlag = false">取消发布</el-button>
          <el-button class="lightBtn" type="primary" @click="saveEdit" >保存</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 代码导入 -->
    <el-dialog v-model="codeImportFlag" destroy-on-close :close-on-click-modal="false" title="代码导入" custom-class="code-import" center width="760px" :show-close="false">
      <div class="file-upload">
        <i class="iconfont icon-excel"></i>
        <el-upload
          drag
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="beforeUpload"
          :auto-upload="false">
          <p class="upload-text">将Excel文件拖拽入框内上传</p>
        <p class="upload-info">表头顺序：代码 - 中文描述 - 英文描述 - 繁体描述 - 停用 - 共享 - 发布 - 证件类型 - 排序 - 最近修改 - 修改时间</p>
          <el-button class="upload-btn" type="primary">{{hasFiles ? '重新选择' :  '上传文件'}}</el-button>
        </el-upload>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="darkBtn" @click="codeImportFlag = false" >关闭</el-button>
        <el-button class="lightBtn" type="primary" @click="submitUpload">导入</el-button>
      </span>
    </template>
    </el-dialog>
    <!-- 日志 -->
    <el-dialog v-model="recordFlag" destroy-on-close :close-on-click-modal="false"  custom-class="record" title="日志" center width="1149px" :show-close="false">
      <el-table :data="recordTableData" stripe style="width: 100%">
        <el-table-column prop="code" width="100px" align="center" label="代码/名称" />
        <el-table-column prop="name" width="80px" align="center" label="项目" />
        <el-table-column prop="oldvalue" width="80px" align="center" label="原值" />
        <el-table-column prop="newvalue" align="center" label="新值" />
        <el-table-column prop="changed" width="100px" align="center" label="最近修改" />
        <el-table-column prop="changeTime" width="200px" align="center" label="修改时间" />
        <el-table-column prop="pc_id" width="100px" align="center" label="操作站点" />
        <el-table-column prop="sqlid" align="center" label="设备号" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <div class="home-container">
            <my-pagination @change-page='changePage' :pagesize='10' :total='90' :page='1' />
          </div>
          <el-button @click="recordFlag = false" class="darkBtn">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 撤销发布 -->
    <el-dialog v-model="returnFlag" destroy-on-close :close-on-click-modal="false"  custom-class="return" title="撤销发布" center width="829px" height="644px" :show-close="false">
      <div class="returnbox">
        <div class="l-part">
          <span class="l-text">已发布代码</span>
          <el-table
            stripe
            ref="multipleTableRef"
            :data="returnTableData"
            style="width: 100%;margin-top:18px">
            <el-table-column type="selection" width="55" />
            <el-table-column label="代码" align="center" width="120">
              <template #default="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column property="descript" label="中文描述" align="center" width="120" />
            <el-table-column property="descript1" label="英文描述" align="center" show-overflow-tooltip />
            <el-table-column property="descript2" label="繁体描述" align="center" show-overflow-tooltip />
          </el-table>
        </div>
        <div class="r-part">
          <span class="r-text">已发布酒店（{{returnCheckList.length}}）</span>
          <el-input v-model="input" placeholder="搜索" class="return-search" v-if="!isCollapse">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
          </el-input>
          <div class="return-check">
            <el-checkbox v-for="item in returnCheckList" v-model="item.hotelid"  :label="item.name" :key="item" name="type" />
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn"  @click="returnFlag = false">关闭</el-button>
          <el-button class="lightBtn" type="primary" @click="returnFlag = false" >撤销</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 发布 -->
    <el-dialog v-model="publishFlag" destroy-on-close :close-on-click-modal="false" custom-class="return" title="发布" center width="829px" height="644px" :show-close="false">
      <div class="returnbox">
        <div class="l-part">
          <span class="l-text" style="color: #4e82d5;">1. 选择已发布代码</span>
          &nbsp;&nbsp;<i class="iconfont icon-arrow-right"></i>
          <span class="l-text">2. 选择酒店</span>
          <el-table
            stripe
            ref="multipleTableRef"
            :data="returnTableData"
            style="width: 100%;margin-top:18px"
            @selection-change="selectionCode">
            <el-table-column type="selection" width="55" />
            <el-table-column label="代码" align="center" width="120" prop="code">
              <template #default="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column prop="descript" label="中文描述" align="center" width="120" />
            <el-table-column prop="descript1" label="英文描述" align="center" show-overflow-tooltip />
            <el-table-column prop="descript2" label="繁体描述" align="center" show-overflow-tooltip />
          </el-table>
        </div>
        <div class="r-part">
          <span class="r-text">已发布酒店（{{returnCheckList.length}}）</span>
          <el-input v-model="input" placeholder="搜索" class="return-search" v-if="!isCollapse">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
          </el-input>
          <div class="return-check">
            <el-checkbox v-for="item in returnCheckList" v-model="item.hotelid"  :label="item.name" :key="item" name="type" />
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn"  @click="publishFlag = false">关闭</el-button>
          <el-button class="lightBtn" type="primary" @click="chooseBtn">选择酒店发布</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 选择酒店发布 -->
    <el-dialog v-model="chooseHotelFlag" destroy-on-close :close-on-click-modal="false" custom-class="return" title="发布" center width="829px" height="644px" :show-close="false">
      <div class="draw" v-if="drawer">
        <div class="draw-top">
          <p>条件筛选</p>
        </div>
        <div class="draw-m">
          <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" class="demo-ruleForm" label-position="left" :size="formSize" >
            <el-form-item label="品牌" prop="region">
              <el-select placeholder="选择品牌" v-model="ruleForm.region" filterable>
                <el-option label="西软连锁" value="shanghai" />
                <el-option label="西软精选" value="beijing" />
                <el-option label="西软客栈" value="f" />
                <el-option label="西软品牌" value="i" />
              </el-select>
            </el-form-item>
            <el-form-item label="经营模式" prop="region">
              <el-select placeholder="选择经营模式" v-model="ruleForm.region" filterable>
                <el-option label="加盟" value="shanghai" />
                <el-option label="直营" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="酒店类别" prop="region">
              <el-select placeholder="选择酒店类别" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="区域" prop="region">
              <el-select placeholder="选择区域" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="酒店自编码" prop="region">
              <el-select placeholder="选择酒店自编码" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="行政区" prop="region">
              <el-select placeholder="选择行政区" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="region">
              <el-select placeholder="选择城市" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="酒店名称" prop="region">
              <el-select placeholder="选择酒店名称" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="渠道" prop="region">
              <el-select placeholder="选择渠道" v-model="ruleForm.region" filterable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="酒店状态" prop="region">
              <el-select placeholder="选择酒店状态" v-model="ruleForm.region" filterable> 
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="draw-b">
          <el-button type="primary" class="lightBtn">查询</el-button>
          <el-button @click="resetForm('ruleFormRef')" class="darkBtn">清空</el-button>
        </div>
      </div>
      <div class="returnbox" @click="drawer=false">
        <div class="l-part">
          <span class="l-text">1. 选择已发布代码</span>
          &nbsp;&nbsp;<i class="iconfont icon-arrow-right"></i>
          <span class="l-text" style="color: #4e82d5;">2. 选择酒店</span>
          <el-input v-model="input" placeholder="请输入酒店名称搜索" class="hotel-search">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
            <template #suffix>
              <i class="filter" @click.stop="drawer = !drawer">筛选</i>
            </template>
          </el-input>
          <el-tree
            :data="hotelLists"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"/>
        </div>
        <div class="r-part">
          <span class="r-text">已发布酒店（{{returnCheckList.length}}）</span>
          <el-input v-model="input" placeholder="搜索" class="return-search">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
          </el-input>
          <div  class="return-check">
            <el-checkbox v-for="item in returnCheckList" v-model="item.hotelid" :label="item.name" :key="item" name="type" />
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="darkBtn"  @click="chooseHotelFlag = false">关闭</el-button>
          <el-button class="lightBtn" type="primary" @click="releaseDocument">确认发布</el-button>
          <el-button class="prewBtn" @click="chooseHotelFlag = false;publishFlag=true">上一步</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {addDoc,editDoc ,getDocList ,delDoc,getReleaseList,releaseDoc,recordDoc,getReleasedList,editReleasedList,getReleasedHotel} from '../../api/doc'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import MyPagination from '@/components/pagination/myPagination'
import { ElMessage, ElMessageBox } from 'element-plus'
import {ref,reactive ,getCurrentInstance,toRefs,onMounted} from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import commonRaside from "@/components/layout/commonRaside.vue"
import store from '@/store'
export default {
   components:{
    commonRaside,
    ArrowRight,
    MyPagination
},
  setup(){
    onMounted(()=>{
      //获取列表数据
      getDocList([{
        hotelid:store.state.Home.hotelid
      }]).then(res=>{
        tableData.value=res.result
      })
    })
    const {proxy} = getCurrentInstance();
    const ruleFormRef = ref('');
    const addFormRef=ref('');
    const editFormRef=ref('');
    const ruleForm = reactive({
      region: '',
    });
    const changeCheck=(val)=>{
      console.log(val);
    }
    // 新建表单验证
    const addShiftFormRules = reactive({
      code: [
        { required: true, message:'必须填写', trigger: 'blur' },
      ],
      descript: [
        { required: true,message:'必须填写', trigger: 'blur' },
      ]
    });
    const input =ref('');
    const hasFiles = ref(false);
    const upload = ref();
    const tableData= ref([
      {
        code: 'C01',
        descript: '身份证',
        type: '身份证',
        seq:'1',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        status:'T'
      },
      {
        code: 'C02',
        descript: '护照',
        seq:'2',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        type: '护照',
      },
      {
        code: '111',
        descript: '111',
        type: '身份证',
        seq:'3',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        status:'T'
      },
      {
        code: 'TTS',
        descript: 'ces88',
        seq:'4',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        type: '身份证',
      },
    ]);
    // 日志表格
    const recordTableData= ref([
      {
        code: 'AC',
        name: '身份证',
        oldvalue:'身份证',
        newvalue:'台胞证',
        pc_id:'PC01',
        changed:'设备管理员',
        changeTime: '2015-09-25  16:19:00',
        sqlid:'Mac00018'
      },
      {
        code: 'AC',
        name: '身份证',
        oldvalue:'身份证',
        newvalue:'台胞证',
        pc_id:'PC01',
        changed:'设备管理员',
        changeTime: '2015-09-25  16:19:00',
        sqlid:'Mac00018'
      },
      {
        code: 'AC',
        name: '身份证',
        oldvalue:'身份证',
        newvalue:'台胞证',
        pc_id:'PC01',
        changed:'设备管理员',
        changeTime: '2015-09-25  16:19:00',
        sqlid:'Mac00018'
      },
    ]);
    const returnFlag =ref(false);
    const addFormFlag= ref(false);
    const editFormFlag=ref(false);
    const downFlag= ref(false);
    const releaseFlag=ref(false);
    const codeImportFlag=ref(false);
    const recordFlag=ref(false);
    const publishFlag=ref(false);
    const chooseHotelFlag =ref(false);
    const releaseTwoFlag=ref(false);
    const drawer =ref(false);
    const radioChoose= ref('T');
    //默认tab
    const activeName = ref('first');
    //添加表单
    const addForm = reactive({
      code: '',
      descript: '',
      descript1: '',
      descript2: '',
      grp: '',
      share: '',
      distribute: '',
      seq: '',
    });
    //添加表单
    const addDocument=()=>{
      addDoc([{
        code:addForm.code,
        descript:addForm.descript,
        descript1:addForm.descript1,
        descript2:addForm.descript2,
        seq:addForm.seq,
        distribute:addForm.distribute,
        share:addForm.share,
        grp:addForm.grp,
      }]).then(res=>{
        console.log(res);
        addFormFlag.value = false;

      })
    }
    //修改表单
    const editForm = reactive({
      code: '',
      descript: '',
      descript1: '',
      descript2: '',
      grp: '',
      share: '',
      distribute: '',
      seq: '',
    });
    const editDocument=()=>{
      editDoc([{
        code:editForm.code,
        descript:editForm.descript,
        descript1:editForm.descript1,
        descript2:editForm.descript2,
        seq:editForm.seq,
        distribute:editForm.distribute,
        share:editForm.share,
        grp:editForm.grp,
      }]).then(res=>{
        console.log(res);
        getDocList();
        editFormFlag.value = false;
      })
    }
    //删除表单
    const delForm = reactive({
      code: '',
      cat: '',
      hotelid:'',
      operator:''
    });
    //选中行
    const selectionCurrentRow=ref('');
    const currentChange=(currentRow)=>{
      selectionCurrentRow.value=currentRow;
      //修改数据
      editForm.code=currentRow.code;
      editForm.descript=currentRow.descript;
      editForm.descript1=currentRow.descript1;
      editForm.descript2=currentRow.descript2;
      editForm.grp=currentRow.grp;
      editForm.seq=currentRow.seq;
      editForm.distribute=currentRow.distribute;
      editForm.share=currentRow.share;
      //删除数据
      delForm.code=currentRow.code;
      delForm.cat=currentRow.cat;
      delForm.hotelid=currentRow.hotelid;
      delForm.operator=currentRow.operator;

    }
    // 发布参数
    const codeArr=ref([]);
    const selectionCode = (val) => {
      codeArr.value=[];
      val.forEach(item => {
        codeArr.value.push({
          code:item.code,
          hotelid:item.hotelid,
          cat:item.cat,
          operator:item.operator,
          toHotelids:[]
        })
      });
      console.log(codeArr.value);
    }
    //发布
    const releaseDocument=()=>{
      releaseDoc(codeArr.value).then(res=>{
        chooseHotelFlag.value = false;
      });
    }
    //下载表格
    const downTableData = [
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      },
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      },
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      }
    ]
    //已下载
    const downedTableData = [
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      },
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      }
    ]
    //保存修改
    const saveEdit=()=>{
      getReleasedList([{
        hotelid:'00001'
      }]).then(res=>{
        releaseTableData.value=res.result
      })
    }
    //发布修改
    const releaseTableData = ref([
      {
        code: 'AC',
        descript: '身份证',
        seq: '1',
      },
      {
        code: 'AC',
        descript: '身份证',
        seq: '2',
      },
      {
        code: 'AC',
        descript: '身份证',
        seq: '3',
      }
    ])
    const editReleased=(val)=>{
      editReleasedList([{
        seq:val.seq,
        code:val.code,
        hotelid:'00001'
      }]).then(res=>{

      })
    }
    // 撤销发布
    const returnTableData = ref([
     {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      },
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      },
      {
        code: 'AC',
        descript: '身份证',
        descript2:'身份證',
        descript1: 'Chinese indentification card',
      }
    ]);
    const defaultProps = {
      children: 'children',
      label: 'label',
    }
    // 酒店tree
    const hotelLists = [
      {
        id: 1,
        label: '西软2号店',
        children: [
          {
            id: 1,
            label: '西软品牌1',
          },
          {
            id: 2,
            label: '西软品牌2',
          },
        ],
      },
      {
        id: 2,
        label: '西软2号店',
        children: [
          {
            id: 1,
            label: '西软品牌1',
          },
          {
            id: 2,
            label: '西软品牌2',
          },
        ],
      },
    ]
    // 撤销发布数据
    const returnCheckList = ref([]);
    // 清空表单
    const resetForm = (formEl) => {
      console.log(formEl);
      proxy.$refs[formEl].resetFields();
    }
    //添加表单清空
    const resetAddForm = (formEl) => {
      proxy.$refs[formEl].resetFields();
    }
    //修改表单清空
    const resetEditForm = (formEl) => {
      proxy.$refs[formEl].resetFields();
    }
    //添加弹窗
    const editFlag= ()=>{
      addFormFlag.value = true;
    };
    const multipleSelection = ref([]);
    //下载弹窗
    const editDownFlag = ()=>{
      downFlag.value=true;
    }

    //获取已发布酒店
    const getHotelListist =()=>{
      returnCheckList.value=[]
      getReleasedHotel([{
        code:''
      }]).then(res=>{
        res.result.forEach(item=>{
          returnCheckList.value.push({
            name:item.name,
            hotelid:item.hotelid
          });
        })
      })
    }
    //发布修改弹窗
    const editReleaseFlag = ()=>{
      getReleasedList([{
        hotelid:store.state.Home.hotelid
      }]).then(res=>{
        releaseTableData.value=res.result;
        releaseFlag.value=true;
      })
    }
    //导入
    const editImportFlag= ()=>{
      codeImportFlag.value=true;
    }
    // 导出
    const exportExcel =()=>{
      let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '一般证件表.xlsx');
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    }
    //日志参数
    const recordDataForm = reactive({
      page:'',
      pageSize:'',
      hotelid:'',
      code:''
    })
    const editRecordFlag = () =>{
      recordDoc([recordDataForm]).then(res=>{
        recordTableData.value=res.result;
      })
      recordFlag.value=true;
    }
    //撤销
    const editReturnFlag = ()=>{
      returnFlag.value=true;
    }
    //发布表格
    const editPublishFlag = ()=>{
      getHotelListist();
      getReleaseList([{
        hotelid:"00001"
      }]).then(res=>{
        returnTableData.value=res.result;
      })
      publishFlag.value=true;
    }
    //删除
    const open = () => {
      if(selectionCurrentRow.value){
        ElMessageBox.confirm(
        '此操作将永久删除, 是否继续?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning',
          showClose: false
        }
      ).then(() => {
          delDoc([{
            cat:delForm.cat,
            code:delForm.code,
            hotelid:delForm.hotelid,
            operator:delForm.operator,
          }]).then(res=>{
            ElMessage({
            type: 'success',
            message: '删除成功',
          })
          })
          
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除',
          })
        })
      }else{
        ElMessage({
          message: '请选择一行再进行操作',
          type: 'warning',
        })
      }
    }
    const chooseBtn =()=>{
      publishFlag.value=false;
      chooseHotelFlag.value=true;
    }
    //修改弹窗
    const editChange=()=>{
      if(selectionCurrentRow.value){
        editFormFlag.value=true;
      }else{
        ElMessage({
          message: '请选择一行再进行操作',
          type: 'warning',
        })
      }
    }
    //单选框
    const changeRadio = ()=>{
      // console.log(radioChoose.value);
    }
    //选中的选项
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
      // console.log(multipleSelection.value);
    };
    const beforeUpload = (files)=>{
      // console.log(files);
      if(files){
        hasFiles.value = true;
      }
    }
    const handleExceed = (files) => {
      upload.value.clearFiles();
      upload.value.handleStart(files[0]);
    }
    //确认上传
    const submitUpload = () => {
      upload.value.submit();
    };
    //分页
    const changePage=(val)=>{
      console.log(val);
    }
    const chooseRaside= (aside)=>{
      switch(aside){
        case 'add' :
          editFlag();
          break;
        case 'download' :
          editDownFlag();
          break;
        case 'editRelease' :
          editReleaseFlag();
          break;
        case 'import' :
          editImportFlag();
          break;
        case 'record' :
          editRecordFlag();
          break;
        case 'revoke' :
          editReturnFlag();
          break;
        case 'release' :
          editPublishFlag();
          break;
        case 'delete' :
          open();
          break;
        case 'change' :
          editChange();
          break;
        case 'export' :
          exportExcel();
          break;
      }
    }
    return{
      recordDataForm,
      selectionCurrentRow,
      getHotelListist,
      saveEdit,
      editReleased,
      codeArr,
      selectionCode,
      releaseDocument,
      delForm,
      changeCheck,
      currentChange,
      editDocument,
      editForm,
      addDocument,
      resetEditForm,
      editFormRef,
      addFormRef,
      resetAddForm,
      exportExcel,
      changePage,
      editChange,
      editFormFlag,
      addShiftFormRules,
      defaultProps,
      hotelLists,
      proxy,
      ruleFormRef,
      tableData,
      addFormFlag,
      editFlag,
      addForm,
      radioChoose,
      changeRadio,
      downFlag,
      editDownFlag,
      downTableData,
      handleSelectionChange,
      activeName,
      releaseFlag,
      editReleaseFlag,
      releaseTableData,
      codeImportFlag,
      submitUpload,
      handleExceed,
      upload,
      beforeUpload,
      hasFiles,
      editImportFlag,
      chooseRaside,
      recordFlag,
      editRecordFlag,
      recordTableData,
      returnFlag,
      editReturnFlag,
      returnTableData,
      returnCheckList,
      publishFlag,
      editPublishFlag,
      chooseHotelFlag,
      chooseBtn,
      releaseTwoFlag,
      input,
      drawer,
      ruleForm,
      resetForm,
      downedTableData,
      open
    }
  }
}
</script>

<style lang="scss">
.documents{
  height: 100%;
  display: flex;
  // margin-top: -17px;
  border-bottom: 1px solid #ccc;
  .r-aside{
    display: flex;
  }
  .darkBtn{
    width:128px;
    height:36px;
    background-color:#383d47;
    color:#fff;
    font-size:13px
  }
  .lightBtn{
    width:128px;
    height:36px;
    background-color:#4e82d5;
    font-size:13px
  }
  .redBtn{
    width:128px;
    height:36px;
    background-color:#cc501b;
    color:#fff;
    font-size:13px
  }
  .prewBtn{
    width:128px;
    height:36px;
    background-color:#839cc4;
    color:#fff;
    font-size:13px
  }
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
  .code-import{
    .el-dialog__body{
      height: 250px;
      padding-top: 70px;
    }
    .el-upload-dragger{
      border: none;
      width: 100%;
    }
    .el-upload-list__item{
      margin: -30px auto;
      height: 42px;
      width: 591px;
      line-height: 42px;
      font-size: 12px;
      color: #303133;
    }
  }
  .release-edit{
    .el-dialog__body{
      height: 391px;
      padding: 0;
    }
    .el-input{
      width: 55px;
    }
    .el-input__inner{
      width: 55px;
      height: 20px;
    }
  }
  .code-download{
    .el-dialog__body{
      height: 391px;
      padding: 0;
    }
    .el-tabs__nav-scroll{
      margin: 18px 0 0 28px;
    }
  }
  .el-radio__label{
    color: #303133 !important;
  }
  .line{
    height: 20px;
    border-right: 2px solid #e6e8ee;
    margin: 10px;
  }
  .return{
    .draw{
      position: absolute;
      top: 61px;
      right: 2px;
      width: 345px;
	    height: 579px;
      z-index: 99;
      box-shadow: -5px 0 5px #f1f2f4;/*左边阴影*/
      // box-shadow: 5px 5px #fafafa;
      .draw-b{
        display: flex;
        height: 62px;
        width: 305px;
        justify-content: space-around;
        align-items: center;
        // border-top: 1px solid #fafafa;
      }
      .draw-m{
        .el-select-dropdown__wrap{
          padding: 10px;
        }
        padding-top: 10px;
        padding-left: 30px;
        .el-input__inner{
          width: 195px;
        }
        .el-form-item {
          margin-bottom: 13px;
        }
        .el-form-item__label{
          font-size: 12px;
          color: #303133;
        }
        width: 315px;
        height: 450px;
        background-color: #fafafa;
      }
      .draw-top{
        width: 335px;
        height: 48px;
        background-color: #fff;
        border-bottom: 1px solid #fafafa;
        box-shadow: 0 0 1px 0 #fafafa;
        p{
          text-align: center;
          line-height: 49px;
          color: #303133;
          font-family: Hiragino Sans GB;
        	font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .el-dialog__body{
      padding: 0;
    }
    .release-two{
      display: flex;
      .l-two-part{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around; 
        border-right: 2px solid #e4e7ed;
        .t-part{
          width: 724px;
          height: 240px;
          background-color: #fff;
          border: 1px solid #e4e7ed;
          box-shadow: 0 0 0 1px #e4e7ed;
          border-radius: 4px;
          padding-top: 15px;
          .t-part-text{
            font-size: 14px;
            color: #303133;
            margin-left: 15px;
          }
        }
        .b-part{
          background-color: #fff;
          width: 724px;
          height: 232px;
          border: 1px solid #e4e7ed;
          box-shadow: 0 0 0 1px #e4e7ed;
          border-radius: 4px;
          .el-menu-vertical-demo {
          .el-sub-menu__title{
            height: 32px;
            line-height: 32px;
            background-color: #f7f9fb;
            color: #303133;
            border-bottom: 1px solid #ccc;
            font-size: 13px;
          }
          .el-menu-item {
            height: 32px;
            line-height: 32px;
            color: #303133;
          }
        }
          .b-filter{
            cursor: pointer;
            margin-left: 10px;
            margin-right: 10px;
            line-height: 40px;
            color: #4e82d5;
            font-size: 13px;
          }
          .b-text{
            font-size: 14px;
            color: #303133;
          }
          .el-input__prefix-inner{
            line-height: 40px;
          }
          .el-input__inner{
            border: 0;
            height: 40px;
            box-shadow: 0 0 0 0 #fff!important;
            outline: none;
            padding-left: 140px;
            padding-right: 200px;
          }
        }
        background-color: #fafafa;
        width: 744px;
        height: 519px;
      }
      .r-two-part{
        width: 215px;
        height: 504px;
        padding-top: 15px;
        padding-left: 20px;
        .r-text{
          font-size: 14px;
          color: #303133;
        }
        .return-check{
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }
        .return-search{
          margin-top: 13px;
          width: 197px;
          height: 32px;
          border-radius: 4px;
        }
      }
    }
  }
  .el-dialog__header{
    background-color: #383d47;
    margin-right: 0;
    padding-bottom: 15px;
  }
  .el-dialog__title{
    color: #fff;
    font-size: 16px;
  }
  .el-dialog__footer{
    border-top: 1px solid #ccc;
    padding-top: 15px;
  }
  .file-upload{
    text-align: center;
  }
  .upload-text{
    font-size: 14px;
    color: #303030;
    font-family: Hiragino Sans GB;
    margin-top: 21px;
  }
  .upload-info{
    font-size: 12px;
    color: #909399;
    font-family: Hiragino Sans GB;
    margin-top: 17px;
  }
  .upload-btn{
    width: 128px;
    height: 36px;
    background-color: #4e82d5;
    border-radius: 18px;
    margin-top: 34px;
    margin-bottom: 41px;
  }
  .return{
    .el-dialog__body{
      padding: 0!important;
    }
  }
  .returnbox{
    display: flex;
    .hotel-radio{
      // height: 32px;
	    background-color: #f7f9fb;
    }
    .l-part{
      padding-top: 18px;
      position: relative;
      .l-radio{
        position: absolute;
        top: 8px;
        right: 20px;
      }
      .l-text{
        margin-left: 25px;
        color: #303133;
      }
      width: 598px;
      height: 491px;
    }
    .el-tree-node >.el-tree-node__content{
      height: 32px;
      line-height: 32px;
      background-color: #f7f9fb;
      color: #303133;
      border-bottom: 1px solid #ccc;
      font-size: 13px;
    }
    .el-tree-node__children{
      .el-tree-node__content{
        background-color: #fff;
        border: none;
      }
    }
    .filter{
      color:#4e82d5;
      font-size:13px;
      cursor: pointer;
    }
    .hotel-search{
      margin-top: 20px;
    }
    .r-part{
      border-left: 1px solid #ccc;
      padding-top: 15px;
      padding-left: 20px;
      width: 231px;
      height: 491px;
      .r-text{
        font-size: 14px;
        color: #303133;
      }
      .return-check{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
      }
      .return-search{
        margin-top: 13px;
        width: 197px;
        height: 32px;
        border-radius: 4px;
      }
    }
  }
  
  .record{
    .el-dialog__footer{
      padding: 0 0 16px 0;
    }
    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 32px;
    }
    .el-table__body tr, .el-table__body td {
      padding: 0;
      height: 32px;
    }
    .el-dialog__body{
      padding: 0 0 203px 0 !important;
      height: 272px;
    }
  }
}
.bread-box{
  margin-top: 15px;
  padding-left: 15px;
  margin-bottom: 10px;
}
.el-checkbox__inner{
  border-radius: 50% !important;
}
.el-tabs__nav-wrap::after{
  height: 0;
}
</style>