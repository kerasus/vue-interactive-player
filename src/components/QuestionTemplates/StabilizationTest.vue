<template>
  <div class="StabilizationTest">
    <div v-html="currentQuestion.statement" class="statement" />
    <div class="choices">
      <div v-for="(choice, choiceIndex) in currentQuestion.choices.list"
           :key="choiceIndex"
           class="choice-col"
      >
        <div class="choice" v-html="choice.label" @click="answer(choice)" />
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
      type: Array,
      default() {
        return new QuestionList()
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
    getNextQuestion () {
      const currentQuestionIndex = this.questions.getIndex('id', this.currentQuestion.id)
      if (currentQuestionIndex < 0) {
        return null
      }

      return this.questions.list[currentQuestionIndex]
    },
    loadNextQuestion () {
      const nextQuestion = this.getNextQuestion()
      
      this.loadCurrentQuestion(firstQuestion)
    },
    loadCurrentQuestion (question) {
      this.currentQuestion = question
    },
    getFirstQuestion () {
      return this.questions.list[0]
    },
    answer(choice) {
      this.$emit('action', choice)
    },
  },
}
</script>

<style scoped lang="scss">
.StabilizationTest {
  padding: 10px;
  .statement {

  }
  .choices {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .choice-col {
      width: 50%;
      .choice {
        background-color: gray;
        color: white;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        padding: 10px;
        width: 80%;
        margin-top: 10px;
      }
    }
  }
}
</style>
