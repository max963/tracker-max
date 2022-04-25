<template>
  <!-- <button class="button" @click="finalizar" :disabled="!cronometroRodando"> -->
  <button class="button">
    <!-- <span class="icon">
      <i class="fas fa-stop"></i>
    </span> -->
    <slot></slot>
    <span>{{label}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";



export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>