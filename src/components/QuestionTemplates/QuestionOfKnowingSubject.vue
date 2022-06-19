<template>
  <div class="QuestionOfKnowingSubject">
    <div class="title"> آلایی جان</div>
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
  padding: 30px;
  .title{
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .statement {
    text-align: center;
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
      .choice {
        color: white;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        margin: 0 10px 10px 10px;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
      }
      &:first-child {
        width: 100%;
        .choice {
          background: #FF8303;
        }
      }

      &:nth-child(2) {
        .choice {
          background: #009900;
        }
      }

      &:nth-child(3) {
        .choice {
          background: #3399FF;
        }
      }
    }
  }
}
</style>
