import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { memo } from "react"
import { formatDate, formatMoneyAmount } from "../Helpers/functions"

export default memo(function ResultTable({ data }) {

    console.log('render table')

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Capital</TableCell>
                            <TableCell align="right">Month profit</TableCell>
                            <TableCell align="right">Month saving</TableCell>
                            <TableCell align="right">Capital growth</TableCell>
                            <TableCell align="right">Pension</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.date}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="right">{formatDate(row.date)}</TableCell>
                                <TableCell align="right">{row.year}</TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                                <TableCell align="right">{formatMoneyAmount(row.capital)}</TableCell>
                                <TableCell align="right">{formatMoneyAmount(row.monthProfit)}</TableCell>
                                <TableCell align="right">{formatMoneyAmount(row.monthlySaving)}</TableCell>
                                <TableCell align="right">{formatMoneyAmount(row.capitalGrowth)}</TableCell>
                                <TableCell align="right">{formatMoneyAmount(row.pension)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
})