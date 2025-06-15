import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [
      fsTrees.mkfile('nginx.conf'),
    ]),
  ]),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
    fsTrees.mkfile('file.tmp'),
    fsTrees.mkdir('data'),
  ]),
  fsTrees.mkfile('hosts'),
  fsTrees.mkfile('resolve'),
])

const getFilesCount = (tree) => {
  if (fsTrees.isFile(tree)) {
    return 1
  }

  const children = fsTrees.getChildren(tree)
  const filesCounts = children.map(getFilesCount)
  return _.sum(filesCounts)
}

const getSubdirectoriesInfo = (node) => {
  if (fsTrees.isFile(node)) {
    return 0
  }

  const children = fsTrees.getChildren(node)
  const subdirectoriesInfos = children
    .filter(fsTrees.isDirectory)
    .map(child => ({ name: fsTrees.getName(child), filesCount: getFilesCount(child) }))

  return subdirectoriesInfos
}

console.log(getSubdirectoriesInfo(tree))
