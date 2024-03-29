/* eslint-disable react/prop-types */
import { Button, InputAdornment, Stack, TextField } from "@mui/material"
import CurrencyInputSymbol from "./CurrencyInputSymbol"
import { COLORS } from "../Helpers/Style"

const INPUT_WIDTH = 200

export default function Parameters({ params, onChange, onApplyParams }) {

    const onEnterPressed = (event) => {
        if (event.key === 'Enter') {
            onApplyParams(event)
        }
    }

    return (
        <Stack spacing={2} sx={{ pt: 5 }}>
            {/* DATES */}
            <Stack spacing={2} direction={"row"}>
                {/* Birth year */}
                <TextField
                    name="birthYear"
                    label="Birth year"
                    variant="outlined"
                    sx={{ width: INPUT_WIDTH }}
                    value={params.birthYear}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />

                {/* Lifespan */}
                <TextField
                    name="lifespan"
                    label="Lifespan"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    value={params.lifespan}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />
            </Stack>

            {/* INVESTMENT */}
            <Stack spacing={2} direction={"row"}>
                {/* Initial capital */}
                <TextField
                    name="initialCapital"
                    label="Initial capital"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <CurrencyInputSymbol />,
                    }}
                    value={params.initialCapital}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />

                {/* Monthly savings */}
                <TextField
                    name="monthlySaving"
                    label="Monthly savings"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <CurrencyInputSymbol />,
                    }}
                    value={params.monthlySaving}
                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />
            </Stack>

            {/* GROWTH */}
            <Stack spacing={2} direction={"row"}>
                {/* Inflation */}
                <TextField
                    name="inflation"
                    label="Inflation"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    value={params.inflation}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />

                {/* Interest rate */}
                <TextField
                    name="interestRate"
                    label="Interest rate"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    value={params.interestRate}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />
            </Stack>

            {/* RETIREMENT */}
            <Stack spacing={2} direction={"row"}>
                {/* Retirement age */}
                <TextField
                    name="retirementAge"
                    label="Retirement Age"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    value={params.retirementAge}

                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />

                {/* Retirement pension */}
                <TextField
                    name="retirementPension"
                    label="Desired retirement pension"
                    sx={{ width: INPUT_WIDTH }}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <CurrencyInputSymbol />,
                    }}
                    value={params.retirementPension}
                    onChange={onChange}
                    onKeyDown={onEnterPressed}
                />
            </Stack>

            {/* Calculation button */}
            <Button
                variant="contained"
                disabled={!params.isParamsUpdated}
                sx={{
                    backgroundColor: COLORS.primaryLight
                }}

                onClick={onApplyParams}
            >
                Calculate
            </Button>
        </Stack>
    )
}
