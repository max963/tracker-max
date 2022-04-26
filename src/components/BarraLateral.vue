<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="logo">
    </h1>
    <Button @click="alterarTema">
      {{textoDoBotao}}
    </Button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <Icons :icone="'task'"></Icons>
            tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <Icons :icone="'project'"></Icons>
            projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from './Button.vue';
import Icons from "./Icons.vue";

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  components: {
    Button,
    Icons
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoDoBotao() {
      return this.modoEscuroAtivo ? "Desativar modo escuro" : "Ativar modo escuro";
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5em;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}
</style>