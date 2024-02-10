import { Button, TextField } from "@mui/material"

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
                    type='number'
                    value={params.birthYear}
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
                    type='number'
                    value={params.initialCapital}
                    onChange={onChange}
                />

                {/* Monthly savings */}
                <TextField
                    name="monthlySaving"
                    label="Monthly savings"
                    variant="outlined"
                    type='number'
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
                    type='number'
                    value={params.inflation}
                    onChange={onChange}
                />

                {/* Interest rate */}
                <TextField
                    name="interestRate"
                    label="Interest rate (%)"
                    variant="outlined"
                    type='number'
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
                    type='number'
                    value={params.retirementAge}
                    onChange={onChange}
                />

                {/* RETIREMENT PENSION */}
                <TextField
                    name="retirementPension"
                    label="Retirement pension (Todays value)"
                    variant="outlined"
                    type='number'
                    value={params.retirementPension}
                    onChange={onChange}
                />
                <Button variant="contained" onClick={onApplyParams}>Calculate</Button>
            </div>
        </div>
    )
}