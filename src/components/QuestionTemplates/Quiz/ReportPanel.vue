<template>
  <div class="reportOfTest">
    <div class="title">
      <span>نتیجه ی </span>
      <span> {{ title ? title : 'آزمون'}}</span>
    </div>

    <div class="title-of-column"> دیدن فیلم</div>

    <div
        v-for="(question , index ) in customQuestions.list"
        :key="index + timestampKey"
        class="questions-answer"
    >
      <div class="choices-title-column">
        <span class="question-number" v-text="(index + 1) + '. '" />
        <span v-if="question.choices.getSelectedNumber()" class="selected-answer" v-text="'گزینه ی ' + question.choices.getSelectedNumber()" />
        <span v-else class="selected-answer" v-text="'پاسخ نداده '" />
        <span class="answer-icon">
          <i v-if="question.choices.hasTrueSelected()" name="mdi-check"/>
          <i v-else name="mdi-close"/>
        </span>
      </div>
      <div class="action-column">

        <span
            class="assign-task"
            :class="{'correct-answer': question.choices.hasTrueSelected(), 'wrong-answer': !question.choices.hasTrueSelected()}"
        >
          <span v-if="question.choices.hasTrueSelected()"> لازم نیست </span>
          <span v-else>باید ببینی</span>
        </span>

        <span
          class="change-task"
          :class="{
             'correct-answer': question.choices.hasTrueSelected() && !question.haveToSee,
             'wrong-answer': !question.choices.hasTrueSelected(),
             'change-opinion': question.choices.hasTrueSelected()&& question.haveToSee}"
          @click="toggleHaveToSee(question)"
        >
          <span v-if="question.choices.hasTrueSelected() && !question.haveToSee">میخوام ببینم</span>
          <span v-if="!question.choices.hasTrueSelected() && question.haveToSee">
            نه سوتی دادم
          </span>
          <span
              v-if="question.choices.hasTrueSelected() && question.haveToSee"
              class="change-opinion"
          >
            بیخیال نمیبینم
          </span>

        </span>
      </div>
    </div>
    <div>
      <span
          class="action-button"
          @click="actionOfReport"
      >
        <span v-if="pauseTimer">تماشا</span>
        <span v-else>{{hours  + ':' +  minutes + ':' +  seconds }}</span>
    </span>
    </div>
  </div>
</template>

<script>

import {QuestionList} from '../../../models/Question'

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
    },
    startTimer: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      timestampKey: Date.now(),
      timeForWait: 0
    }
  },

  watch: {
    startTimer() {
      if(this.startTimer) {
        this.calculateWaitingTime()
        this.secondsDownCounter()
      }
    }
  },

  computed : {
    taskIds () {
      return this.getTaskIdsOfSelectedChoices(this.customQuestions)
    },

    customQuestions () {
      return this.loadQuestions(this.questions)
    },

    pauseTimer () {
      return !this.seconds
    },

    minutes () {
      return parseInt(this.timeForWait / 60)
    },

    hours () {
      return parseInt(this.minutes / 60)
    },

    seconds () {
      return this.timeForWait - (this.hours * this.minutes)
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

    setHaveToSee (questions) {
     questions.list.forEach(question => {
        question.haveToSee = !question.choices.hasTrueSelected()
      })
    },

    loadQuestions(questions) {
      this.setHaveToSee(questions)
      return questions
    },

    calculateWaitingTime () {
      this.timeForWait = this.questions.list.length * 3
    },

    secondsDownCounter () {
        setTimeout(() => {
          this.timeForWait--
          if(this.timeForWait > 0) {
            this.secondsDownCounter()
          }
          if(this.timeForWait === 0) {
            this.actionOfReport()
          }
        }, 1000)
      },

    refreshList () {
      this.timestampKey = Date.now()
    },

    toggleHaveToSee (question) {
      if (!question.choices.hasTrueSelected()) {
        return
      }
      this.refreshList()
      question.haveToSee = !question.haveToSee
      // this.opinionChange[index] = !question.haveToSee

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
    font-size: 20px !important;
    font-weight: bold !important;
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

  .choices-title-column {
    .question-number {
      font-weight: bold !important;
      font-size: 18px !important;
    }

    .selected-answer {
      color: #404040;
      font-style: normal;
    }
  }

  .action-column {
    .assign-task {
      margin: 0 10px;
      &.correct-answer {
        color: green;
      }
      &.wrong-answer {
        color: red;
      }
    }

    .change-task {
      margin: 0 10px;
      color: white;
      border-radius: 20px;
      padding: 4px 6px;
      text-align: center;
      font-size: 10px;
      &.correct-answer {
        background-color: red;
        cursor: pointer;
      }
      &.change-opinion {
        background-color: dodgerblue;
        cursor: pointer;
      }
      &.wrong-answer {
        background-color: green;
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
  }
}
</style>