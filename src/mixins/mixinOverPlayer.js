const mixinOverPlayer = {
  methods: {
    showOverPlayer() {
      console.trace()
      this.overPlayer = true
    },
    hideOverPlayer() {
      this.overPlayer = false
    },
    toggleOverPlayer() {
      if (this.overPlayer) {
        this.hideOverPlayer()
      } else {
        this.showOverPlayer()
      }
    },
  }
}

export default mixinOverPlayer
