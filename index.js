import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [
    fsTrees.mkfile('ls'),
    fsTrees.mkfile('cat'),
  ]),
])

const getNodesCount = (tree) => {
  if (fsTrees.isFile(tree)) {
    return 1
  }

  const children = fsTrees.getChildren(tree)
  const descendantCounts = children.map(getNodesCount)
  return 1 + _.sum(descendantCounts)
}

console.log(getNodesCount(tree))
