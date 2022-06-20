<template>
  <div class="reportOfTest">
    <div class="title">
      <span>نتیجه ی </span>
      <span> {{ title ? title : 'آزمون'}}</span>
    </div>

    <div class="title-of-column"> دیدن فیلم</div>

    <div
        v-for="(question , index ) in customQuestions.list"
        :key="index"
        class="questions-answer"
    >
      <div class="right-column">
        <span class="question-number"> {{index + 1 }}. </span>
        <span class="selected-answer">  گزینه ی  {{ index + 1 }}</span>
        <span class="answer-icon">
          <i v-if="isAnswerCorrect(question)" name="mdi-check"/>
          <i v-else name="mdi-close"/>
        </span>
      </div>

      <div class="left-column">

        <span class="assign-task">
          <span
              v-if="isAnswerCorrect(question)"
              class="correct-answer"
          >
            لازم نیست
          </span>
          <span
              v-else
              class="wrong-answer"
          >
            باید ببینی
          </span>
        </span>

        <span class="change-task">
          <span
              v-if="isAnswerCorrect(question)"
              class="correct-answer"
              @click="wantToSeeVideo(question)"
          >
            <span v-show="!question.haveToSee">میخوام ببینم</span>

            <span
                v-show="question.haveToSee"
                class="change-opinion"
            >
            بیخیال نمیبینم
          </span>
          </span>
          <span
              v-if="!isAnswerCorrect(question)"
              class="wrong-answer"
          >
            نه سوتی دادم
          </span>
        </span>
      </div>

    </div>
    <div>
      <span
          class="action-button"
          @click="actionOfReport"
      >
      تماشا
    </span>
    </div>
  </div>
</template>

<script>

import { QuestionList } from '../../../models/Question'

export default {
  name: 'ReportOfTest',
  props:{
    title: {
      type: String,
      default: ''
    },
    questions: {
      type: QuestionList,
      default () {
        return new QuestionList()
      }
    }
  },

  data () {
    return {
      opinionChange: false
    }
  },

  created() {},

  computed : {
    taskIds () {
      return this.getTaskIdsOfSelectedChoices(this.customQuestions)
    },
    customQuestions () {
      return this.loadQuestions(this.questions)
    }
  },

  methods: {
    actionOfReport () {
      this.$emit('showVideoAnswers', this.taskIds)
    },

    getTaskIdsOfSelectedChoices (questions) {
      const taskIds = []
      questions.list.forEach(question => {
        if (!question.haveToSee) {
          return
        }

        taskIds.push(question.task_id)
      })

      return taskIds
    },

    isAnswerCorrect (question) {
      const selectedChoice = question.choices.getSelected()
      return (selectedChoice && selectedChoice.value)
    },

    setHaveToSee (questions) {
     questions.list.forEach(question => {
        question.haveToSee = !this.isAnswerCorrect(question)
      })
    },

    loadQuestions(questions) {
      this.setHaveToSee(questions)
      return questions
    },

    wantToSeeVideo (question) {
      console.log(question.haveToSee)
      question.haveToSee = !question.haveToSee
      console.log(question.haveToSee)

    }
  }
}
</script>

<style lang="scss" scoped>
.reportOfTest {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 400px;
  min-width: 200px;

  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .title-of-column {
    text-align: left;
    margin-bottom: 20px;
    margin-left: 100px;
    color: #404040;
  }

  .questions-answer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 30px 30px 30px;
  }

  .right-column {
    .question-number {
      font-weight: bold;
      font-size: 18px;
    }

    .selected-answer {
      color: #404040;
      font-style: normal;
    }
  }

  .left-column {
    .assign-task {
      margin: 0 10px;
      .correct-answer {
        color: green;
      }
      .wrong-answer {
        color: red;
      }
    }

    .change-task {
      margin: 0 10px;
      .correct-answer {
        background-color: red;
        cursor: pointer;
        color: white;
        border-radius: 20px;
        padding: 4px 6px;
        text-align: center;
        font-size: 10px;
      }
      .change-opinion {
        background-color: dodgerblue;
        cursor: pointer;
        color: white;
        border-radius: 20px;
        padding: 4px 6px;
        text-align: center;
        font-size: 10px;
      }
      .wrong-answer {
        background-color: green;
        color: white;
        border-radius: 20px;
        padding: 4px 6px;
        text-align: center;
        font-size: 10px;
        font-style: normal;
      }
    }
  }

  .action-button {
    background: #FF8303;
    color: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    width: 10%;
    float: left;
  }
}
</style>