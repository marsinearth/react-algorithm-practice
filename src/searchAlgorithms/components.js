import React, { 
  useState, 
  useEffect, 
  useCallback,
  memo 
} from 'react'
import { useImmerReducer } from 'use-immer'
import RSelect from 'react-select'
import styled from 'styled-components'
import inhabitableZoneNum, { universe as initialUniverse, generateRandomUniverse } from './findAnIsland'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr); 
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  margin: 2rem auto;
  border-left: 1px solid dimgray;
  border-bottom: 1px solid dimgray;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid dimgray;
  border-right: 1px solid dimgray;
  width: 60px;
  height: 60px; 
  background-color: ${({ zoneStatus }) => (
    (!zoneStatus && 'white') ||
    (zoneStatus === 'i' && 'springgreen') ||
    (zoneStatus === 'u' && 'lightcoral') ||
    (zoneStatus === 'v' && 'dimgray')
  )};
  color: ${({ zoneStatus }) => zoneStatus === 'v' ? 'whitesmoke' : 'dimgray'};
`

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto 0 auto;
  height: 3rem;  
`

const DoubleSelectContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 12rem;
`

export const Select = styled(RSelect)`
  width: ${({ long, short }) => (
    (long && 15) ||
    (short && 5) ||
    10
  )}rem;
  margin-bottom: 1rem;
`

const Status = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const StatusText = styled.span`
  color: black;
  margin-bottom: 0.5rem;
`

const UniverseGenerateButton = styled.button`
  display: flex;
  padding: 0.5rem;
  background-color: lightgray;
  color: dimgray;
  font-weight: bold;
  border-radius: 0.2rem;
  border-width: 1px;
  margin-bottom: 1rem;
`

function getZoneStatus(visited, step, iZones, key) {
  let zoneStatus
  if (visited.length) {
    if (visited[step - 1] === key) {
      zoneStatus = 'v'
    } else if (iZones && iZones.includes(key) && visited.includes(key)) {
      zoneStatus = 'i'
    } else if (visited.includes(key)) {
      zoneStatus = 'u'
    }
  }
  return zoneStatus
}

const MapGrid = memo(({ universe, iZones, visited, step, rows, cols }) => (
  <Grid rows={rows} cols={cols}>
    {universe.map((Row, row) => (
      Row.map((cell, col) => {
        const key = `${row}_${col}`
        const zoneStatus = getZoneStatus(visited, step, iZones, key)
        return (          
          <Cell
            key={key}
            col={col}            
            row={row}
            zoneStatus={zoneStatus}    
          >
            {cell}
          </Cell>          
        )
      })
    ))}
  </Grid>
))

const algorithmOptions = [
  { value: 0, label: 'BFS' },
  { value: 1, label: 'DFS' }
]

const selectOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 }
]

const rowColReducer = (draft, action) => {
  const { type, rows, cols } = action
  switch (type) {
    case 'rowSelect':
      draft.rows = { value: rows, label: rows }
      break
    case 'colSelect':
      draft.cols = { value: cols, label: cols }
      break
    default:
      break
  }
}

const initialRowColState = { rows: { value: 4, label: 4 }, cols: { value: 3, label: 3 } }

export default function IslandGrid() {
  const [{ universe, univRows, univCols }, setUniverse] = useState({ 
    universe: initialUniverse, 
    univRows: initialRowColState.rows.value,
    univCols: initialRowColState.cols.value
  })
  const [[iZones, visitAttempted, islands], setZones] = useState([])
  const [{ step, visited, numOfIslands }, setVisited] = useState({ step: 0, visited: [], numOfIslands: 0 })
  const [selected, setSelected] = useState(algorithmOptions[0])
  const [{ rows, cols }, rowColDispatch] = useImmerReducer(rowColReducer, initialRowColState)
  useEffect(() => {
    setZones(inhabitableZoneNum(universe, selected.value))
    setVisited({ step: 0, visited: [], numOfIslands: 0 })
  }, [universe, selected])
  useEffect(() => {
    if (visitAttempted && step <= visitAttempted.length) {
      const interval = setInterval(() => {        
        const visiting = visitAttempted[step]
        const newVisited = [...visited, visiting]
        setVisited({ 
          step: step + 1,
          visited: newVisited,
          numOfIslands: islands.includes(visiting) ? numOfIslands + 1 : numOfIslands
        })
      }, 500)
      return () => clearInterval(interval)
    }    
  }, [visitAttempted, step, islands, visited, numOfIslands])
  console.log({ step, visited, numOfIslands })
  return (
    <>
      <Header>
        <DoubleSelectContainer>
          <Status>
            <StatusText>Rows</StatusText>
            <Select
              short
              value={rows}
              onChange={({ value: rows }) => rowColDispatch({ type: 'rowSelect', rows })}
              options={selectOptions}
            />
          </Status>
          <Status>
            <StatusText>Columns</StatusText>
            <Select
              short
              value={cols}
              onChange={({ value: cols }) => rowColDispatch({ type: 'colSelect', cols })}
              options={selectOptions}
            />
          </Status>
        </DoubleSelectContainer>
        <UniverseGenerateButton onClick={useCallback(() => {
          const univRows = rows.value
          const univCols = cols.value
          const newRandomUniverse = generateRandomUniverse(univRows, univCols)
          setUniverse({ universe: newRandomUniverse, univRows, univCols })
        }, [rows, cols])}>
          Generate Another Universe!
        </UniverseGenerateButton>
        <Select
          value={selected}
          onChange={setSelected}
          options={algorithmOptions}
        />
        <Status>
          <StatusText>{`NUMBER OF ISLANDS: ${numOfIslands}`}</StatusText>
          <StatusText>{`STEP: ${step}`}</StatusText>          
        </Status>
      </Header>
      <MapGrid        
        universe={universe} 
        iZones={iZones} 
        visited={visited} 
        step={step}
        rows={univRows}
        cols={univCols}         
      />
    </>
  )
}