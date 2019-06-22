import React, { 
  useState, 
  useEffect, 
  useCallback,
  memo 
} from 'react'
import RSelect from 'react-select'
import styled from 'styled-components'
import inhabitableZoneNum, { universe as initialUniverse, generateRandomUniverse } from './findAnIsland'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: repeat(4, 1fr);
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

export const Select = styled(RSelect)`
  width: ${({ long }) => long ? 15 : 10}rem;
  margin-bottom: 1rem;
`

const Step = styled.div`
  color: black;
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

const MapGrid = memo(({ universe, iZones, visited, step }) => (
  <Grid>
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

const options = [
  { value: 0, label: 'BFS' },
  { value: 1, label: 'DFS' }
]

export default function IslandGrid() {
  const [universe, setUniverse] = useState(initialUniverse)
  const [[iZones, visitAttempted], setZones] = useState([])
  const [{ step, visited }, setVisited] = useState({ step: 0, visited: [] })
  const [selected, setSelected] = useState(options[0])
  useEffect(() => {
    setZones(inhabitableZoneNum(universe, selected.value))
    setVisited({ step: 0, visited: [] })    
  }, [universe, selected])
  useEffect(() => {
    if (visitAttempted && step <= visitAttempted.length) {
      const interval = setInterval(() => {        
        setVisited(({ step, visited }) => {
          const visiting = visitAttempted[step]
          const newVisited = [...visited, visiting]
          return { 
            step: step + 1,
            visited: newVisited 
          }
        })
      }, 500)
      console.log({ step, visited })
      return () => clearInterval(interval)
    }    
  }, [visitAttempted, visited, step])
  return (
    <>
      <Header>
        <UniverseGenerateButton onClick={useCallback(() => {
          const newRandomUniverse = generateRandomUniverse(4, 3)
          setUniverse(newRandomUniverse)
        }, [])}>
          Generate Another Universe!
        </UniverseGenerateButton>
        <Select
          value={selected}
          onChange={setSelected}
          options={options}
        />
        <Step>{`STEP: ${step}`}</Step>
      </Header>
      <MapGrid universe={universe} iZones={iZones} visited={visited} step={step} />
    </>
  )
}