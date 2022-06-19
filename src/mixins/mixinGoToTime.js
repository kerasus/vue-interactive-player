const mixinGoToTime = {
  methods: {
    doGoToTime(task) {
      task.done = true
      const start = (typeof task.data?.start !== 'undefined') ? task.start : this.currentTimePoint.start
      const end = (typeof task.data?.end !== 'undefined') ? task.end : this.currentTimePoint.end
      this.watchingEndTime = end
      this.goToTime(start)
      this.play()
    }
  }
}

export default mixinGoToTime
