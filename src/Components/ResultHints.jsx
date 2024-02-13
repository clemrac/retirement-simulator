import { Alert, Stack } from "@mui/material"
import { formatMoneyAmount } from "../Helpers/functions"

/* eslint-disable react/prop-types */
export default function ResultHints({ data }) {
    // If no data
    if (data.length === 0) return null

    let ageNoMoreCapital = null
    let endOfLifeCapital = data[data.length - 1].capital

    // Loop through data to find hints
    data.forEach((month) => {
        // Age no more capital
        if (month.capital <= 0 && ageNoMoreCapital === null) {
            ageNoMoreCapital = month.age
        }
    })

    return (
        <Stack>
            {ageNoMoreCapital ? (
                <Alert severity="info">
                    You will run out of capital at age {ageNoMoreCapital}. <br />
                    Your capital at the end of life is {formatMoneyAmount(endOfLifeCapital)}.
                </Alert>
            ) : (
                <Alert severity="info">
                    You will have an excess of capital of{" "}
                    {formatMoneyAmount(endOfLifeCapital)}.
                </Alert>
            )}
        </Stack>
    )
}
