<template>
  <span class="icon">
    <i v-if="icone===undefined"></i>
    <i class="fas fa-stop" v-if="icone==='stop'"></i>
    <i class="fas fa-play" v-if="icone==='play'"></i>
    <i class="fas fa-tasks" v-if="icone==='task'"></i>
    <i class="fas fa-project-diagram" v-if="icone==='project'"></i>
    <i class="fas fa-plus" v-if="icone==='add'"></i>
    <i class="fas fa-trash is-danger" v-if="icone==='delete'"></i>
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
