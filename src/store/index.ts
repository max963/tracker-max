import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETOS, DELETAR_PROJETOS } from './tipo-acoes';
import { INotificacao } from './../interfaces/INotificacao';
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import ClienteHttp from '@/http';

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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
    [OBTER_PROJETOS] ({ commit }) {
      ClienteHttp.get('projetos')
        .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
    },
    [CADASTRAR_PROJETOS] (contexto, nomeProjeto: string) {
      return ClienteHttp.post('projetos', {
        nome: nomeProjeto
      })
    },
    [ALTERAR_PROJETOS] (contexto, projeto: IProjeto) {
      return ClienteHttp.put(`projetos/${projeto.id}`, projeto)
    },
    [DELETAR_PROJETOS] ({ commit }, id: string) {
      return ClienteHttp.delete(`projetos/${id}`).then(() => {
        commit(EXCLUIR_PROJETO, id)
      })
    },
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}