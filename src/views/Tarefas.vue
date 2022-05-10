<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Parece que sua tarefa hj é dorme-office ne? 
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <div class="modal" :class="{ 'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição 
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">Save changes</button>
          <button @click="fecharModal" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/iTarefa';
import { useStore } from '@/store';
import { ACT_ALTERAR_TAREFA, ACT_CADASTRAR_TAREFA, ACT_OBTER_PROJETOS, ACT_OBTER_TAREFAS } from '@/store/tipo-acoes';
import { computed, defineComponent } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
export default defineComponent({
  name: 'Tarefas',
  components: { 
    Formulario, 
    Tarefa,
    Box
  },
  data () {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  computed: {
    listaEstaVazia (): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.store.dispatch(ACT_CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa (tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal () {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ACT_ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },
  setup () {
    const store = useStore();
    store.dispatch(ACT_OBTER_TAREFAS)
    store.dispatch(ACT_OBTER_PROJETOS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>