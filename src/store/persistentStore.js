import VuexPersistence from 'vuex-persist';

const { localStorage } = window;

export default new VuexPersistence({
  storage: localStorage
});
