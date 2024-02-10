import './App.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { addInflationToValue, calculateMonthProfit, deductPensionFromCapital, getCapitalGrowth, getCurrentPension, getNewCapital, getNewMonthlySaving, get_months_between_years, incrementAge, monthData } from './Helpers/functions'
import ResultTable from './Components/Table'
import { INITIAL_DATA } from './Helpers/Constants'
import Parameters from './Components/Parameters'

/**
 * Need to include salary inflation in monthly savings (every years)
 * As well as increase in monthly savings with inflation and salary increase
 * 
 */

function App() {

  const [state, setState] = useState(INITIAL_DATA)
  const [params, setParams] = useState(INITIAL_DATA)

  const onChange = useCallback((e) => {
    let name = e.target.name
    let value = Number.parseInt(e.target.value)

    setParams(prevState => ({
      ...prevState,
      [name]: value
    }))
  }, [])

  const onApplyParams = useCallback(() => {
    setState({ ...params })
  }, [params])

  const monthlyCalculation = useMemo(() => {

    console.log('memo !')

    let thisYear = (new Date()).getFullYear()
    let endYear = state.birthYear + 100

    // Get the list of all months on which we will make the calculations
    let months = get_months_between_years(thisYear, endYear)

    let result = []
    let currentCapital = state.initialCapital
    let monthResult
    let currentAge = thisYear - state.birthYear
    let currentMonthlySaving = state.monthlySaving
    let monthProfit = 0
    let monthlyInterestRate = (state.interestRate / 100) / 12
    let retirementPensionWithInflation = state.retirementPension
    let currentMonthlyPension
    let capitalGrowth

    // Loop on each months
    months.forEach((month, index) => {

      // Here we are at the beginning of the month

      // If I am retired, let's deduct my pension
      currentMonthlyPension = getCurrentPension(currentAge, state.retirementAge, retirementPensionWithInflation)
      currentCapital = deductPensionFromCapital(currentMonthlyPension, currentCapital)

      // Calculate capital growth
      capitalGrowth = getCapitalGrowth(currentCapital, result, index)

      // We count what we have to this day with the profit of last month
      // And put the data in the result object
      monthResult = monthData({
        date: month,
        capital: currentCapital,
        age: currentAge,
        monthlySaving: currentMonthlySaving,
        monthProfit: monthProfit,
        capitalGrowth,
        pension: currentMonthlyPension
      })

      // Add this month result to final result
      result.push(monthResult)

      // Time passes, we are now at the end of the month
      // Take every parameters into account

      // Calculate saving profit for this month
      monthProfit = calculateMonthProfit(currentCapital, monthlyInterestRate)

      // Add profit and monthly savings to capital
      currentCapital = getNewCapital(currentCapital, monthProfit, currentMonthlySaving)

      // Increment age
      currentAge = incrementAge(currentAge, month)

      // Increment monthly savings
      currentMonthlySaving = getNewMonthlySaving(month, currentMonthlySaving, state.inflation, currentAge, state.retirementAge)

      // Add inflation to monthly pension
      retirementPensionWithInflation = addInflationToValue(retirementPensionWithInflation, state.inflation, true)
    })

    return result
  }, [state.birthYear, state.inflation, state.initialCapital, state.interestRate, state.monthlySaving, state.retirementAge, state.retirementPension])

  return (
    <div id='app'>

      <Parameters
        params={params}
        onApplyParams={onApplyParams}
        onChange={onChange}
      />

      <ResultTable
        data={monthlyCalculation}
      />

    </div>
  )
}

export default App
