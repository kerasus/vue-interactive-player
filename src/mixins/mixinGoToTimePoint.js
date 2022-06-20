const mixinGoToTimePoint = {
  methods: {
    doGoToTimePoint(task) {
      const newTimePointId = task.data.timePoint_id
      if (typeof newTimePointId === 'undefined' || newTimePointId === null) {
        // ToDo: go to ?
        return
      }
      const newTimePoint = this.localTimePoints.getItem('id', newTimePointId)
      if (!newTimePoint) {
        // ToDo: go to ?
        return
      }
      this.runTimePoint(newTimePoint)
    }
  }
}

export default mixinGoToTimePoint
