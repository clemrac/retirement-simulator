import "./App.css"
import { useState } from "react"
import ResultTable from "./Components/Table"
import { INITIAL_PARAMS } from "./Helpers/Constants"
import Parameters from "./Components/Parameters"
import { getMonthlyCalculation } from "./Helpers/functions"
import ResultHints from "./Components/ResultHints"
import Graph from "./Components/Graph"
import { Box, Stack } from "@mui/material"
import AppHeader from "./Components/AppHeader"

/**
 * Need to include salary inflation in monthly savings (every years)
 * As well as increase in monthly savings with inflation and salary increase
 */

function App() {
    const [params, setParams] = useState(INITIAL_PARAMS)

    // Runs the function only once on first render. Won't be triggered on next renders.
    const [result, setResult] = useState(() =>
        getMonthlyCalculation(INITIAL_PARAMS)
    )

    // On change function for Parameters (only numbers)
    const onChange = (e) => {
        let name = e.target.name
        let value = e.target.value ? Number.parseInt(e.target.value) : ""

        setParams((prevState) => ({
            ...prevState,
            [name]: value,
            isParamsUpdated: true,
        }))
    }

    // Apply parameters and run calculation
    const onApplyParams = () => {
        let result = getMonthlyCalculation({ ...params })
        setResult(result)
        setParams((prevState) => ({
            ...prevState,
            isParamsUpdated: false,
        }))
    }

    return (
        <Box>
            <AppHeader />

            <Stack sx={{ px: 4, pt: 1 }} spacing={2}>
                <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap" }}>
                    <Parameters
                        params={params}
                        onApplyParams={onApplyParams}
                        onChange={onChange}
                    />

                    <Graph data={result} />
                </Stack>

                <ResultHints data={result} />

                <ResultTable data={result} />
            </Stack>
        </Box>
    )
}

export default App
