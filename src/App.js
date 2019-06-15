import React, { useState, useReducer, useEffect, useCallback, useMemo, memo } from 'react'
import logo from './logo.svg'
import './App.css'
import inhabitableZoneNum, { universe, visited } from './dfs/dfsSearch'

const initialState = [
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

const MemoizedDropDown = memo(DropDown)

const MapList = ({ zones }) => (
  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
    {zones.map((zone, i) => (
      <span key={i} style={{ color: 'black', fontSize: 12 }}>{zone}</span>
    ))}
  </div>
)

function App() {
  // const [list, dispatch] = useReducer(reducer, initialState)
  const [zones, setZones] = useState([])
  useEffect(() => {
    setZones([...inhabitableZoneNum(universe)])
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-body">
        {/* <MemoizedDropDown 
          list={list}
          dispatch={dispatch}
        /> */}
        <MapList zones={zones} />
      </section>
    </div>
  );
}

export default App;
