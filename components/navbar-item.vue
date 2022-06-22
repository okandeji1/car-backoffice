<template>
  <li class="mx-4 cursor-pointer list-none" :class="classProps" @click="click">{{title.toUpperCase()}}</li>
</template>

<script lang="ts">

export default {

  props: {
    classProps: {
      type: String,
    },

    title: {
      type: String,
      required: true
    },
    click: {
      type: Function
    }
  }
}
</script>
