const mixinPlayer = {
  methods: {
    onPlayerReady() {
      // eslint-disable-next-line
      // console.log('onPlayerReady')
    },
    onPlayerEnded() {
      // eslint-disable-next-line
      // console.log('onPlayerEnded')
    },
    onPlayerTimeUpdate(data) {
      // eslint-disable-next-line
      // console.log('onPlayerTimeUpdate', data)
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
      console.trace('pause (playerCurrentTime): ', this.playerCurrentTime)
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
