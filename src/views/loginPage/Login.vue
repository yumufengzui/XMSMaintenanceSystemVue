<template>
  <div class="login">
    <div class="loginbox">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" style="width:100%;height:100%">
      </div>
      <p class="login-text">XMS后台维护系统</p>
      <div class="infoBox">
       <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm">
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass" style="background-color: #66696f" placeholder="工号">
              <template #prefix>
                <i class="iconfont icon-user"></i>
                <i class="userText"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input v-model="ruleForm.checkPass" placeholder="密码">
               <template #prefix>
                <i class="iconfont icon-password"></i>
                <i class="userText"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-select v-model="hotelValue"  @change="changeOption" class="m-2" no-data-text="无数据" no-match-text="没搜索到数据" placeholder="选择酒店" filterable size="large" :popper-append-to-body="false">
              <!-- <el-input placeholder="搜素" @input="focusCustomer()" v-model.trim="hotelSearch" @click.stop="">
                <template #prefix>
                  <i class="iconfont icon-search"></i>
                </template>
              </el-input> -->
                <template #prefix>
                  <i class="iconfont icon-hotel"></i>
                  <i class="hotelText"></i>
                </template>
              <el-option v-for="item in hotelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="toLogin" class="loginBtn">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  setup(){
    const store= useStore();
    const hotelSearch=ref('');
    const ruleForm = reactive({
      pass: '',
      checkPass: '',
      age: '',
    });
    const router = useRouter();
  
    const toLogin =()=>{
      router.push('/home');
      ElMessage.success('登录成功');
    };
    const hotelValue = ref('');
    const changeOption=()=>{
       store.commit('Home/changeHotelId',hotelValue.value);
       console.log(store.state.Home.hotelid,'酒店id');
    }
    const newArr=ref([]);    
    const hotelOptions = ref([
      {
        value: '1',
        label: '西软1号店',
      },
      {
        value: '2',
        label: '西软2号店',
      },
      {
        value: '3',
        label: '西软3号店',
      },
      {
        value: '4',
        label: '西软4号店',
      },
      {
        value: '5',
        label: '西软5号店',
      },
      {
        value: '6',
        label: '西软6号店',
      },
      {
        value: '7',
        label: '西软7号店',
      },
      {
        value: '8',
        label: '西软8号店',
      },
    ]);
   return{
     changeOption,
     newArr,
     hotelSearch,
     ruleForm,
     toLogin,
     hotelValue,
     hotelOptions
   }
  }
}
</script>
<style lang="scss">
 .login  {
  background: url(../../assets/300.png) no-repeat;
  // background-size:100% 100%;
  background-size: cover;
  height: 100vh;
  .login-text{
    color:#fff;
    text-align: center;
    height:20px;
    margin-top:17px;
    font-size:14px;
  }
  .logo{
    margin-top:51px;
    width: 56px;
    height: 46px;
  }
  .loginbox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 12px;
    width: 385px;
	  height: 443px;
    background-color: #2e313a;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginBtn{
      height:49px;
      width:290px;
      background-color: #4e82d5;
    }
    .userText{
      margin-left: 8px;
      display: inline-block;
      height: 15px;
      border-left: 1px solid ;
      margin-top: 12px;
    }
  }
  .infoBox {
    .el-select-dropdown__item{
      width: 260px;
    }
    .el-select-dropdown{
    min-width: 275px !important;
    max-width: 275px !important;
  }
  // .el-select-dropdown__list>:nth-child(2){
  //   margin-top: 40px;
  // }
  // .el-scrollbar__thumb{
  //   margin-top: 40px;
  //   height: 200px !important;
  // }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #4e82d5 !important;
    color: #fff;
  }
  .el-popper__arrow::before{
    content: none;
  }
   .el-select__popper{
    padding: 29px 24px 29px 24px !important;
    width: 275px;
    background-color: #ffffff;
    border-radius: 6px;
    top: -200px !important;
    left: 350px !important;
    .el-input{
      width: 265px;
      position: absolute;
      top: 0;
      z-index: 9999;
      margin-bottom: 20px;
      .el-input__inner{
        background-color: #fff !important;
        // box-shadow: 1px 0 0 1px #dcdfe6 !important
        color: #000;
        border: 1px solid #dcdfe6;
      }
    }
  }
    .hotelText{
      margin-left: 8px;
      display: inline-block;
      height: 15px;
      border-left: 1px solid ;
    }
    .el-input--large .el-input__prefix{
      left: 10px;
    }
    .el-input__prefix{
      display: inline-block;
      line-height: 40px;
    }
    .el-input{
      border-radius: 6px;
    }
    margin-top: 31px;
    .el-input__inner{
      background-color: #66696f;
      color: #fbfafc;
      width: 291px;
      height: 40px;
      outline: none;
      box-shadow:none;
      font-size: 12px;
      padding-left: 40px!important;
    }
  }
  
}
</style>