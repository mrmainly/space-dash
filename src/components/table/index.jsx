import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Button,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { stations_slice } from "../../reducers/stations_slice";

const MyTable = ({ data }) => {
    const { changeStation } = stations_slice.actions;

    const dispatch = useDispatch();

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
                                ></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>

                                <TableCell align="center">
                                    <Button
                                        onClick={() =>
                                            changeStation(dispatch(row.slug))
                                        }
                                    >
                                        добавить новый slug
                                    </Button>
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
