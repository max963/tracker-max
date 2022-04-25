<template>
  <span class="icon">
    <i v-if="icone===undefined"></i>
    <i class="fas fa-stop" v-if="icone==='stop'"></i>
    <i class="fas fa-play" v-if="icone==='play'"></i>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icons',
  props: {
    icone: {
      type: String
    }
  }
})
</script>
