import { TaskList } from '../models/Task'

const mixinExam = {
  data() {
    return {
      taskSequence: new TaskList(),
    }
  },
  methods: {
    doExam(task) {
      this.pause()
      task.done = true
      this.overPlayData = task
      this.overPlayComponent = 'exam'
      this.changeSources(this.currentTimePoint.sources, this.currentTimePoint.poster)
      this.showOverPlayer()
    },

    doActionOfExam(data) {
      console.log('data', data)
      const taskIds = data.taskIds
      const examTask = data.examTask
      // const questions = data.examTask.data.questions
      this.hideOverPlayer()
      this.doTaskSequence(taskIds, examTask.data.next_task_id)
    },
  }
}

export default mixinExam
