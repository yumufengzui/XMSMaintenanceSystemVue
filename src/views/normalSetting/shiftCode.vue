<template>
  <!-- <el-breadcrumb separator="" class="bread">
    <el-breadcrumb-item :to="{ path: '/home' }">基本设置<i class="iconfont icon-arrow-right" style="margin-left:5px"></i></el-breadcrumb-item>
    <el-breadcrumb-item style="margin-left:-12px">班别代码</el-breadcrumb-item>
  </el-breadcrumb> -->
  <div class="shift-code">
    <!-- 表格数据 -->
    <el-table highlight-current-row :data="tableData" class="tableBox" stripe style="width: 100%">
      <el-table-column prop="code" width="100px" align="center" label="代码" />
      <el-table-column prop="descript" align="center" label="中文描述" />
      <el-table-column prop="time" width="80px" align="center" label="时间" />
      <el-table-column prop="status" width="80px" align="center" label="停用">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="T" inactive-value="F" />
        </template>
      </el-table-column>
      <el-table-column prop="date" width="80px" align="center" label="共享">
        <template #default="scope">
          <el-checkbox v-model="scope.row.share" size="large" />
        </template>
      </el-table-column>
      <el-table-column prop="date" width="80px" align="center" label="发布">
        <template #default="scope">
          <el-checkbox v-model="scope.row.release" size="large" />
        </template>
      </el-table-column>
      <el-table-column prop="seq" width="80px" align="center" label="排序" />
      <el-table-column prop="fox" align="center" label="最近修改" />
      <el-table-column prop="changed" width="200px" align="center" label="修改时间" />
    </el-table>
    <el-aside width="auto" class="shift-code-aside">
      <common-raside @chooseRaside="chooseRaside($event)"></common-raside>
    </el-aside>
    <!-- 新建签证 -->
    <el-dialog v-model="addShiftFlag" @close="resetAddForm('addFormRef')" destroy-on-close :close-on-click-modal="false" title="新建签证" center width="550px" :show-close="false">
      <el-form :model="addShiftForm" ref="addFormRef" label-position="left" :rules="addShiftFormRules">
        <el-form-item label="代码" :label-width="80" prop="code">
          <el-input v-model.trim="addShiftForm.code" />
        </el-form-item>
        <el-form-item label="中文描述" :label-width="80" prop="descript">
          <el-input v-model="addShiftForm.descript" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文描述" :label-width="80" prop="descript1">
          <el-input v-model="addShiftForm.descript1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="繁体描述" :label-width="80" prop="descript2">
          <el-input v-model="addShiftForm.descript2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="证件类型" :label-width="80" prop="region">
          <el-select oninput="value=value.replace(/[^0-9.]/g,'')" v-model.trim="addShiftForm.region" placeholder="请选择证件类型">
            <el-option label="身份证" value="T" />
            <el-option label="港澳通行证" value="HM" />
            <el-option label="台湾通行证" value="TW" />
            <el-option label="其他" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="80" prop="name">
          <el-input v-model="addShiftForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="其他选项" :label-width="80" prop="resource">
          <el-radio-group v-model="addShiftForm.resource">
            <el-radio label="T">共享</el-radio>
            <el-radio label="F">发布</el-radio>
            <el-radio label="G">系统</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button type="primary" @click="addShiftFlag = false" class="lightBtn">新建</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改签证 -->
    <el-dialog v-model="changeShiftFlag" @close="resetEditForm('editFormRef')" destroy-on-close :close-on-click-modal="false" title="修改签证" center width="550px" :show-close="false">
      <el-form :model="addShiftForm" ref="editFormRef" label-position="left" :rules="addShiftFormRules">
        <el-form-item label="代码" :label-width="80" prop="code">
          <el-input v-model.trim="addShiftForm.code" />
        </el-form-item>
        <el-form-item label="中文描述" :label-width="80" prop="descript">
          <el-input v-model="addShiftForm.descript" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文描述" :label-width="80" prop="descript1">
          <el-input v-model="addShiftForm.descript1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="繁体描述" :label-width="80" prop="descript2">
          <el-input v-model="addShiftForm.descript2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="证件类型" :label-width="80" prop="region">
          <el-select v-model="addShiftForm.region" placeholder="请选择证件类型">
            <el-option label="身份证" value="T" />
            <el-option label="港澳通行证" value="HM" />
            <el-option label="台湾通行证" value="TW" />
            <el-option label="其他" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="80" prop="name">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model.trim="addShiftForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="其他选项" :label-width="80" prop="resource">
          <el-radio-group v-model="addShiftForm.resource">
            <el-radio label="T">共享</el-radio>
            <el-radio label="F">发布</el-radio>
            <el-radio label="G">系统</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="changeShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button type="primary" @click="changeShiftFlag = false" class="lightBtn">修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 发布 -->
    <el-dialog v-model="publishShiftFlag" destroy-on-close :close-on-click-modal="false" custom-class="returnShift" title="发布" center width="829px" height="644px" :show-close="false">
      <div class="returnbox">
        <div class="l-part">
          <span class="l-text" style="color: #4e82d5;">1. 选择已发布代码</span>
          &nbsp;&nbsp;<i class="iconfont icon-arrow-right"></i>
          <span class="l-text">2. 选择酒店</span>
          <el-table
            stripe
            ref="multipleTableRef"
            :data="returnShiftTableData"
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
          <el-checkbox-group v-model="returnCheck" class="return-check">
            <el-checkbox v-for="item in returnCheckList" :label="item" :key="item" name="type" />
          </el-checkbox-group>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="publishShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button type="primary" @click="chooseBtn" class="lightBtn">选择酒店发布</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 选择酒店发布 -->
    <el-dialog v-model="chooseHotelShiftFlag" destroy-on-close :close-on-click-modal="false" custom-class="returnShift" title="发布" center width="829px" height="644px" :show-close="false">
      <div class="draw" v-if="drawerShift">
        <div class="draw-top">
          <p>条件筛选</p>
        </div>
        <div class="draw-m">
          <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" class="demo-ruleForm" label-position="left" :size="formSize" >
            <el-form-item label="品牌" prop="region">
              <el-select placeholder="选择品牌" v-model="ruleForm.region" filterable>
                 <!-- <el-input v-model="input" placeholder="搜索" class="return-search">
                  <template #prefix>
                    <i class="iconfont icon-search"></i>
                  </template>
                </el-input> -->
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
      <div class="returnbox" @click="drawerShift=false">
        <div class="l-part">
          <span class="l-text">1. 选择已发布代码</span>
          &nbsp;&nbsp;<i class="iconfont icon-arrow-right"></i>
          <span class="l-text" style="color: #4e82d5;">2. 选择酒店</span>
          <!-- <span class="l-radio"><el-radio v-model="radio1" label="1" size="large">单独勾选</el-radio></span> -->
          <el-input v-model="input" placeholder="请输入酒店名称搜索" class="hotel-search">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
            <template #suffix>
              <i class="filter" @click.stop="drawerShift = !drawerShift">筛选</i>
            </template>
          </el-input>
          <el-tree
            :data="hotelLists"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          />
        </div>
        <div class="r-part">
          <span class="r-text">已发布酒店（{{returnCheckList.length}}）</span>
          <el-input v-model="input" placeholder="搜索" class="return-search">
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
          </el-input>
          <el-checkbox-group v-model="returnCheck" class="return-check">
            <el-checkbox v-for="item in returnCheckList" :label="item" :key="item" name="type" />
          </el-checkbox-group>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="chooseHotelShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button type="primary" @click="chooseHotelShiftFlag = false" class="lightBtn">确认发布 </el-button>
          <el-button @click="chooseHotelShiftFlag = false;publishShiftFlag=true" class="prewBtn">上一步</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 代码下载 -->
    <el-dialog v-model="downShiftFlag" destroy-on-close :close-on-click-modal="false" title="代码下载" custom-class="codeShift-download" center width="829px" :show-close="false">
       <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="可下载" name="first">
          <el-table
            stripe
            ref="multipleTableRef"
            :data="downShiftTableData"
            style="width: 100%"
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
            :data="downedShiftTableData"
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
        <el-button @click="downShiftFlag = false" class="darkBtn">关闭</el-button>
        <el-button type="primary" @click="downShiftFlag = false" class="lightBtn">下载</el-button>
      </span>
    </template>
    </el-dialog>
    <!-- 发布修改 -->
    <el-dialog v-model="releaseShiftFlag" destroy-on-close :close-on-click-modal="false" title="发布修改" custom-class="releaseShift-edit" center width="760px" :show-close="false">
      <el-table
        stripe
        ref="multipleTableRef"
        :data="releaseVisaTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column label="代码" width="120" align="center">
          <template #default="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column property="descript" label="中文描述" width="120" align="center" />
        <el-table-column property="seq" label="排序" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-input v-model="scope.row.seq"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="releaseShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button @click="releaseShiftFlag = false" class="redBtn">取消发布</el-button>
          <el-button type="primary" @click="releaseShiftFlag = false" class="lightBtn">保存</el-button>
        </span>
      </template>
    </el-dialog>
     <!-- 新日志 -->
    <el-dialog v-model="recordShiftFlag" destroy-on-close :close-on-click-modal="false"  custom-class="recordShift" title="日志" center width="1149px" :show-close="false">
      <el-table :data="recordVisaTableData" stripe style="width: 100%">
        <el-table-column prop="code" align="center" label="代码/名称" />
        <el-table-column prop="name" align="center" label="项目" />
        <el-table-column prop="oldvalue" align="center" label="原值" />
        <el-table-column prop="newvalue" align="center" label="新值" />
        <el-table-column prop="changed" align="center" label="最近修改" />
        <el-table-column prop="changeTime" width="200px" align="center" label="修改时间" />
        <el-table-column prop="pc_id" align="center" label="操作站点" />
        <el-table-column prop="sqlid" align="center" label="设备号" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <div class="home-container">
            <my-pagination @change-page='changePage' :pagesize='10' :total='80' :page='1' />
          </div>
          <el-button @click="recordShiftFlag = false" class="darkBtn">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 撤销发布 -->
    <el-dialog v-model="returnShiftFlag" destroy-on-close :close-on-click-modal="false"  custom-class="returnShift" title="撤销发布" center width="829px" height="644px" :show-close="false">
      <div class="returnbox">
        <div class="l-part">
          <span class="l-text">已发布代码</span>
          <el-table
            stripe
            ref="multipleTableRef"
            :data="returnShiftTableData"
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
          <el-checkbox-group v-model="returnCheck" class="return-check">
            <el-checkbox v-for="item in returnCheckList" :label="item" :key="item" name="type" />
          </el-checkbox-group>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="returnShiftFlag = false" class="darkBtn">关闭</el-button>
          <el-button type="primary" @click="returnShiftFlag = false" class="lightBtn">撤销</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import commonRaside from "@/components/layout/commonRaside.vue"
import {ref,reactive,getCurrentInstance} from 'vue'
import MyPagination from '@/components/pagination/myPagination'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components:{
    commonRaside,MyPagination
  },
  setup(){
    const checked1 = ref(true);
    const addFormRef=ref('');
    const editFormRef=ref('');
    const {proxy}=getCurrentInstance();
    const ruleFormRef = ref('')
    const returnCheck=ref([])
    const activeName=ref('first');
    const input=ref('');
    const drawerShift=ref(false);
    const returnShiftFlag=ref(false);
    const recordShiftFlag=ref(false);
    const releaseShiftFlag=ref(false);
    const downShiftFlag=ref(false);
    const chooseHotelShiftFlag=ref(false);
    const publishShiftFlag=ref(false);
    const addShiftFlag=ref(false);
    const changeShiftFlag=ref(false);
    const addShiftForm = reactive({
      code: '',
      descript: '',
      date1: '',
      date2: '',
      delivery: false,
      resource: '',
      desc: '',
    });
    const returnCheckList = ['西软连锁','西软一号店','西软二号店','西软三号店','西软四号店'];
     // 新建表单验证
    const addShiftFormRules = reactive({
      code: [
        { required: true, message:'必须填写', trigger: 'blur' },
      ],
      descript: [
        { required: true,message:'必须填写', trigger: 'blur' },
      ]
    });
    const ruleForm = reactive({
      region: '',
    });
    const returnShiftTableData = [
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
    ];
     // 已下载表格
    const downedShiftTableData = [
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
    //日志表格
    const recordVisaTableData= ref([
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
     //发布表格
    const releaseVisaTableData = [
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
    ]
    // 下载表格
    const downShiftTableData = [
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
    const tableData= ref([
      {
        code: 'CO1',
        descript: '夜班',
        time: '8',
        status:'T',
        seq:'1',
        fox:'fox',
        changed:'2015-09-25  16:19:00'
      },
      {
        code: 'CO2',
        descript: '中班',
        status:'T',
        time: '8',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'2'
      },
      {
        code: '111',
        descript: '早班',
        status:'T',
        time: '8',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'3'
      },
      {
        code: 'TTS',
        descript: '早晚班',
        status:'T',
        time: '16',
        fox:'fox',
        changed:'2015-09-25  16:19:00',
        seq:'4'
      },
    ]);
    const chooseRaside= (aside)=>{
      switch(aside){
        case 'add' :
          editAddShift();
          break;
        case 'download' :
          editDownShift();
          break;
        case 'editRelease' :
          editReleaseShift();
          break;
        case 'revoke' :
          editReturnShift();
          break;
        case 'record' :
          editRecordShift();
          break;
        case 'release' :
          editPublishShift();
          break;
        case 'delete' :
          open();
          break;
        case 'change' :
          editChangeShift();
          break;
      }
    };
    const changePage=(val)=>{
      console.log(val);
    }
    //新建
    const editAddShift=()=>{
      addShiftFlag.value=true
    }
    //修改
    const editChangeShift=()=>{
      changeShiftFlag.value=true;
    }
    //删除
    const open = () => {
      ElMessageBox.confirm(
        '此操作将永久删除, 是否继续?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning',
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除',
          })
        })
    }
    //发布
    const editPublishShift=()=>{
      publishShiftFlag.value=true
    }
    //下载
    const editDownShift=()=>{
      downShiftFlag.value=true
    }
    //发布修改
    const editReleaseShift=()=>{
      releaseShiftFlag.value=true
    }
    //下一步
    const chooseBtn =()=>{
      publishShiftFlag.value=false;
      chooseHotelShiftFlag.value=true;
    }
    //日志
    const editRecordShift=()=>{
      recordShiftFlag.value=true
    }
    //撤销
    const editReturnShift=()=>{
      returnShiftFlag.value=true
    }
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
    return{
      editFormRef,
      resetEditForm,
      resetAddForm,
      addFormRef,
      checked1,
      resetForm,
      ruleFormRef,
      proxy,
      changePage,
      editReturnShift,
      returnShiftFlag,
      recordVisaTableData,
      editRecordShift,
      recordShiftFlag,
      releaseVisaTableData,
      editReleaseShift,
      releaseShiftFlag,
      downedShiftTableData,
      downShiftTableData,
      activeName,
      editDownShift,
      downShiftFlag,
      hotelLists,
      chooseHotelShiftFlag,
      ruleForm,
      input,
      drawerShift,
      chooseBtn,
      returnShiftTableData,
      returnCheck,
      returnCheckList,
      editPublishShift,
      publishShiftFlag,
      editChangeShift,
      changeShiftFlag,
      addShiftFormRules,
      addShiftForm,
      editAddShift,
      addShiftFlag,
      tableData,
      chooseRaside
    }
  }

}
</script>

<style lang="scss">
.bread{
  margin-top: 15px;
  padding-left: 15px;
  margin-bottom: 10px;
}
.shift-code{
  height: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
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
  .recordShift{
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
  .releaseShift-edit{
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
  .codeShift-download{
    .el-dialog__body{
      height: 391px;
      padding: 0;
    }
    .el-tabs__nav-scroll{
      margin: 18px 0 0 28px;
    }
  }
  .returnShift{
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
  .shift-code-aside{
    // margin-top: -50px;
    display: flex;
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
}
.el-checkbox__inner{
  border-radius: 50% !important;
}
</style>