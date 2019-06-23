import React, { Suspense, memo, lazy,useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { Header, Select } from './searchAlgorithms/components'

const LoadedProblems = []
let problemIndex = 0

const IslandGrid = lazy(() => {
  LoadedProblems.push({ value: problemIndex++, label: 'Find An Island' })  
  return import('./searchAlgorithms/components')
})

function App() {
  const [problem, setProblem] = useState()
  useEffect(() => {
    setProblem(LoadedProblems[0])
  }, [LoadedProblems.length])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-body">
        <Header>
          <Select
            long
            value={problem}
            onChange={setProblem}
            options={LoadedProblems}
          />
        </Header>
        <Suspense fallback={<div>Loading...</div>}>
          <IslandGrid />
        </Suspense>        
      </section>
    </div>
  );
}

export default memo(App);
