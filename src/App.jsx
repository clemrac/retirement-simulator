import { TextField } from '@mui/material'
import './App.css'
import { useCallback, useMemo, useState } from 'react'
import { get_months_between_years } from './functions'

/**
 * Need to include salary inflation in monthly savings (every years)
 * 
 */

function App() {

  const [state, setState] = useState({
    birthYear: 1995,
    retirementAge: 65,
    initialCapital: 0,
    monthlySaving: 400,
    inflation: 3,
    interestRate: 8,
    retirementPension: 3000,
    retirementExternalIncomes: 1000
  })

  const onChange = useCallback((e) => {
    let name = e.target.name
    let value = e.target.value

    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }, [])

  const monthlyCalculation = useMemo(() => {

    let thisYear = (new Date()).getFullYear()
    let endYear = state.birthYear + 100

    // Get the list of all months on which we will make the calculations
    let months = get_months_between_years(thisYear, endYear)

    let result = []
    let currentCapital

    // Loop each months
    months.forEach((month, index) => {

      // Case first itteration
      if (index === 0) {
        result.push({
          
        })
      }

      // Current capital
      currentCapital = 

    })


  }, [state.birthYear])

  console.log(state)

  return (
    <div id='app'>

      {/* BIRTH YEAR */}
      <TextField
        name="birthYear"
        label="Birth year"
        variant="outlined"
        type='number'
        value={state.birthYear}
        onChange={onChange}
      />

      {/* RETIREMENT AGE */}
      <TextField
        name="retirementAge"
        label="Retirement Age"
        variant="outlined"
        type='number'
        value={state.retirementAge}
        onChange={onChange}
      />

      {/* INITIAL CAPITAL */}
      <TextField
        name="initialCapital"
        label="Initial capital"
        variant="outlined"
        type='number'
        value={state.initialCapital}
        onChange={onChange}
      />

      {/* MONTHLY SAVING */}
      <TextField
        name="monthlySaving"
        label="Monthly savings"
        variant="outlined"
        type='number'
        value={state.monthlySaving}
        onChange={onChange}
      />

      {/* INFLATION */}
      <TextField
        name="inflation"
        label="Inflation (%)"
        variant="outlined"
        type='number'
        value={state.inflation}
        onChange={onChange}
      />

      {/* INTEREST RATE */}
      <TextField
        name="interestRate"
        label="Interest rate (%)"
        variant="outlined"
        type='number'
        value={state.interestRate}
        onChange={onChange}
      />

      {/* RETIREMENT PENSION */}
      <TextField
        name="retirementPension"
        label="Retirement pension (Todays value)"
        variant="outlined"
        type='number'
        value={state.retirementPension}
        onChange={onChange}
      />

      {/* RETIREMENT EXTERNAL INCOMES */}
      <TextField
        name="retirementExternalIncomes"
        label="Retirement external incomes"
        variant="outlined"
        type='number'
        value={state.retirementExternalIncomes}
        onChange={onChange}
      />


    </div>
  )
}

export default App
