const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  effects: {

  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

  },
};
export default GlobalModel;
