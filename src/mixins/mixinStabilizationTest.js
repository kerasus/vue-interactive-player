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

    doActionOfStabilizationTest(questions, taskIds) {
      // const taskIds = this.getTaskIdsOfSelectedChoices(questions)

      this.overPlayData = task.data
      this.overPlayComponent = 'stabilization-test'
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
  }
}

export default mixinStabilizationTest
