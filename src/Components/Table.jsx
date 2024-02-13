/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import React, { memo } from "react"
import { TableVirtuoso } from "react-virtuoso"
import { formatTableCellValue } from "../Helpers/functions"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

// Virtuoso virtualized table display
const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table
            {...props}
            sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
    ),
    TableHead,
    TableRow: ({ ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
}

const COLUMNS = [
    {
        label: "Date",
        dataKey: "date",
        type: "date",
    },
    {
        label: "Year",
        dataKey: "year",
        type: "number",
    },
    {
        label: "Age",
        dataKey: "age",
        type: "number",
    },
    {
        label: "Capital",
        dataKey: "capital",
        type: "currency",
    },
    {
        label: "Month profit",
        dataKey: "monthProfit",
        type: "currency",
    },
    {
        label: "Month saving",
        dataKey: "monthlySaving",
        type: "currency",
    },
    {
        label: "Capital growth",
        dataKey: "capitalGrowth",
        type: "currency",
    },
    {
        label: "Pension",
        dataKey: "pension",
        type: "currency",
    },
]

function FixedTableHeader() {
    return (
        <TableRow>
            {COLUMNS.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: "background.paper",
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    )
}

function CustomTableRow(_index, row) {
    return (
        <React.Fragment>
            {COLUMNS.map((column) => (
                <TableCell key={column.dataKey}>
                    {formatTableCellValue(row, column)}
                </TableCell>
            ))}
        </React.Fragment>
    )
}

export default memo(function ResultTable({ data }) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>Show full details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Paper style={{ height: 400, width: "100%" }}>
                    <TableVirtuoso
                        data={data}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={FixedTableHeader}
                        itemContent={CustomTableRow}
                    />
                </Paper>
            </AccordionDetails>
        </Accordion>
    )
})
