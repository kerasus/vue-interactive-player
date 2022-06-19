<template>
  <div class="QuestionOfKnowingSubject">
    <div v-html="question.statement" class="statement" />
    <div class="choices">
      <div v-for="(choice, choiceIndex) in question.choices.list"
           :key="choiceIndex"
           class="choice-col"
      >
        <div class="choice" v-html="choice.label" @click="answered(choice)" />
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from '../../models/Question'

export default {
  name: 'QuestionOfKnowingSubject',
  props: {
    data: {
      type: Object,
      default() {
        return new Question()
      },
    },
  },
  data () {
    return {
      question: new Question()
    }
  },
  created() {
    this.question = new Question(this.data)
  },
  methods: {
    answered(choice) {
      this.$emit('action', choice)
    },
  },
}
</script>

<style scoped lang="scss">
.QuestionOfKnowingSubject {
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
