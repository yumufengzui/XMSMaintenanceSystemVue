<template>
  <div class="my-pagination">
    <span>当前第 {{currentPage}}/{{pages}} 页</span>
    <div class="r-box">
      <a href="javascript:;" @click="chooseFirst">首页</a>
      <a @click='changePage(false)' href="javascript:;" :class="{disabled: currentPage===1}">上一页</a>
      <a @click='changePage(true)' href="javascript:;" :class='{disabled: currentPage===pages}'>下一页</a>
      <a href="javascript:;" @click="chooseLast">尾页</a>
      <span>跳转至 <el-input v-model.trim="toPage" oninput="value=value.replace(/[^0-9.]/g,'')" @keydown.enter="toAppointPage"></el-input> 页</span>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'

export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 80
    },
    pagesize: {
      type: Number,
      default: 10
    }
    // 默认初始页码
    // page: {
    //   type: Number,
    //   default: 1
    // }
  },
  setup (props, { emit, attrs }) {
    // attrs表示父组件传递的属性，但是props没有接收的属性，这种属性不是响应式的
    // 动态计算中期的页码信息
    // 每页的条数
    // const pagesize = 8
    // 总页数
    const toPage=ref('')
    const pages = computed(() => Math.ceil(props.total / props.pagesize))
    // 当前页码
    // console.log(attrs.page)
    const currentPage = ref(attrs.page || 1)
    // 动态计算页码列表
    const list = computed(() => {
      // 当父组件传递total的值发生变化时，计算属性会重新计算
      // pages = Math.ceil(props.total / props.pagesize)
      const result = []
      // 总页码小于等于5；大于5
      if (pages.value <= 5) {
        // 总页码小于等于5的情况
        for (let i = 1; i <= pages.value; i++) {
          result.push(i)
        }
      } else {
        // 总页码大于5
        if (currentPage.value <= 2) {
          // 左侧临界值
          for (let i = 1; i <= 5; i++) {
            result.push(i)
          }
        } else if (currentPage.value >= pages.value - 1) {
          // 右侧临界值
          for (let i = pages.value - 4; i <= pages.value; i++) {
            result.push(i)
          }
        } else {
          // 中间的状态
          for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
            result.push(i)
          }
        }
      }
      return result
    })
    const toAppointPage=()=>{
      if(toPage.value>pages.value){
        toPage.value=pages.value
        currentPage.value=parseInt(toPage.value);
        emit('change-page', currentPage.value)
      }else if(toPage.value==''){
        currentPage.value=parseInt(currentPage.value);
        emit('change-page', currentPage.value)
      }else{
        currentPage.value=parseInt(toPage.value);
        emit('change-page', currentPage.value)
      }
    }
    const chooseFirst=()=>{
      currentPage.value=1;
      emit('change-page', currentPage.value)
    }
    const chooseLast=()=>{
      currentPage.value=pages.value;
      emit('change-page', currentPage.value)
    }
    // 控制上一页和下一页变化
    const changePage = (type) => {
      if (type === false) {
        // 上一页
        // 页面是第一页时，禁止点击操作
        if (currentPage.value === 1) return
        if (currentPage.value > 1) {
          currentPage.value -= 1
        }
      } else if (type === true) {
        // 下一页
        // 页面是最后页时，禁止点击操作
        if (currentPage.value === pages.value) return
        if (currentPage.value < pages.value) {
          currentPage.value += 1
        }
      } else {
        // 点击页码
        currentPage.value = type
      }
      emit('change-page', currentPage.value)
    }
    return { list, currentPage, pages, changePage ,chooseFirst,chooseLast,toPage,toAppointPage}
  }
}
</script>
<style lang="scss">
.my-pagination {
  margin-bottom: 16px;
  padding: 0 20px;
  background-color: #f7f9fb;
  display: flex;
  justify-content: space-between;
  // padding: 30px;
  align-items: center;
  height: 39px;
  font-family: Hiragino Sans GB;
	font-size: 13px;
  color: #303133;
  border-bottom: solid 1px #e4e7ed;
  .el-input,.el-input__inner{
    display: inline-block;
    width: 48px;
    height: 24px;
    // background-color: #ffffff;
    border-radius: 3px;
    // border: solid 1px #e4e7ed;
  }
  .r-box> a {
    background-color: #ffffff;
    display: inline-block;
    padding: 5px 10px;
    text-decoration: none;
    color: #666;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #4e82d5;
    }
    &.active {
      background: #4e82d5;
      color: #fff;
      border-color: #4e82d5;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
