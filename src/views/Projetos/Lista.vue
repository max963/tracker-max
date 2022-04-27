<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <Icons :icone="add" />
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td> {{projeto.id}} </td>
          <td> {{projeto.nome}} </td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <icons :icone="'delete'" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import Icons from "@/components/Icons.vue";
import { useStore } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { Icons },
  name: 'Lista',
  setup () {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projetos),
      store
    }
  },
  methods: {
    excluir (id: string) {
      this.store.commit('EXCLUIR_PROJETO', id)
    }
  }
})
</script>
