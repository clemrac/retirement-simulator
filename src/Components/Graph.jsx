/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts"
import { memo } from "react"
import { COLORS } from "../Helpers/Style"

export default memo(function Graph({ data }) {
    let years = []
    let capitals = []

    // Reverse the array to get the last month of each years
    const dataReversed = [...data].reverse()

    dataReversed.forEach((monthData) => {
        // Check if this year is already included
        if (!years.includes(monthData.year)) {
            years.push(monthData.year)
            capitals.push(monthData.capital)
        }
    })

    // Reverse the result to have in sorted by years
    years = [...years].reverse()
    capitals = [...capitals].reverse()

    return (
        <LineChart
            xAxis={[
                {
                    id: "Years",
                    data: years,
                    label: "Year",
                },
            ]}
            series={[
                {
                    id: "Capitals",
                    label: "Capital",
                    data: capitals,
                    stack: "total",
                    area: true,
                    showMark: false,
                    color: COLORS.primaryLight
                },
            ]}
            width={600}
            height={400}
            margin={{ left: 70 }}
        />
    )
})
