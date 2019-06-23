import bfs from './bfsSearch'
import dfs from './dfsSearch'

/** 
 * provide # of uninhabitable zones in the universe
 * 4 types of terrain in the universe: lakes, hills, quicksand, flatland
 * ver 1. lakes, quicksand: uninhabitable <-> hills, flatland
 * 
 * Q. how many zones are inhabitable from given universe?
 */

export const uninhabitables = ['L', 'Q']
export const inhabitables = ['F', 'H']

export const universe = [
  ['L', 'Q', 'F'],
  ['L', 'Q', 'F'],
  ['F', 'F', 'F'],
  ['Q', 'Q', 'Q']
]

export const generateRandomUniverse = (rowNum, colNum) => {
  const terrains = [...uninhabitables, ...inhabitables]  
  return [...Array(rowNum)].reduce((tally, rowUndefined, rowIndex) => {
    const newRow = [...Array(colNum)].map((colUndefined, colIndex) => {
      const randomIndex = Math.floor(Math.random() * terrains.length)
      return terrains[randomIndex]
    })
    tally.push(newRow)
    return tally
  }, [])
}

export const rowAdjCoord = [1, 0, -1, 0]
export const colAdjCoord = [0, -1, 0, 1]

export function isSafe(i, j, v, va, univ, inHabList) {
  if (
    (i >= 0 && i < univ.length) &&
    (j >= 0 && j < univ[i].length) &&
    (!v[i][j] && (inhabitables.includes(univ[i][j])))
  ) {
    va.push(`${i}_${j}`)
    if (!inHabList.includes(`${i}_${j}`)) {
      inHabList.push(`${i}_${j}`)
    }
    return true
  }
}

export default function inhabitableZoneNum(univ, method) {  
  const visitedAttempt = []
  // const uninhabitableZoneList = []
  const inhabitableIslands = []
  const inhabitableZoneList = []
  const visited = univ.map(row => row.map(col => false))
  for (let i = 0; i < univ.length; i++) {
    for (let j = 0; j < univ[i].length; j++) {
      if (!visited[i][j]) {
        visitedAttempt.push(`${i}_${j}`)
        if (inhabitables.includes(univ[i][j])) {
          if (method) {
            dfs(i, j, visitedAttempt, visited, univ, inhabitableZoneList)            
          } else {
            bfs(i, j, visitedAttempt, visited, univ, inhabitableZoneList)   
          }
          inhabitableIslands.push(`${i}_${j}`)
        }      
      }
    }
  }
  console.log({ universe: univ, inhabitableZoneList, visitedAttempt, inhabitableIslands })
  return [inhabitableZoneList, visitedAttempt, inhabitableIslands]
}
