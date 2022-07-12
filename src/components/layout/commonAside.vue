<template>
  <div class="sidebar">
    <!-- <el-input v-model="input" placeholder="输入关键词搜索" class="aside-seach"></el-input> -->
    <el-menu class="sidebar-el-menu" 
        :default-active="onRoutes" background-color="#fff"
        text-color="#303133" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-sub-menu :index="item.index" :key="item.index">
              <template #title>
                <i :class="item.icon" style="margin-right:5px"></i>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template #title>{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.title">{{ subItem.title }}</el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon" style="margin-right:5px"></i>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </template>
    </el-menu>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, watch,ref} from "vue";
import { useRoute } from "vue-router";
export default {
  setup(){
    const input =ref('')
    const items = [
      {
        icon: 'iconfont icon-System_Setting',
        index: "/dashboard",
        title: "系统设置",
        subs:[]
      },
      {
        icon: 'iconfont icon-report',
        index: "/table",
        title: "报表",
        subs:[]
      },
      {
        icon: 'iconfont icon-members',
        index: "/tabs",
        title: "会员权益",
        subs:[]
      },
      {
        icon: 'iconfont icon-basic',
        index: "3",
        title: "基本设置",
        subs: [
          {
              index: "/generalDocuments",
              title: "一般证件",
          },
          {
              index: "/codeVisa",
              title: "签证代码",
          },
          {
              index: "/visaAuthority",
              title: "签证机关",
          },
          {
              index: "/upload",
              title: "快速扫描类型",
          },
          {
              index: "/shiftCode",
              title: "班别代码",
          },
          {
            index: "4",
            title: "区域",
            subs: [
              {
                index: "/editor",
                title: "区域一",
              },
            ],
          },
          {
            index: "5",
            title: "语种",
            subs: [
              {
                index: "/editor",
                title: "语种一",
              },
            ],
          },
          {
            index: "5",
            title: "其他",
            subs: [
              {
                index: "/editor",
                title: "其他一",
              },
            ],
          },
          ],
      },
      {
          icon: 'iconfont icon-archives',
          index: "/icon",
          title: "档案设置",
          subs:[]
      },
      {
          icon: 'iconfont icon-meeting_information',
          index: "/charts",
          title: "会议资料管理",
          subs:[]
      },
      {
          icon: 'iconfont icon-hotel_setting',
          index: "/donate",
          title: "酒店设置",
          subs:[]
      },
    ];
    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });
    return{
      items,
      onRoutes,
      input
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  text-align: center;
  .aside-seach{
    margin-top: 13px;
    margin-bottom: 20px;
    width: 188px;
	  height: 32px;
  }

}
.sidebar {
  // height: 100vh;
  border-right: 1px solid #ccc;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 210px;
}
.sidebar > ul {
    height: 100vh;
    border: none;
}
</style>