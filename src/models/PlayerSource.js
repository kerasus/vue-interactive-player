import { Model, Collection } from 'js-abstract-model'

class PlayerSource extends Model {
  constructor(data) {
    super(data, [
      { key: 'src' },
      { key: 'type' },
      { key: 'res' },
      { key: 'label' },
    ])
  }
}

class PlayerSourceList extends Collection {
  model() {
    return PlayerSource
  }
}
export { PlayerSource, PlayerSourceList }
