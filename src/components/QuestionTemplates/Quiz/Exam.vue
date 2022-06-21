<template>
  <div class="StabilizationTest">
    <exam-panel v-show="questionPanelVisibility" :data="data" @examDone="showReport"/>
    <report-panel v-show="reportVisibility" :start-timer="reportVisibility" :title="data.data.examTitle" :questions="questions" @showVideoAnswers="showVideoAnswers" />
  </div>
</template>

<script>
import { Task } from '../../../models/Task'
import { QuestionList } from '../../../models/Question'
import ReportPanel from './ReportPanel'
import ExamPanel from './ExamPanel'

export default {
  name: 'StabilizationTest',
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
    ExamPanel
  },
  data () {
    return {
      reportVisibility: false,
      questionPanelVisibility: true,
      questions: new QuestionList(),
      examTask: new Task()

    }
  },
  created() {
    this.showQuestionPanel()
  },
  methods: {
    showQuestionPanel () {
      this.reportVisibility = false
      this.questionPanelVisibility = true
    },

    showReport (data) {
      this.questions = data.questions
      this.examTask = data.examTask
      this.questionPanelVisibility = false
      this.reportVisibility = true
    },

    showVideoAnswers (taskIds) {
      const data = {
        examTask: this.examTask,
        questions: this.questions,
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
