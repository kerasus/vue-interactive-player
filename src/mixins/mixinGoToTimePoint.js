const mixinGoToTimePoint = {
  methods: {
    async doGoToTimePoint(task) {
      if (typeof task.before_do === 'function') {
        await task.before_do()
      }
      task.setDoing()
      const newTimePointId = task.data.time_point_id
      if (typeof newTimePointId === 'undefined' || newTimePointId === null) {
        this.loadNextTimePont()
        return
      }
      const newTimePoint = this.localTimePoints.getItem('id', newTimePointId)
      if (!newTimePoint) {
        this.loadNextTimePont()
        return
      }
      this.runTimePoint(newTimePoint)
    }
  }
}

export default mixinGoToTimePoint
