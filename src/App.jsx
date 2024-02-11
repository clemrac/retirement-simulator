import './App.css'
import { useCallback, useState } from 'react'
import ResultTable from './Components/Table'
import { INITIAL_PARAMS } from './Helpers/Constants'
import Parameters from './Components/Parameters'
import { getMonthlyCalculation } from './Helpers/functions'
import ResultHints from './Components/ResultHints'
import Graph from './Components/Graph'

/**
 * Need to include salary inflation in monthly savings (every years)
 * As well as increase in monthly savings with inflation and salary increase
 * 
 */

function App() {

  const [params, setParams] = useState(INITIAL_PARAMS)
  const [result, setResult] = useState([])

  const onChange = useCallback((e) => {
    let name = e.target.name
    let value = e.target.value ? Number.parseInt(e.target.value) : ''

    setParams(prevState => ({
      ...prevState,
      [name]: value
    }))
  }, [])

  const onApplyParams = useCallback(async () => {
    let result = getMonthlyCalculation({ ...params })
    setResult(result)
  }, [params])

  console.log(result)
  return (
    <div id='app'>

      <Parameters
        params={params}
        onApplyParams={onApplyParams}
        onChange={onChange}
      />

      <ResultHints
        data={result}
      />

      <Graph data={result} />

      <ResultTable
        data={result}
      />

    </div>
  )
}

export default App
