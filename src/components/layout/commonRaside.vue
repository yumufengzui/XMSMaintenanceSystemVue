<template>
  <div class="r-asideBox">
    <el-input v-model="input" placeholder="输入关键词搜索" class="aside-seach" v-if="!isCollapse"></el-input>
    <el-menu
    text-color="#303133"
    background-color="#fff"
    active-text-color="#303133" 
    :collapse="isCollapse">
      <el-menu-item v-for="item in asideItem" :key="item.title" @click="itemClick(item.title)">
        <i :class="rasideIcon(item)" style="margin-right:6px"></i>
        <template #title>{{rasideTitle(item)}}</template>
      </el-menu-item>
    </el-menu>
    <div class="expand" @click="isExpand">
      <el-icon v-if="isCollapse" style="vertical-align: middle;"><arrow-left /></el-icon>
      <el-icon v-if="!isCollapse" style="vertical-align: middle;"><arrow-right /></el-icon>
      <span style="font-size:13px;color:#303133;" v-if="!isCollapse">
        收缩工具栏
      </span>
    </div>
  </div>
</template>

<script>
import { ref ,defineComponent, getCurrentInstance,computed} from 'vue'
import { ArrowRight ,ArrowLeft  } from '@element-plus/icons-vue'
import '../../assets/iconList/iconfont.css';
import '../../assets/iconList/iconfont.js';
export default defineComponent ({
  components:{
    ArrowLeft,
    ArrowRight
  },
  setup(){
    const input=ref('')
    const isCollapse = ref(false)
    const asideItem =[
      {
        title:'新建(A)',
        icon:'iconfont icon-new'
      },
      {
        title:'修改(M)',
        icon:'iconfont icon-Modify'
      },
      {
        title:'删除(X)',
        icon:'iconfont icon-delete'
      },
      {
        title:'下载',
        icon:'iconfont icon-download'    
      },
      {
        title:'发布',
        icon:'iconfont icon-release'
      },
      {
        title:'发布修改',
        icon:'iconfont icon-Release_modify'
      },
      {
        title:'撤销发布',
        icon:'iconfont icon-undo'
      },
      {
        title:'日志(L)',
        icon:'iconfont icon-log'
      },
      {
        title:'导入',
        icon:'iconfont icon-import'
      },
      {
        title:'导出',
        icon:'iconfont icon-export'
      }
    ];
    const isExpand=()=>{
      isCollapse.value = !isCollapse.value
    };
    const {proxy} = getCurrentInstance();
    //图标筛选
    const rasideIcon=computed(()=>{
      return item=>{
       if(proxy.$route.meta.title==='一般证件'){
         return item.icon
       }else{
         if(item.title!=='导入'&&item.title!=='导出'){
           return item.icon
         }
       }
      }
    })
    //菜单筛选
    const rasideTitle= computed(()=>{
      return item=>{
       if(proxy.$route.meta.title==='一般证件'){
         return item.title
       }else{
         if(item.title!=='导入'&&item.title!=='导出'){
           return item.title
         }
       }
      }
    })
    const itemClick = (e)=>{
      switch(e){
        case '新建(A)' :
          proxy.$emit('chooseRaside','add');
          break;
        case '下载' :
          proxy.$emit('chooseRaside','download');
          break;
        case '发布修改' :
          proxy.$emit('chooseRaside','editRelease');
          break;
        case '导入' :
          proxy.$emit('chooseRaside','import');
          break;
        case '日志(L)' :
          proxy.$emit('chooseRaside','record');
          break;
        case '撤销发布' :
          proxy.$emit('chooseRaside','revoke');
          break;
        case '发布' :
          proxy.$emit('chooseRaside','release');
          break;
        case '删除(X)' :
          proxy.$emit('chooseRaside','delete');
          break
        case '修改(M)' :
          proxy.$emit('chooseRaside','change');
          break
        case '导出' :
          proxy.$emit('chooseRaside','export');
          break
      }
    };
    return{
      input,
      rasideIcon,
      rasideTitle,
      asideItem,
      isCollapse,
      isExpand,
      itemClick,
      proxy
    }
  }
})
</script>

<style lang="scss">
.r-asideBox{
  position: relative;
  // height: 800px;
  flex-direction: column;
  display: flex;
  align-items: center;
  .el-menu{
    border-right: none;
  }
  .el-menu-item{
    background-color: #fff;
  }
  text-align: center;
  padding: 10px;
  .aside-seach{
    margin-top: 13px;
    margin-bottom: 20px;
    width: 137px;
	  height: 32px;
  }
  border-left: 1px solid #ccc;
  // height: 100vh;
}
.el-menu-item{
  height: 50px;
}
.expand{
  // width: 101px;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  border-top: 1px solid #ccc;
  padding: 18px;
}
.is-dark{
  display: none !important;
}
</style>