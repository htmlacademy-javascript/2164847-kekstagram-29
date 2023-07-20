export function createState(initialState = {}, render) {
  return {
    ...initialState,
    reset: function() {
      this.update(initialState);
    },
    update: function(props) {
      let newState = props;
      const prevState = { ...this };
      if(typeof props === 'function') {
        newState = props(this);
      }
      for(let prop in newState) {
        this[prop] = newState[prop]
      }
      render(this, prevState);
    },
  }
}
