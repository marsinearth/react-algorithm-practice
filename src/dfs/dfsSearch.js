
/** 
 * provide # of uninhabitable zones in the universe
 * 4 types of terrain in the universe: lakes, hills, quicksand, flatland
 * ver 1. lakes, quicksand: uninhabitable <-> hills, flatland
 * 
 * Q. how many zones are inhabitable from given universe?
 */

export const universe = [
  ['L', 'Q', 'F'],
  ['L', 'Q', 'F'],
  ['F', 'F', 'F'],
  ['Q', 'Q', 'Q']
]

export const visited = universe.map(row => row.map(col => false))
export const visitAttempted = []

const uninhabitables = ['L', 'Q']
const inhabitables = ['F', 'H']
const uninhabitableZoneList = []
const inhabitableZoneList = []
const rowAdjCoor = [1, 0, -1, 0]
const colAdjCoor = [0, -1, 0, 1]

function isSafe(i, j) {
  return (
    (i >= 0 && i < universe.length) &&
    (j >= 0 && j < universe[0].length) &&
    (!visited[i][j] && (inhabitables.includes(universe[i][j]) || uninhabitables.includes(universe[i][j])))
  )
}

function isAllVisited() {
  return visited.every(row => row.every(col => col))
}

function dfs(i, j) {
  visited[i][j] = true
  visitAttempted.push(`${i}_${j}`)
  const isUninhabitable = uninhabitables.includes(universe[i][j])
  const isInhabitable = inhabitables.includes(universe[i][j])
  if (isUninhabitable) {
    uninhabitableZoneList.push(`${i}_${j}`)
  } else if (isInhabitable) {   
    inhabitableZoneList.push(`${i}_${j}`)
  } 
  for (let z = 0; z < 4; z++) {
    const newI = i + rowAdjCoor[z]
    const newJ = j + colAdjCoor[z]  
    if (isSafe(newI, newJ)) {    
        dfs(newI, newJ)
    }
  }
}

export default function inhabitableZoneNum(universe) {
  let step = 0
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[0].length; j++) {
      const isInhabitable = inhabitables.includes(universe[i][j])
      // console.log({ i, j })
      // console.log({ visited: visited[i][j], isUninhabitable })
      step++
      if (!visited[i][j]) {
          dfs(i, j)
          console.log({ i, j, zone: universe[i][j] })
          console.log({ visited, inhabitableZoneList })           
      }
    }
  }
  return [uninhabitableZoneList, inhabitableZoneList]
}
