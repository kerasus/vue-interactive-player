<template>
  <div class="StabilizationTest">
    <question-panel v-show="questionPanelVisibility" ref="questionPanel" :task="examTask" @examDone="showReport"/>
    <report-panel v-show="reportVisibility" :start-timer="reportVisibility" :title="examTask.data.examTitle" :questions="questions" @showVideoAnswers="showVideoAnswers" />
  </div>
</template>

<script>
import { Task } from '../../../models/Task'
import { QuestionList } from '../../../models/Question'
import ReportPanel from './ReportPanel'
import QuestionPanel from './QuestionPanel'

export default {
  name: 'Exam',
  props: {
    data: {
      type: Task,
      default() {
        return new Task()
      },
    },
  },

  components: {
    ReportPanel,
    QuestionPanel
  },

  watch: {
    data() {
      this.initialLoad()
    }
  },
  data () {
    return {
      reportVisibility: false,
      questionPanelVisibility: true,
      examTask: new Task()
    }
  },
  mounted() {
    this.initialLoad()
  },

  computed: {
    questions() {
      let questions = new QuestionList()
      if (this.examTask.data?.questions) {
        questions = this.examTask.data.questions
      }
      return questions
    },
  },

  methods: {
    initialLoad() {
      this.showQuestionPanel()

      this.loadExamTask()

      if (!this.hasQuestions()) {
        return
      }

      this.$nextTick(() => {
        this.$refs.questionPanel.initialLoad()
      })
    },

    loadExamTask() {
      this.examTask = new Task(this.data)
      // ممکنه دیتای تسک کلید questions نداشته باشه
      this.examTask.data.questions = new QuestionList(this.data.data.questions)
    },

    hasQuestions() {
      console.log('q', this.questions)
      return this.questions && this.questions.list.length > 0
    },


    showQuestionPanel () {
      this.reportVisibility = false
      this.questionPanelVisibility = true
    },

    showReport (data) {
      this.examTask = data
      this.questionPanelVisibility = false
      this.reportVisibility = true
    },

    showVideoAnswers (taskIds) {
      const data = {
        examTask: this.examTask,
        taskIds: taskIds
      }

      this.$emit('action', data)
    }

  },
}
</script>

<style scoped lang="scss">
.StabilizationTest {
  padding: 30px;
  .title{
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .statement {
    margin-bottom: 30px;
    font-size: 18px;
  }
  .choices {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .choice-col {
      width: 50%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      align-content: center;
      .choice {
        color: black;
        padding: 10px;
        width: 80%;
      }
    }
  }
}
</style>
