<template>
  <div class="StabilizationTest">
    <div class="title"> تست های تسلط</div>
    <div v-html="currentQuestion.statement" class="statement" />
    <div class="choices">
      <div v-for="(choice, choiceIndex) in currentQuestion.choices.list"
           :key="choiceIndex"
           class="choice-col"
      >
        <input type="checkbox" :id="choice.selected" :name="'answer'+choiceIndex" :value="choice.value" @change="answer(choice)">
        <span>{{ choiceIndex + 1 }}.</span>
        <div class="choice" v-html="choice.label" />
      </div>
    </div>
  </div>
</template>

<script>
import { Question, QuestionList } from '../../models/Question'

export default {
  name: 'StabilizationTest',
  props: {
    data: {
      type: Object,
      default() {
        return {
          legalTime: null,
          task_id: null,
          questions: []
        }
      },
    },
  },
  data () {
    return {
      currentQuestion: new Question(),
      questions: new QuestionList()
    }
  },
  created() {
    this.questions = new QuestionList(this.data?.questions)

    if (!this.hasQuestions()) {
      return
    }

    this.loadFirstQuestion()
  },
  methods: {
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
    loadNextQuestion () {
      const nextQuestion = this.getNextQuestion()
      if (!nextQuestion) {
        this.$emit('action', this.questions)
        return
      }
      this.loadCurrentQuestion(nextQuestion)
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
