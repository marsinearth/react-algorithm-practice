import React, { 
  useState, 
  useReducer, 
  useEffect, 
  useCallback, 
  useMemo, 
  memo 
} from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import './App.css'
import inhabitableZoneNum, { universe as initialUniverse, visited, visitAttempted } from './dfs/dfsSearch'

/* const initialState = [
  {
    title: 'javaScript',
    checked: false
  },
  {
    title: 'typeScript',
    checked: false
  },
  {
    title: 'react.js',
    checked: false
  },
  {
    title: 'redux.js',
    checked: false
  },
  {
    title: 'styled-components.js',
    checked: false
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'select':
        return [
          ...state.filter(({ title }) => title !== action.title),
          {
            title: action.title,
            checked: true
          }
        ]
    case 'deselect':
      return [
        ...state.filter(({ title }) => title !== action.title),
        {
          title: action.title,
          checked: false
        }
      ]
    default:
      return state
  }
} 

function DropDown({ list, dispatch }) {  
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
        <span>DropDown Sample List</span>
      </div>
      <div style={{ display: 'flex', flex: 4, flexDirection: 'row '}}>
        <ul className="App-list">
          {list.filter(({ checked }) => !checked).map(({ title }) => (
            <li 
              key={title} 
              onClick={() => dispatch({ type: 'select', title })}
              style={{ cursor: 'point' }}
            >
              {title}
            </li>
          ))}
        </ul>
        <ul className="App-list" style={{ color: 'red' }}>
          {list.filter(({ checked }) => checked).map(({ title }) => (
            <li 
              key={title} 
              onClick={() => dispatch({ type: 'select', title })}
              style={{ cursor: 'point' }}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 

const MemoizedDropDown = memo(DropDown) */

function mapReducer(state, action) {
  switch (action.type) {
    case 'setZone':
      return [
        ...state,
        ...action.payload
      ]
    default:
      return state
  }
}

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
    (zoneStatus === 'u' && 'lightcoral')
  )};
  color: dimgray;
`

const StepContainer = styled.div`
  margin: 1rem auto 0 auto;
  height: 1rem;
  color: black;
`

const StepDisplayer = ({ step }) => (
  <StepContainer>{`STEP: ${step}`}</StepContainer>
)

const MapGrid = ({ universe, uZones, iZones }) => (
  <Grid>
    {universe.map((Row, row) => (
      Row.map((cell, col) => {
        const key = `${row}_${col}`
        let zoneStatus
        if (iZones && iZones.includes(key)) {
          zoneStatus = 'i'
        } else if (uZones && uZones.includes(key)) {
          zoneStatus = 'u'
        }
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
) 

const MapList = ({ v, va }) => (
  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
    {/* zones.map((zone, i) => (
      <span key={i} style={{ color: 'black', fontSize: 12 }}>{zone}</span>
    ))*/}
    {`visited: ${String(visited)}\nvisitAttempted: ${String(visitAttempted)}`}
  </div>
)

function App() {
  // const [list, dispatch] = useReducer(reducer, initialState)
  const [{ step, universe }, setU] = useState({ step: 0, universe: initialUniverse })
  const [[uZones, iZones], setZones] = useState([])
  useEffect(() => {
    setZones(inhabitableZoneNum(universe))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-body">
        <StepDisplayer step={step} />
        <MapList v={visited} va={visitAttempted} />
        <MapGrid universe={universe} iZones={iZones} uZones={uZones} />
      </section>
    </div>
  );
}

export default App;
