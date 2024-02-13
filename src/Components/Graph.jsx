/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts"
import { memo } from "react"
import { COLORS } from "../Helpers/Style"
import { Box } from "@mui/material"

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
        <Box sx={{ flex: 1, minWidth: 600 }}>
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
                        color: COLORS.primaryLight,
                    },
                ]}
                height={400}
                margin={{ left: 70 }}
            />
        </Box>
    )
})
