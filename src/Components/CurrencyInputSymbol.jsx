import { InputAdornment } from "@mui/material"
import { getCurrencySymbol } from "../Helpers/functions"

// Euro symbol for the inputs
export default function CurrencyInputSymbol() {
    return (
        <InputAdornment position="start">{getCurrencySymbol()}</InputAdornment>
    )
}
