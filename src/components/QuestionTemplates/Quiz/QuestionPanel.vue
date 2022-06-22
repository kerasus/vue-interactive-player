<template>
  <div class="exam-panel">
    <div class="title"> {{ task.data.examTitle ? task.data.examTitle : 'آزمون' }}</div>
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

    <div class="change-question-buttons-row">
      <button
          class="change-question-button"
          :class="{'hide': !hasPrevQuestion }"
          @click="loadPrevQuestion"
      >
        قبل
      </button>
      <button
          class="change-question-button"
          :class="{'hide': !hasNextQuestion }"
          @click="loadNextQuestion"
      >
        بعد
      </button>

      <button
          class="change-question-button see-report-button"
          :class="{'hide': hasNextQuestion }"
          @click="seeReport"
      >
        دیدن کارنامه
      </button>
    </div>

  </div>
</template>

<script>
import {Task} from '../../../models/Task'
import {Question, QuestionList} from '../../../models/Question'

export default {
  name: 'QuestionPanel',

  props: {
    task: {
      type: Task,
      default() {
        return new Task()
      },
    },
  },

  data() {
    return {
      currentQuestion: new Question(),
      examTask: new Task()
    }
  },

  computed: {
    hasNextQuestion () {
      const currentQuestionIndex = this.getCurrentQuestionIndex()
      return (currentQuestionIndex + 1) < this.questions.list.length
    },
    hasPrevQuestion () {
      const currentQuestionIndex = this.getCurrentQuestionIndex()
      return currentQuestionIndex === 0
    },
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
      this.loadFirstQuestion()
    },

    loadExamTask() {
      this.examTask = new Task(this.task)
      this.examTask.data.questions = new QuestionList(this.examTask.data.questions)
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

    getPrevQuestion() {
      const currentQuestionIndex = this.getCurrentQuestionIndex()

      const prevQuestion = this.questions.list[currentQuestionIndex - 1]

      if (typeof prevQuestion === 'undefined') {
        return null
      }

      return prevQuestion
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
    },

    loadPrevQuestion() {
      const prevQuestion = this.getPrevQuestion()

      if (!prevQuestion) {
        return
      }

      this.loadCurrentQuestion(prevQuestion)
    },

    loadNextQuestion() {
      const nextQuestion = this.getNextQuestion()

      if (!nextQuestion) {
        return
      }

      this.loadCurrentQuestion(nextQuestion)
    },

    seeReport () {
      this.$emit('examDone', this.examTask)
    }

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

  .change-question-buttons-row {
    display: flex;
    justify-content: center;

    .change-question-button {
      width: 100px;
      height: 30px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      margin: 30px 10px;

      &.hide {
        display: none;
      }

      &.see-report-button {
        color: green;
      }
    }
  }
}
</style>