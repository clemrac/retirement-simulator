import { InputAdornment } from "@mui/material"
import { getCurrencySymbol } from "../Helpers/functions"

export default function CurrencyInputSymbol() {
    return (
        <InputAdornment position="start">{getCurrencySymbol()}</InputAdornment>
    )
}
