<template>
  <div class="exam-panel">
    <div class="title"> {{ data.data.examTitle ? data.data.examTitle : 'آزمون' }}</div>
    <div v-html="currentQuestion.statement" class="statement"/>
    <div class="choices">
      <div v-for="(choice, choiceIndex) in currentQuestion.choices.list"
           :key="choiceIndex"
           class="choice-col"
      >
        <span @click="answer(choice)">
          <input
             v-model="choice.selected"
             type="checkbox"
             :name="'answer'+choiceIndex"
          >
          <span>{{ choiceIndex + 1 }}.</span>
        <span class="choice" v-html="choice.label"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {Task} from '../../../models/Task'
import {Question, QuestionList} from '../../../models/Question'

export default {
  name: 'ExamPanel',

  props: {
    data: {
      type: Task,
      default() {
        return new Task()
      },
    },
  },

  watch: {
    data(newData) {
      this.initialLoad()
    }
  },

  data() {
    return {
      currentQuestion: new Question(),
      examTask: new Task()
    }
  },

  computed: {
    questions() {
      return this.examTask.data.questions
    }
  },

  created() {
    this.initialLoad()
  },

  methods: {
    initialLoad() {

      this.loadExamTask()

      if (!this.hasQuestions()) {
        return
      }

      this.loadFirstQuestion()
    },

    loadExamTask() {
      this.examTask = new Task(this.data)
      this.examTask.data.questions = new QuestionList(this.examTask.data.questions)
    },

    hasQuestions() {
      return this.questions.list.length > 0
    },

    loadFirstQuestion() {
      const firstQuestion = this.getFirstQuestion()
      this.loadCurrentQuestion(firstQuestion)
    },

    getCurrentQuestionIndex() {
      return this.questions.getIndex('id', this.currentQuestion.id)
    },

    getNextQuestion() {
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

    getThisQuestion() {
      const currentQuestionIndex = this.getCurrentQuestionIndex()
      if (currentQuestionIndex < 0) {
        return null
      }

      return this.questions.list[currentQuestionIndex]
    },

    loadCurrentQuestion(question) {
      this.currentQuestion = question
    },

    getFirstQuestion() {
      return this.questions.list[0]
    },

    answer(choice) {
      const thisQuestion = this.getThisQuestion()
      thisQuestion.choices.clearSelected()
      choice.selected = true
      this.loadNextQuestion()
    },

    loadNextQuestion() {
      const nextQuestion = this.getNextQuestion()

      if (!nextQuestion) {
        const data = {
          examTask: this.examTask,
          questions: this.questions,
        }

        this.$emit('examDone', data)
        return
      }
      this.loadCurrentQuestion(nextQuestion)
    },
  }
}
</script>

<style lang="scss" scoped>
.exam-panel {
  padding: 30px;

  .title {
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
      align-content: center;
      margin: 10px 0;

      .choice {
        color: black;
        padding: 10px;
        width: 80%;
      }
    }
  }
}
</style>