const mixinGoToTimePoint = {
  methods: {
    doGoToTimePoint(task) {
      task.done = true
      const start = (typeof task.start !== 'undefined') ? task.start : this.currentTimePoint.start
      const end = (typeof task.end !== 'undefined') ? task.end : this.currentTimePoint.end
      this.watchingEndTime = end
      this.goToTime(start)
      this.play()
    }
  }
}

export default mixinGoToTimePoint
