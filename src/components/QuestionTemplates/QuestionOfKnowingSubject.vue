<template>
  <div>
    <div v-html="question.statement" />
    <div>
      <div v-for="(choice, choiceIndex) in question.choices.list"
           :key="choiceIndex"
           v-html="choice.label"
           @click="answered(choice)"
      />
    </div>
  </div>
</template>

<script>
import { Question } from '@/models/Question'

export default {
  name: 'QuestionOfKnowingSubject',
  props: {
    question: {
      type: Question,
      default() {
        return new Question()
      },
    },
  },
  methods: {
    answered(choice) {
      this.$emit('answered', choice)
    },
  },
}
</script>

<style scoped>

</style>
