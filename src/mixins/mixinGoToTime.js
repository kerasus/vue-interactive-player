const mixinGoToTime = {
  methods: {
    doGoToTime(task) {
      console.log('doGoToTime')
      task.done = true
      const start = (typeof task.data?.start !== 'undefined') ? task.data.start : this.currentTimePoint.start
      const end = (typeof task.data?.end !== 'undefined') ? task.data.end : this.currentTimePoint.end
      this.setWatchingEndTime(end)
      this.goToTime(start)
      this.play()
    }
  }
}

export default mixinGoToTime
