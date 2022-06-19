import { Model, Collection } from 'js-abstract-model'

class Task extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'type' }, // question of knowing subject
      { key: 'data' },
      { key: 'done' },
      {
        key: 'preShow',
        default: false
      },
      {
        key: 'postShow',
        default: false
      },
    ])
  }
}

class TaskList extends Collection {
  model() {
    return Task
  }

  getPreShow () {
    return this.list.find( task => task.preShow)
  }

  getPostShow () {
    return this.list.find( task => task.postShow)
  }

  hasPreShow () {
    return !!this.getPreShow()
  }

  hasPostShow () {
    return !!this.getPostShow()
  }
}
export { Task, TaskList }
