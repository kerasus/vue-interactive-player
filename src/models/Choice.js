import { Model, Collection } from 'js-abstract-model'

class Choice extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'label' },
      { key: 'value' },
      {
        key: 'selected',
        default: false
      },
      { key: 'task_id' },
    ])
  }
}

class ChoiceList extends Collection {
  model() {
    return Choice
  }

  getSelected () {
    return this.list.find( choice => choice.selected)
  }

  clearSelected () {
    this.list.forEach( choice => choice.selected = false)
  }
}
export { Choice, ChoiceList }
