const mixinGoToTimePoint = {
  methods: {
    doGoToTimePoint(task) {
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
