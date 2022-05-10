import { EstadoDoProjeto, projeto } from './modulo/projeto/index';
import { ACT_OBTER_TAREFAS, ACT_CADASTRAR_TAREFA, ACT_ALTERAR_TAREFA } from './tipo-acoes';
import { INotificacao } from './../interfaces/INotificacao';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import ClienteHttp from '@/http';
import ITarefa from '@/interfaces/iTarefa';

export interface Estado {
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
  projeto: EstadoDoProjeto,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    

    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(tar => tar.id == tarefa.id)
      state.tarefas[index] = tarefa
    },

    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000);
    }
  },
  actions: {
    

    [ACT_OBTER_TAREFAS] ({ commit }) {
      ClienteHttp.get('tarefas')
        .then(resposta => {
          console.log('tarefas', resposta.data)
          commit(DEFINIR_TAREFAS, resposta.data)
        })
    },
    [ACT_CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa) {
      return ClienteHttp.post('tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ACT_ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return ClienteHttp.put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    },
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}