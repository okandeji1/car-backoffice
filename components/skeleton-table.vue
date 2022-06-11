<template>
  <div class="overflow-x-auto">
    <div class="grid grid-table thead-sty" :class="gridStyle">
      <div v-for="column in columns" class="table-col" :key="column.id">
        <span class="ml-4">
          {{ column.title }}
        </span>
      </div>
    </div>
    <div class="grid grid-table" :class="gridStyle">
      <div class="td-skele" v-for="item in new Array(columns.length * 4).fill('hello')">
        <div class="tran-skele">
          <div class="skele-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    required: true,
  },
  computed: {
    gridStyle() {
      // return `grid-template-columns:repeat(${this.columns.length}, minmax(100px, 1fr));`;
      return `grid-cols-${this.columns.length}`;
    },
  },
};
</script>

<style lang="scss" scoped>
// .grid-table {
//   grid-template-columns: minmax(90px, 150px) minmax(100px, 110px) minmax(100px, 150px) 1fr 1fr minmax(90px, 150px) 135px 135px 35px 35px 25px;
// }
// .grid-table {
//   grid-template-columns: minmax(90px, 220px) minmax(100px, 110px) minmax(100px, 220px) 1fr 1fr 1fr 1fr ;
// }

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
}
.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
}
.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
}
.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
}
.grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr)) !important;
}
.grid-cols-9 {
  grid-template-columns: repeat(9, minmax(0, 1fr)) !important;
}
.grid-cols-10 {
  grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
}
.grid-cols-11 {
  grid-template-columns: repeat(11, minmax(0, 1fr)) !important;
}

.skele-width {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .skele-width {
    width: 600px;
  }
}

.skele-m-width {
  max-width: 700px;
}

.table-col {
  border-right: 1pt solid #e8e8e8;
  padding: 0.5rem 0;
}

.td-skele {
  border-right: 1pt solid #e8e8e8;
  border-left: 1pt solid #e8e8e8;
  border-bottom: 1pt solid #e8e8e8;
  // color: #374562;
  font-weight: 500;
  padding: 6px 8px;
  @apply bg-primary-table text-primary-default-main;
}

.tran-skele {
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 46px;
}

.skele-bar {
  width: 130px;
  background-color: #a5a5a5;
  height: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skele-bar::before {
  display: block;
  content: '';
  width: 130px;
  height: 10px;
  background: linear-gradient(90deg, #dedcdc, #b2b2b2, #dedcdc);
  transform: translateX(-100%);
  animation-name: heart;
  animation-delay: 0.25s;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}

@keyframes heart {
  40%,
  to {
    transform: translateX(100%);
  }
}

.thead-sty {
  color: #fff;
  border-bottom: 1px solid #e8e8e8;
  @apply bg-primary-sec-alt;
}
</style>
