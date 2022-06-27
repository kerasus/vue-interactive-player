import { Model, Collection } from 'js-abstract-model'

class Task extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'type' }, // question of knowing subject
      { key: 'data' },
      {
        key: 'checked',
        default: false
      },
      {
        key: 'done',
        default: false
      },
      {
        key: 'doing',
        default: false
      },
      {key: 'before_do'},
      {key: 'before_action'},
      {
        key: 'pre_show',
        default: false
      },
      {
        key: 'post_show',
        default: false
      },
    ])
  }

  setChecked () {
    this.checked = true
    this.doing = false
    this.done = false
  }

  setDoing () {
    this.doing = true
    this.done = false
  }

  setDone () {
    this.doing = false
    this.done = true
  }

  canDoBasedOnLegalTime (elapsedTimeOfTimePoint) {
    return (!this.data || !this.data.legal_time || this.data.legal_time >= elapsedTimeOfTimePoint)
  }
}

class TaskList extends Collection {
  model() {
    return Task
  }

  getPreShow () {
    return this.list.find( task => task.pre_show)
  }

  getPostShow () {
    return this.list.find( task => task.post_show)
  }

  hasPreShow () {
    return !!this.getPreShow()
  }

  hasPostShow () {
    return !!this.getPostShow()
  }
}
export { Task, TaskList }
