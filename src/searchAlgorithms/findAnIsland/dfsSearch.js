import {
  rowAdjCoord,
  colAdjCoord,
  isSafe
} from '.'

export default function dfs(i, j, va, v, u, inHabList) {
  if (!inHabList.includes(`${i}_${j}`)) {
    inHabList.push(`${i}_${j}`)
  }
  v[i][j] = true
  for (let z = 0; z < 4; z++) {
    const newI = i + rowAdjCoord[z]
    const newJ = j + colAdjCoord[z]
    if (isSafe(newI, newJ, v, va, u, inHabList)) {    
      dfs(newI, newJ, va, v, u, inHabList)
    }
  }
}
