import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const dash = (
    <Box
        component='span'
        sx={{
            display: "inline-block",
            mx: "5px",
            fontSize: "22px",
        }}>
        -
    </Box>
);

const UserCard = (props) => {
    /**
     * Get user info from Redux Store to retrieve:
     * Full Name
     * UserId
     * Email
     * Department
     * Role
     * After user has login successfully
     */
    const userData = useSelector((state) => state.user.userInfo);

    const fullName = userData.fullName;
    const email = userData.email;
    const departmentName = userData.departmentName;
    const role = userData.userRole;

    return (
        <Card sx={{ boxShadow: 0, textAlign: "center" }}>
            <CardContent sx={{ height: 170, mt: 1, lineHeight: 4 }}>
                <Typography variant='h4' color='text.main' component='div'>
                    {fullName}
                </Typography>
                <Typography variant='h5' sx={{ pt: 1.5 }} color='text.secondary'>
                    {email}
                </Typography>
                <Typography
                    variant='h5'
                    sx={{
                        pt: 1.8,
                        lineHeight: 1.8,
                        fontSize: "1.6rem",
                        fontWeight: 500,
                    }}
                    color='text.secondary'>
                    {departmentName}
                    <br />
                    {role}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
