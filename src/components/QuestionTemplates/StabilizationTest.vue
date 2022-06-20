<template>
  <div class="StabilizationTest">
    <div v-show="questionPanelVisibility">
      <div class="title"> تست های تسلط</div>
      <div v-html="currentQuestion.statement" class="statement" />
      <div class="choices">
        <div v-for="(choice, choiceIndex) in currentQuestion.choices.list"
             :key="choiceIndex"
             class="choice-col"
             @click="answer(choice)"
        >
          <input
              v-model="choice.selected"
              type="checkbox"
              :name="'answer'+choiceIndex"
          >
          <span>{{ choiceIndex + 1 }}.</span>
          <div class="choice" v-html="choice.label"/>
        </div>
      </div>
    </div>
    <report-of-test v-show="reportVisibility" :questions="questions" @showVideoAnswers="showVideoAnswers" />
  </div>
</template>

<script>
import {Task} from '../../models/Task'
import { Question, QuestionList } from '../../models/Question'
import ReportOfTest from '../QuestionTemplates/ReportOfTest'

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
  watch: {
    data (newData) {
      console.log('StabilizationTest watch data', newData)
      this.initialLoad()
    }
  },
  components: {
    ReportOfTest
  },
  data () {
    return {
      reportVisibility: false,
      questionPanelVisibility: true,
      currentQuestion: new Question(),
      examTask: new Task()
    }
  },
  computed: {
    questions () {
      return this.examTask.data.questions
    }
  },
  created() {
    console.log('StabilizationTest created')
    this.initialLoad()
  },
  mounted() {
    console.log('StabilizationTest mounted')
  },
  updated() {
    console.log('StabilizationTest updated')
  },
  methods: {
    showQuestionPanel () {
      this.reportVisibility = false
      this.questionPanelVisibility = true
    },
    showReport () {
      this.questionPanelVisibility = false
      this.reportVisibility = true
    },
    initialLoad() {
      this.showQuestionPanel()
      this.loadExamTask()

      if (!this.hasQuestions()) {
        return
      }

      this.loadFirstQuestion()
    },

    loadExamTask () {
      this.examTask = new Task(this.data)
      this.examTask.data.questions = new QuestionList(this.examTask.data.questions)
    },

    hasQuestions () {
      return this.questions.list.length > 0
    },

    loadFirstQuestion () {
      const firstQuestion = this.getFirstQuestion()
      this.loadCurrentQuestion(firstQuestion)
    },

    getCurrentQuestionIndex () {
      return this.questions.getIndex('id', this.currentQuestion.id)
    },

    getNextQuestion () {
      const currentQuestionIndex = this.getCurrentQuestionIndex()
      if (currentQuestionIndex < 0) {
        return null
      }

      const nextQuestion = this.questions.list[currentQuestionIndex + 1]

      if (typeof nextQuestion === 'undefined') {
        return null
      }

      return nextQuestion
    },

    getThisQuestion () {
      const currentQuestionIndex = this.getCurrentQuestionIndex()
      if (currentQuestionIndex < 0) {
        return null
      }

      return this.questions.list[currentQuestionIndex]
    },

    loadCurrentQuestion (question) {
      this.currentQuestion = question
    },

    getFirstQuestion () {
      return this.questions.list[0]
    },

    answer(choice) {
      const thisQuestion = this.getThisQuestion()
      thisQuestion.choices.clearSelected()
      choice.selected = true
      this.loadNextQuestion()
    },

    actionOfReport () {
      const data = {
        questions: this.questions,
        taskIds: this.getTaskIdsOfSelectedChoices(this.questions)
      }

      this.$emit('action', data)
    },

    loadNextQuestion () {
      const nextQuestion = this.getNextQuestion()

      if (!nextQuestion) {
        this.showReport()
        return
      }

      this.loadCurrentQuestion(nextQuestion)
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
    },

    showVideoAnswers (taskIds) {
      const data = {
        examTask: this.examTask,
        questions: this.questions,
        taskIds: this.getTaskIdsOfSelectedChoices(this.questions)
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
