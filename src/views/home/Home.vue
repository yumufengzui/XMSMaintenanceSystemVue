<template>
  <div class="common-layout">
    <el-container>
      <el-header :class="{
        dark:darkShow,
        yellow:silverShow,
        blue:blueShow,
        red:redShow,
        brown:brownShow,
        green:greenShow,
        cyan:cyanShow,
        purple:purpleShow
      }">
        <common-header @chooseColor="chooseColor($event)"></common-header>
      </el-header>
      <el-container>
        <el-aside width="210px">
          <common-aside></common-aside>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-aside width="auto" class="r-aside">
          <commom-raside></commom-raside>
        </el-aside> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {ref} from 'vue'
import { useStore } from "vuex";
import { onMounted } from 'vue'
import commonHeader from "@/components/layout/commonHeader.vue"
import commonAside from "@/components/layout/commonAside.vue"
export default {
  components:{
    commonHeader,
    commonAside,
  },
  setup(){
    const store= useStore();
    onMounted(()=>{
      let color = localStorage.getItem('color');
      switch (color){
         case 'darkColor':
          chooseDark();
          break;
        case 'yellow':
          chooseYellow();
          break;
        case 'blue':
          chooseBlue();
          break;
        case 'red':
          chooseRed();
          break;
        case 'brown':
          chooseBrown();
          break;
        case 'green':
          chooseGreen();
          break;
        case 'cyan':
          chooseCyan();
          break;
        case 'purple':
          choosePurple();
          break;
      }
    })
    const darkShow = ref(false);
    const silverShow = ref(false);
    const blueShow = ref(false);
    const redShow = ref(false);
    const brownShow = ref(false);
    const greenShow = ref(false);
    const cyanShow = ref(false);
    const purpleShow = ref(false);
    const chooseColor =(e)=>{
      switch(e){
        case 'darkColor':
          chooseDark();
          break;
        case 'yellow':
          chooseYellow();
          break;
        case 'blue':
          chooseBlue();
          break;
        case 'red':
          chooseRed();
          break;
        case 'brown':
          chooseBrown();
          break;
        case 'green':
          chooseGreen();
          break;
        case 'cyan':
          chooseCyan();
          break;
        case 'purple':
          choosePurple();
          break;
      }
    }
     const chooseYellow =()=>{
      darkShow.value=false;
      silverShow.value=true;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseDark =()=>{
      darkShow.value=true;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseBlue=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=true;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseRed=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=true;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseBrown=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=true;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseGreen=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=true;
      cyanShow.value=false;
      purpleShow.value=false;
    }
    const chooseCyan=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=true;
      purpleShow.value=false;
    }
    const choosePurple=()=>{
      darkShow.value=false;
      silverShow.value=false;
      blueShow.value=false;
      redShow.value=false;
      brownShow.value=false;
      greenShow.value=false;
      cyanShow.value=false;
      purpleShow.value=true;
    }
    return{
      darkShow,
      silverShow,
      blueShow,
      redShow,
      brownShow,
      greenShow,
      cyanShow,
      purpleShow,
      chooseDark,
      chooseColor,
      chooseYellow,
      chooseBlue,
      chooseRed,
      chooseBrown,
      chooseGreen,
      chooseCyan,
      choosePurple
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color: #383d47;
  height: 60px;
}
.common-layout{
  height: 100%;
}
.el-container{
  height: 100%;
}
.el-main{
  padding: 1px 0 3px 1px;
  flex: 1;
  height: 100%;
  overflow: hidden;
  // display: flex;
}
//header颜色
.dark{
  background-color: #383d47 !important;
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
</style>