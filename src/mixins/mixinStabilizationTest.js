import { TaskList } from '../models/Task'

const mixinStabilizationTest = {
  data() {
    return {
      taskSequence: new TaskList(),
    }
  },
  methods: {
    doStabilizationTest(task) {
      this.pause()
      task.done = true
      this.overPlayData = task
      this.overPlayComponent = 'exam'
      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.showOverPlayer()
    },

    doActionOfStabilizationTest(data) {
      console.log('data', data)
      const taskIds = data.taskIds
      const examTask = data.examTask
      // const questions = data.examTask.data.questions
      this.hideOverPlayer()
      this.doTaskSequence(taskIds, examTask.data.next_task_id)
    },
  }
}

export default mixinStabilizationTest
