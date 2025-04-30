import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { formatDate } from "../../util";

const PatientsLookUpTable = ({ patients }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>Patient ID</strong>
                        </TableCell>
                        <TableCell>
                            <strong>First Name</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Surname</strong>
                        </TableCell>
                        <TableCell>
                            <strong>DOB</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Address</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Date Entered</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Doctor Name</strong>
                        </TableCell>
                        <TableCell>
                            <strong>View Records</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient._id}>
                            <TableCell>{patient._id}</TableCell>
                            <TableCell>{patient.patientFirstName}</TableCell>
                            <TableCell>{patient.surname}</TableCell>
                            <TableCell>{formatDate(patient.dob)}</TableCell>
                            <TableCell>{patient.address}</TableCell>
                            <TableCell>
                                {formatDate(patient.createdAt)}
                            </TableCell>
                            <TableCell>{patient.gpName}</TableCell>
                            <TableCell>
                                <Link to={`/patient/${patient._id}`}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<RemoveRedEyeIcon />}
                                    >
                                        View
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatientsLookUpTable;
