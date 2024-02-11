/* eslint-disable react/prop-types */
import { TextField } from "@mui/material"
import LoadingButton from "./LoadingButton"

export default function Parameters({
    params,
    onChange,
    onApplyParams
}) {

    return (
        <div id='parameters'>
            {/* DATES */}
            <div className='inputRow'>
                {/* Birth year */}
                <TextField
                    name="birthYear"
                    label="Birth year"
                    variant="outlined"
                    
                    value={params.birthYear}
                    onChange={onChange}
                />

                {/* Lifespan */}
                <TextField
                    name="lifespan"
                    label="Lifespan"
                    variant="outlined"
                    value={params.lifespan}
                    onChange={onChange}
                />
            </div>


            {/* INVESTMENT */}
            <div className='inputRow'>
                {/* Initial capital */}
                <TextField
                    name="initialCapital"
                    label="Initial capital"
                    variant="outlined"
                    value={params.initialCapital}
                    onChange={onChange}
                />

                {/* Monthly savings */}
                <TextField
                    name="monthlySaving"
                    label="Monthly savings"
                    variant="outlined"
                    value={params.monthlySaving}
                    onChange={onChange}
                />
            </div>

            {/* GROWTH */}
            <div className='inputRow'>
                {/* Inflation */}
                <TextField
                    name="inflation"
                    label="Inflation (%)"
                    variant="outlined"
                    value={params.inflation}
                    onChange={onChange}
                />

                {/* Interest rate */}
                <TextField
                    name="interestRate"
                    label="Interest rate (%)"
                    variant="outlined"
                    value={params.interestRate}
                    onChange={onChange}
                />
            </div>

            {/* RETIREMENT */}
            <div className='inputRow'>
                {/* Retirement age */}
                <TextField
                    name="retirementAge"
                    label="Retirement Age"
                    variant="outlined"
                    value={params.retirementAge}
                    onChange={onChange}
                />

                {/* RETIREMENT PENSION */}
                <TextField
                    name="retirementPension"
                    label="Retirement pension (Todays value)"
                    variant="outlined"
                    value={params.retirementPension}
                    onChange={onChange}
                />

                {/* Calculate button */}
                <LoadingButton
                    txt='Calculate'

                    onClick={onApplyParams}
                />
            </div>
        </div>
    )
}