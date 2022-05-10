<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
      </div>
      <div class="field">
        <button class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import useNotificador from '@/hooks/notificador'
import { ACT_ALTERAR_PROJETOS, ACT_CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  setup (props) {
    const store = useStore();
    const { notificar } = useNotificador()
    const nomeDoProjeto = ref("")
    const router = useRouter()

    if(props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ACT_ALTERAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value
        }).then(() => sucesso())
      } else {
        store.dispatch(ACT_CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => sucesso())
      }
    }

    const sucesso = (): void => {
      nomeDoProjeto.value = ''
      notificar(TipoNotificacao.SUCCESS, 'Showw', 'deu certo');
      router.push('/projetos')
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>
