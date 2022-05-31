<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>

    <Box v-if="listaEstaVazia">
      Parece que sua tarefa hj é dorme-office ne? 
    </Box>
    
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição 
          </label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Save changes</button>
        <button @click="fecharModal" class="button">Cancel</button>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import Modal from '@/components/Modal.vue';
import ITarefa from '@/interfaces/iTarefa';
import { useStore } from '@/store';
import { ACT_ALTERAR_TAREFA, ACT_CADASTRAR_TAREFA, ACT_OBTER_PROJETOS, ACT_OBTER_TAREFAS } from '@/store/tipo-acoes';
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';

export default defineComponent({
  name: 'Tarefas',
  components: { 
    Formulario, 
    Tarefa,
    Box,
    Modal
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

    const filtro = ref("")
    // const tarefas = computed(() =>
    //   store.state.tarefas.filter(
    //     (f) => !filtro.value || f.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(ACT_OBTER_TAREFAS, filtro.value)
    })
    
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
      filtro
    }
  }
});
</script>