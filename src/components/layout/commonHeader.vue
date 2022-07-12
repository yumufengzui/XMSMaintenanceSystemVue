<template>
  <div class="home">
    <el-dialog v-model="themeFlag" :close-on-click-modal="false"  title="主题皮肤设置" center width="788px" :show-close="false">
      <div class="theme-box">
        <div class="dark" v-for="item in colors" :key="item">
          <div :class="item.color" class="darkt"></div>
          <el-radio v-model="chooseBox" :label="item.label" @click="colorChoose(item.color)"></el-radio>
          <div class="dark-b"></div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="themeFlag = false" class="foot-btn">关闭</el-button>
          <el-button type="primary"  @click="saveColor(colorItem)" class="footSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="l-content">
      <span class="icon">
        <img src="../../assets/icon.png" alt="">
      </span>
      <!-- <span style="color:#ffffff;font-size: 15px;font-family: HYRuiZhi;margin-right:28px">维护后台</span> -->
      <span style="display: inline-block;">
        <el-input v-model="input" placeholder="搜索" class="header-seach">
          <template #prefix>
            <i class="iconfont icon-search"></i>
          </template>
        </el-input>
      </span>
    </div>
    <div class="m-content">
      <span><p style="color:#ffffff">{{headerTitle}}</p></span>
    </div>
    <div class="r-content">
      <i class="iconfont icon-setting" @click="editThemeFlag"></i>
      <i class="iconfont icon-language"></i>
      <img src="../../assets/300.png" alt="" class="picture">
      <el-popover placement="bottom" title="西软1号店" :width="232" trigger="click">
        <div class="popover">
          <span class="fox">fox</span>
          <span class="login-out">注销</span>
        </div>
        <template #reference>
          <span class="el-dropdown-link">
            西软一店<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { ref, reactive,computed, getCurrentInstance} from 'vue'
import {Setting,ArrowDown }  from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components:{
    Setting,ArrowDown
  },
  setup(){
    const chooseBox=ref('')
    const colorItem=ref('')
    const colors=ref([
      {
        color:'darkColor',
        label:'深色'
      },
      {
        color:'yellow',
        label:'黄色'
      },
      {
        color:'blue',
        label:'蓝色'
      },
      {
        color:'red',
        label:'红色'
      },
      {
        color:'brown',
        label:'棕色'
      },
      {
        color:'green',
        label:'绿色'
      },
      {
        color:'cyan',
        label:'青色'
      },
      {
        color:'purple',
        label:'紫色'
      }
    ])
    const themeFlag=ref(false)
    const chooseItem=ref('西软一号店')
    const actionItem=['西软一号店','西软二号店','西软三号店']
    const input = ref('');
    const handleCommand=(command)=>{
      console.log(command);
      chooseItem.value=command
    };
    const editThemeFlag =()=>{
      themeFlag.value=true
    }
    const {proxy} = getCurrentInstance();
    const headerTitle =computed(()=>{
      return proxy.$route.meta.title
    });
    const colorChoose=(val)=>{
      colorItem.value=val
      // switch(val){
      //   case 'darkColor':
      //     setDark();
      //     break;
      //   case 'yellow':
      //     setYellow();
      //     break;
      //   case 'blue':
      //     setBlue();
      //     break;
      //   case 'red':
      //     setRed();
      //     break;
      //   case 'brown':
      //     setBrown();
      //     break;
      //   case 'green':
      //     setGreen();
      //     break;
      //   case 'cyan':
      //     setCyan();
      //     break;
      //   case 'purple':
      //     setPurple();
      //     break;
      // }
    }
    // const setDark= ()=>{
    //   // proxy.$emit('chooseColor','darkColor');
    //   localStorage.clear();
    //   localStorage.setItem('color','darkColor');
    // }
    // const setBlue= ()=>{
    //   // proxy.$emit('chooseColor','blue');
    //   localStorage.clear();
    //   localStorage.setItem('color','blue');
    // }
    // const setYellow= ()=>{
    //   // proxy.$emit('chooseColor','yellow');
    //   localStorage.clear();
    //   localStorage.setItem('color','yellow');
    // }
    // const setRed= ()=>{
    //   // proxy.$emit('chooseColor','red');
    //   localStorage.clear();
    //   localStorage.setItem('color','red');
    // }
    // const setBrown= ()=>{
    //   proxy.$emit('chooseColor','brown')
    //   localStorage.clear();
    //   localStorage.setItem('color','brown');
    // }
    // const setGreen= ()=>{
    //   // proxy.$emit('chooseColor','green');
    //   localStorage.clear();
    //   localStorage.setItem('color','green');
    // }
    //  const setCyan= ()=>{
    //   // proxy.$emit('chooseColor','cyan');
    //   localStorage.clear();
    //   localStorage.setItem('color','cyan');
    // }
    // const setPurple= ()=>{
    //   // proxy.$emit('chooseColor','purple');
    //   localStorage.clear();
    //   localStorage.setItem('color','purple');
    // }
    const saveColor =(val)=>{
      localStorage.clear();
      localStorage.setItem('color',val);
      proxy.$emit('chooseColor',val);
      themeFlag.value=false;
    }
    return{
      chooseBox,
      colorItem,
      colorChoose,
      colors,
      input,
      actionItem,
      chooseItem,
      handleCommand,
      headerTitle,
      proxy,
      themeFlag,
      editThemeFlag,
      // setDark,
      // setYellow,
      // setBlue,
      // setRed,
      // setBrown,
      // setGreen,
      // setCyan,
      // setPurple,
      saveColor
    }
  }
}
</script>

<style lang="scss">
.popover{
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  .fox{
    font-family: Hiragino Sans GB;
	  font-size: 13px;
    color: #4e82d5;
    margin: 16px 0 0 21px;
    cursor: pointer;
  }
  .login-out{
    font-family: Hiragino Sans GB;
	  font-size: 13px;
    color: #4e82d5;
    margin: 16px 21px 0 0;
    cursor: pointer;
  }
}
.darkColor{
  background-color: #393c42 !important;
}
.yellow{
  background-color: #b8c416 !important;
}
.blue{
  background-color: #4b6eaf !important;
}
.red{
  background-color: #cb6227 !important;
}
.brown{
  background-color: #b99a5f !important;
}
.green{
  background-color: #56957a !important;
}
.cyan{
  background-color: #06859f !important;
}
.purple{
  background-color: #665d9d !important;
}
.home{
  // .el-dialog__title{
  //   color: #fff;
  //   font-size: 16px;
  // }
  .el-dialog__footer{
    border-top: 1px solid #ccc;
    padding-top: 15px;
  }
  .foot-btn{
    width:128px;
    height:36px;
    background-color:#383d47;
    color:#fff;
    font-size:13px
  }
  .footSave{
    width:128px;
    height:36px;
    background-color:#4e82d5;
    font-size:13px
  }
  .theme-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 349px;
    div{
      width: 162px;
	    height: 120px;
      border-radius: 6px;
    }
    .dark{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #f7f9fb;
      align-items: center;
      .el-radio__inner::after{
        content: none;
      }
      .darkt{
        width: 162px;
        height: 25px;
        background-color: #393c42;
        border-radius: 4px 4px 0px 0px;
      }
      .dark-b{
        width: 157px;
        height: 26px;
        background-color: #393c42;
        border-radius: 0px 0px 4px 4px;
        opacity: 0.56;
        color: #ffffff;
        line-height: 26px;
        font-size: 12px;
        padding-left: 5px;
      }
    }
  }
  .l-content{
    .header-seach{
      width: 253px;
	    height: 30px;
    }
    .el-input__inner{
      border-radius: 25px!important;
      // background-color: #484d56;
      box-shadow:none;
      // color: #fff;
    }
  }
  
  .r-content{
    
    .picture{
      margin-right:45px;
      display:inline-block;
      width:31px;
      height:31px;
      vertical-align: middle;
      border-radius:50%;
    }
    .icon-language{
      vertical-align: middle;
      margin-right:45px;
      color: #fff;
    }
    .icon-setting{
      vertical-align: middle;
      margin-right:45px;
      color: #fff;
    }
  }
  .icon{
    img{
      vertical-align: middle;
      width: 100%;
      // height: 100%;
    }
    display: inline-block;
    width: 91px;
	  // height: 19px;
    margin-right: 28px;

  }
  .el-dropdown-link{
    line-height: 60px;
    cursor: pointer;
    color:#ffffff;
    font-size: 13px;
  }
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  height: 60px;
}
.el-popover__title{
  font-family: Hiragino Sans GB;
  font-size: 13px;
  color: #303133;
  line-height: 0px;
  margin: 21px 0 20px 21px;
}
.el-popover,.el-popover.el-popper{
  padding: 0;
  height: 98px;
}

</style>