<template>
  <Box>
    <div class="columns is-clickable" @click="tarefaClicada">
      <div class="column is-4">
        {{tarefa.descricao || "Tarefa sem descricao"}}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue'
import ITarefa from '@/interfaces/iTarefa';
import Box from './Box.vue';

export default defineComponent({
  name: 'Tarefa',
  components: {
    Cronometro,
    Box
  },
  emits: ['aoTarefaClicada'],
  methods: {
    tarefaClicada (): void {
      this.$emit('aoTarefaClicada', this.tarefa)
    }
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})
</script>