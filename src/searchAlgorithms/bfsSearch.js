import {
  universe,
  uninhabitables,
  inhabitables,
  uninhabitableZoneList,
  inhabitableZoneList,
  rowAdjCoord,
  colAdjCoord,
  isSafe
} from '.'

export default function bfs(i, j, va, v) {
  v[i][j] = true
  va.push(`${i}_${j}`)
  if (uninhabitables.includes(universe[i][j])) {
    uninhabitableZoneList.push(`${i}_${j}`)
  } else if (inhabitables.includes(universe[i][j])) {   
    inhabitableZoneList.push(`${i}_${j}`)
  } 
  for (let z = 0; z < 4; z++) {
    const newI = i + colAdjCoord[z]
    const newJ = j + rowAdjCoord[z]
    if (isSafe(newI, newJ, v)) {    
        bfs(newI, newJ, va, v)
    }
  }
}
