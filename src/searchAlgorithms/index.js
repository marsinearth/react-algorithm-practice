import bfs from './bfsSearch'
import dfs from './dfsSearch'

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

export const uninhabitables = ['L', 'Q']
export const inhabitables = ['F', 'H']
export const uninhabitableZoneList = []
export const inhabitableZoneList = []
export const rowAdjCoord = [1, 0, -1, 0]
export const colAdjCoord = [0, -1, 0, 1]

export function isSafe(i, j, v) {
  return (
    (i >= 0 && i < universe.length) &&
    (j >= 0 && j < universe[0].length) &&
    (!v[i][j] && (inhabitables.includes(universe[i][j]) || uninhabitables.includes(universe[i][j])))
  )
}

export default function inhabitableZoneNum(universe, method) {
  const visitedAttempt = []
  const visited = universe.map(row => row.map(col => false))
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[0].length; j++) {
      if (!visited[i][j]) {
        if (method) {
          dfs(i, j, visitedAttempt, visited)   
        } else {
          bfs(i, j, visitedAttempt, visited)   
        }          
      }
    }
  }
  return [uninhabitableZoneList, inhabitableZoneList, visitedAttempt]
}
