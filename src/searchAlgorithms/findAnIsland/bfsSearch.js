import {
  rowAdjCoord,
  colAdjCoord,
  isSafe
} from '.'

export default function bfs(i, j, va, v, u, inHabList) {
  const queue = []
  queue.push(`${i}_${j}`)
  console.log('queue pushed!')
  console.log({ queue: JSON.stringify(queue) })
  inHabList.push(`${i}_${j}`)
  v[i][j] = true
  while (queue.length) {
    const popped = queue.pop()
    console.log('queue popped!')
    console.log({ queue: JSON.stringify(queue) })
    const [k, l] = popped.split('_')    
    for (let z = 0; z < 4; z++) {
      const newK = Number(k) + rowAdjCoord[z]
      const newL = Number(l) + colAdjCoord[z]
      if (isSafe(newK, newL, v, va, u, inHabList)) {    
        queue.push(`${newK}_${newL}`)
        console.log('queue pushed!')
        console.log({ queue: JSON.stringify(queue) })
        v[newK][newL] = true
      }
    }
  }
}
