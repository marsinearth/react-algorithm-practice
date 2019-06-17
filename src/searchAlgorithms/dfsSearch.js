import {
  rowAdjCoord,
  colAdjCoord,
  isSafe
} from '.'

export default function dfs(i, j, va, v) {
  v[i][j] = true
  va.push(`${i}_${j}`)
  for (let z = 0; z < 4; z++) {
    const newI = i + rowAdjCoord[z]
    const newJ = j + colAdjCoord[z]
    if (isSafe(newI, newJ, v)) {    
        dfs(newI, newJ, va, v)
    }
  }
}
