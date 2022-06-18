const mixinStabilizationTest = {
  methods: {
    doStabilizationTest(task) {
      task.done = true
      this.overPlayData = task.data
      this.overPlayComponent = 'question-of-knowing-subject'
      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.showOverPlayer()
    },
    doActionOfStabilizationTest(choice) {
      console.log('doActionOfStabilizationTest', choice)
      if (choice.task_id) {
        const task = this.currentTimePoint.tasks.getItem('id', choice.task_id)
        this.doTask(task)
      }

      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.hideOverPlayer()
      this.goToTime(this.currentTimePoint.start)
      this.play()
    },
  }
}

export default mixinStabilizationTest
