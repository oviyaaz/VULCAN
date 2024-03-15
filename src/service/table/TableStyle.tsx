import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell: any = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#DEEDFF",
        // background: "linear-gradient(180deg, #0484c4, white)",
        color: "#1C1C1C",
        fontSize: 16,
        fontWeight: 700,
        padding: "10px 16px 8px 16px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd,even)": {
        borderCollapse: 'separate',
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
