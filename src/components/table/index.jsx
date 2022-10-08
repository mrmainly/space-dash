import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Box,
} from "@mui/material";
import { styled } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Arrow = styled(Box)({
    cursor: "pointer",
    transition: "all 0.5s ease",
    color: "#55CD61",
    "&:hover": {
        color: "red",
    },
});
const MyTable = ({ data, navigate_to }) => {
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Время</TableCell>
                        <TableCell align="center">Событие</TableCell>
                        <TableCell align="center">Данные</TableCell>
                        <TableCell align="center">Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length ? (
                        data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {row.id === null ? "Нет" : row.id}
                                </TableCell>
                                <TableCell align="center">
                                    {row.created}
                                </TableCell>
                                <TableCell align="center">
                                    {row.total_price === null
                                        ? "Нет"
                                        : row.total_price}
                                </TableCell>
                                <TableCell align="center">
                                    Лермонтова 38
                                </TableCell>

                                <TableCell align="center">
                                    <Arrow
                                        onClick={() =>
                                            navigate(`${navigate_to}/${row.id}`)
                                        }
                                    >
                                        <ArrowForwardIosIcon />
                                    </Arrow>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell scope="row" align="center">
                                Нет данных
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;
