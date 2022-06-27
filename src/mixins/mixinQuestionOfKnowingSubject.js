const mixinQuestionOfKnowingSubject = {
  methods: {
    async doQuestionOfKnowingSubject(task) {
      if (typeof task.before_do === 'function') {
        await task.before_do()
      }
      task.setDoing()
      this.overPlayData = task
      this.overPlayComponent = 'question-of-knowing-subject'
      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.showOverPlayer()
    },

    async doActionOfQuestionOfKnowingSubject(data) {
      const task = data.task
      const choice = data.choice
      if (typeof task.before_action === 'function') {
        await task.before_action()
      }
      this.hideOverPlayer()
      task.setDone()

      if (choice.task_id) {
        const nextTask = this.currentTimePoint.tasks.getItem('id', choice.task_id)
        this.doTask(nextTask)
        return
      }

      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.$nextTick(() => {
        this.goToTime(this.currentTimePoint.start)
        this.play()
      })
    },
  }
}

export default mixinQuestionOfKnowingSubject
