<template>
  <div class="reportOfTest">
    <div class="title">نتیجه ی تست تسلط</div>
    <div class="title-of-column"> دیدن فیلم</div>
    <div
        v-for="(question , index ) in data.list"
        :key="index"
        class="questions-answer"
    >
      <span class="question-number"> {{index + 1 }}</span>
      <i v-if="isAnswerCorrect(question)" class="fa fa-check"></i>
      <i v-else class="fa fa-close"></i>

      <span v-if="isAnswerCorrect(question)">لازم نیست</span>
      <span v-else>">باید ببینی</span>

      <span v-if="isAnswerCorrect(question)">میخوام ببینم</span>
      <span v-if="isAnswerCorrect(question)">نه سوتی دادم</span>

    </div>
    <button @click="actionOfReport">
      ActionOfReport
    </button>
  </div>
</template>

<script>

import { QuestionList } from '../../models/Question'

export default {
  name: 'ReportOfTest',
  props:{
    data: {
      type: QuestionList,
      default () {
        return new QuestionList()
      }
    }
  },
  created() {
  },
  methods: {
    actionOfReport () {
      const data = {}
      this.$emit('action', this.data)
    },
    isAnswerCorrect (question) {
      const selectedChoice = question.choices.getSelected()
      return selectedChoice === selectedChoice.value
    }
  }
}
</script>

<style scoped>

</style>