import ClienteHttp from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import { ACT_OBTER_PROJETOS, ACT_CADASTRAR_PROJETOS, ACT_ALTERAR_PROJETOS, ACT_DELETAR_PROJETOS } from '@/store/tipo-acoes';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO } from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoDoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
  actions: {
    [ACT_OBTER_PROJETOS] ({ commit }) {
      ClienteHttp.get('projetos')
        .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
    },
    [ACT_CADASTRAR_PROJETOS] (contexto, nomeProjeto: string) {
      return ClienteHttp.post('projetos', {
        nome: nomeProjeto
      })
    },
    [ACT_ALTERAR_PROJETOS] (contexto, projeto: IProjeto) {
      return ClienteHttp.put(`projetos/${projeto.id}`, projeto)
    },
    [ACT_DELETAR_PROJETOS] ({ commit }, id: string) {
      return ClienteHttp.delete(`projetos/${id}`).then(() => {
        commit(EXCLUIR_PROJETO, id)
      })
    },
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
  }
}
