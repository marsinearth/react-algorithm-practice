import {
  rowAdjCoord,
  colAdjCoord,
  isSafe
} from '.'

export default function bfs(i, j, va, v) {
  const queue = []
  queue.push(`${i}_${j}`)
  v[i][j] = true
  va.push(`${i}_${j}`)
  while (queue.length) {
    const popped = queue.pop()   
    const [k, l] = popped.split('_')
    for (let z = 0; z < 4; z++) {
      const newK = Number(k) + colAdjCoord[z]
      const newL = Number(l) + rowAdjCoord[z]
      if (isSafe(newK, newL, v)) {    
        queue.push(`${newK}_${newL}`)
        v[newK][newL] = true
        va.push(`${newK}_${newL}`)
      }
    }
  }
}
