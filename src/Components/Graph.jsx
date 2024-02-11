/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts"
import { memo } from "react"

export default memo(function Graph({ data }) {

    const years = []
    const capitals = []

    data.forEach(monthData => {

        // Check if this year is already included
        if (!years.includes(monthData.year)) {
            years.push(monthData.year)
            capitals.push(monthData.capital)
        }
    })

    return (
        <LineChart
            xAxis={[
                {
                    id: 'Years',
                    data: years,
                    label: 'Year'
                },
            ]}
            series={[
                {
                    id: 'Capitals',
                    label: 'Capital',
                    data: capitals,
                    stack: 'total',
                    area: true,
                    showMark: false,
                },
            ]}
            width={600}
            height={400}
            margin={{ left: 70 }}
        />
    )
})