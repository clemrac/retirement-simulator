// List all the months between 2 dates
export function getMonthsBetweenYears(startYear, endYear) {
    const months = []

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1))
        }
    }

    return months
}

// Month data object with all the values related to one month
export function monthDataObj({
    date,
    capital,
    age,
    monthlySaving,
    monthProfit,
    capitalGrowth,
    pension,
}) {
    return {
        date,
        capital,
        age,
        year: date.getFullYear(),
        monthlySaving,
        monthProfit,
        capitalGrowth,
        pension,
    }
}

// If we are at the end of december, increment age
export function incrementAge(currentAge, currentDate) {
    let currentMonth = currentDate.getMonth()

    // End of december, inc age
    if (currentMonth === 11) return currentAge + 1

    // Else, return current age
    return currentAge
}

// Add growth to capital every months
export function calculateMonthProfit(capital, monthlyRate) {
    return capital * monthlyRate
}

// Add all monthly incomes to capital
export function getNewCapital(currentCapital, profit, savings) {
    return currentCapital + profit + savings
}

// Each year, take into account the increase in salary -> More saving capabilities
// Increases with inflation
// Will increase at every end of december (Based on a possible increase of salary)
export function getNewMonthlySaving(
    currentDate,
    currentMonthlySaving,
    inflation,
    currentAge,
    retirementAge
) {
    // If retired, no more savings
    if (currentAge >= retirementAge) return 0

    let currentMonth = currentDate.getMonth()

    // End of december, inc saving by inflation
    if (currentMonth === 11)
        return addInflationToValue(currentMonthlySaving, inflation)

    // Else, return current saving
    return currentMonthlySaving
}

// Get the pension amount if retirement age is reached
export function getCurrentPension(age, retirementAge, currentMonthlyPension) {
    // If not retired, no pension
    if (age < retirementAge) return 0

    // If retired, return pension
    return currentMonthlyPension
}

// Increase a value by the inflation rate
export function addInflationToValue(value, inflation, isMonthly) {
    let effectiveInflation = inflation / 100

    // Case monthly inflation
    if (isMonthly) effectiveInflation = effectiveInflation / 12

    return value * (1 + effectiveInflation)
}

export function deductPensionFromCapital(
    currentMonthlyPension,
    currentCapital
) {
    return currentCapital - currentMonthlyPension
}

// Get the capital difference between the month at currentIndex and the previous month
export function getCapitalGrowth(currentCapital, currentResult, currentIndex) {
    // if first entry, no growth
    if (currentIndex === 0) return 0

    // Get previous month data
    let previousMonth = currentResult[currentIndex - 1]
    let previousCapital = previousMonth.capital

    return currentCapital - previousCapital
}

// Format data for the table (month YYYY)
export function formatDate(date) {
    const options = {
        year: "numeric",
        month: "long",
    }

    return date.toLocaleDateString(undefined, options)
}

// Get a money amount in string like '1 123 323 E'
export function formatMoneyAmount(amount) {
    let formatedAmount = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(amount)

    return formatedAmount
}

// Get the app data to build the table and the curve
export function getMonthlyCalculation({
    birthYear,
    inflation,
    initialCapital,
    interestRate,
    lifespan,
    monthlySaving,
    retirementAge,
    retirementPension,
}) {
    let thisYear = new Date().getFullYear()
    let endYear = birthYear + lifespan
    let result = []
    let monthResult
    let currentCapital = initialCapital
    let currentAge = thisYear - birthYear
    let currentMonthlySaving = monthlySaving
    let currentMonthlyPension
    let monthProfit = 0
    let monthlyInterestRate = interestRate / 100 / 12
    let retirementPensionWithInflation = retirementPension
    let capitalGrowth

    // Get the list of all months on which we will make the calculations
    let months = getMonthsBetweenYears(thisYear, endYear)

    // Loop on each months
    months.forEach((month, index) => {
        // Here we are at the beginning of the month

        // If I am retired, let's deduct my pension
        currentMonthlyPension = getCurrentPension(
            currentAge,
            retirementAge,
            retirementPensionWithInflation
        )

        currentCapital = deductPensionFromCapital(
            currentMonthlyPension,
            currentCapital
        )

        // Calculate capital growth
        capitalGrowth = getCapitalGrowth(currentCapital, result, index)

        // We removed the possible pension and all expenses
        // Now we can count what we have left to this day with the profit of last month
        // And put the data in the result object
        monthResult = monthDataObj({
            date: month,
            capital: currentCapital,
            age: currentAge,
            monthlySaving: currentMonthlySaving,
            monthProfit: monthProfit,
            capitalGrowth,
            pension: currentMonthlyPension,
        })

        // Add this month result to final result
        result.push(monthResult)

        // Time passes, we are now at the end of the month
        // Take every parameters into account

        // Calculate saving profit for this month
        monthProfit = calculateMonthProfit(currentCapital, monthlyInterestRate)

        // Add profit and monthly savings to capital
        currentCapital = getNewCapital(
            currentCapital,
            monthProfit,
            currentMonthlySaving
        )

        // Increment age
        currentAge = incrementAge(currentAge, month)

        // Increment monthly savings
        currentMonthlySaving = getNewMonthlySaving(
            month,
            currentMonthlySaving,
            inflation,
            currentAge,
            retirementAge
        )

        // Add inflation to monthly pension
        retirementPensionWithInflation = addInflationToValue(
            retirementPensionWithInflation,
            inflation,
            true
        )
    })

    return result
}

// Foramt the value of the table cells based on their types
export function formatTableCellValue(row, column) {
    let label = row[column.dataKey]

    switch (column.type) {
        case "currency":
            label = formatMoneyAmount(label)
            break
        case "date":
            label = formatDate(label)
            break
        default:
            break
    }

    return label
}

// Returns the Euro symbol
export function getCurrencySymbol() {
    return (0)
        .toLocaleString(undefined, {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        .replace(/\d/g, "")
        .trim()
}
