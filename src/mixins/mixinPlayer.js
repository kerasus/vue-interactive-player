const mixinPlayer = {
  methods: {
    onPlayerReady() {
      // eslint-disable-next-line
    },
    onPlayerEnded() {
      // eslint-disable-next-line
    },
    onPlayerTimeUpdate(data) {
      // eslint-disable-next-line
      this.playerCurrentTime = data.currentTime
    },
    goToTime(time) {
      this.$refs.interactivePlayer.goToTime(time)
      this.play()
      this.focus()
    },
    play() {
      this.$refs.interactivePlayer.play()
    },
    pause() {
      this.$refs.interactivePlayer.pause()
    },
    focus() {
      this.$refs.interactivePlayer.focus()
    },
    changeSources(sources, poster) {
      this.sources = sources
      this.poster = poster
    },
  }
}

export default mixinPlayer
