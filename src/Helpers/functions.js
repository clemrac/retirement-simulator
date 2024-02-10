export function get_months_between_years(startYear, endYear) {
    const months = []

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1))
        }
    }

    return months
}

export function monthData({
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
        pension
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

export function calculateMonthProfit(capital, monthlyRate) {
    return capital * monthlyRate
}

export function getNewCapital(currentCapital, profit, savings) {
    return currentCapital + profit + savings
}

// Each year, take into account the increase in salary -> More saving capabilities
// Increase just by inflation
// Will increase every end of december
export function getNewMonthlySaving(currentDate, currentMonthlySaving, inflation, currentAge, retirementAge) {
    // If retired, no more savings
    if (currentAge >= retirementAge) return 0

    let currentMonth = currentDate.getMonth()

    // End of december, inc saving by inflation
    if (currentMonth === 11) return addInflationToValue(currentMonthlySaving, inflation)

    // Else, return current saving
    return currentMonthlySaving
}

export function getCurrentPension(age, retirementAge, currentMonthlyPension) {

    // If not retired, no pension
    if (age < retirementAge) return 0

    // If retired, return pension
    return currentMonthlyPension
}

export function addInflationToValue(value, inflation, isMonthly) {
    let effectiveInflation = inflation / 100

    // Case monthly inflation
    if (isMonthly) effectiveInflation = effectiveInflation / 12

    return value * (1 + effectiveInflation)
}

export function deductPensionFromCapital(currentMonthlyPension, currentCapital) {
    return currentCapital - currentMonthlyPension
}

export function getCapitalGrowth(currentCapital, currentResult, currentIndex) {

    // if first entry, no growth
    if (currentIndex === 0) return 0

    // Get previous month data
    let previousMonth = currentResult[currentIndex - 1]
    let previousCapital = previousMonth.capital

    return currentCapital - previousCapital
}

export function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'long',
    }

    return date.toLocaleDateString(undefined, options)
}

export function formatMoneyAmount(amount) {
    let formatedAmount = new Intl.NumberFormat(
        undefined,
        {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }
    ).format(amount)

    return formatedAmount
}