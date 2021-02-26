import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import api from '@/api';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    set(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit, state }, params = {}) {
      commit('set', { isLoading: true });

      try {
        if (state.isCached === true) return;
        const { data } = await api.getPayments(params);

        if (Array.isArray(data)) {
          commit('set', { data });
          commit('set', { isCached: true });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('set', { isLoading: false });
      }
    },
    cacheClear({ dispatch, commit }) {
      commit('set', { isCached: false });
      dispatch('load');
    },
  },

  plugins: [vuexLocalStorage.plugin],
});
