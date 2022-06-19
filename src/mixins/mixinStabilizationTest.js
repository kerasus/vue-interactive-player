import { TaskList } from '../models/Task'

const mixinStabilizationTest = {
  data() {
    return {
      taskSequence: new TaskList(),
    }
  },
  methods: {
    doStabilizationTest(task) {
      console.log('doStabilizationTest (playerCurrentTime): ', this.playerCurrentTime)
      this.pause()
      task.done = true
      this.overPlayData = task.data
      this.overPlayComponent = 'stabilization-test'
      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.showOverPlayer()
    },
    doActionOfStabilizationTest(questions) {
      const taskIds = this.getTaskIdsOfSelectedChoices(questions)
      this.hideOverPlayer()
      this.doTaskSequence(taskIds)





      // const task_id = this.currentTask.data?.task_id
      // if (typeof task_id === 'undefined') {
      //   this.loadNextTimePont()
      //   return
      // }
      // const nextTask = this.currentTimePoint.tasks.getItem('id', task_id)
      //
      // if (!nextTask) {
      //   this.loadNextTimePont()
      //   return
      // }
      //
      // this.doTask(nextTask)
      //
      //
      // this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      // this.hideOverPlayer()
      // this.goToTime(this.currentTimePoint.start)
      // this.play()
    },
    getTaskIdsOfSelectedChoices (questions) {
      const taskIds = []
      questions.list.forEach(question => {
        const selectedChoice = question.choices.getSelected()
        if (selectedChoice && selectedChoice.value) {
          return
        }
        taskIds.push(question.task_id)
      })

      return taskIds
    }
  }
}

export default mixinStabilizationTest
