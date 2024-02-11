import { AppBar, Toolbar, Typography } from "@mui/material"
import InsightsIcon from "@mui/icons-material/Insights"
import { COLORS } from "../Helpers/Style"

export default function AppHeader() {
    return (
        <AppBar position="static" sx={{ backgroundColor: COLORS.primary }}>
            <Toolbar>
                <InsightsIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="div">
                    Retirement Saving Simulator
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
