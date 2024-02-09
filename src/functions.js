export function get_months_between_years(startYear, endYear) {
    const months = []

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            months.push(new Date(year, month, 1))
        }
    }

    return months
}