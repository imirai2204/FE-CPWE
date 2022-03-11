import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import UserCardContext from "../../../store/user-card-context";

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
     * Get user info from useContext Hooks to pass:
     * Full Name
     * UserId
     * Email
     * Department
     * Role
     * after user has login successfully
     */
    const userCardCtx = useContext(UserCardContext);

    const fullName = userCardCtx.userInfo.fullName;
    const userId = userCardCtx.userInfo.userId;
    const email = userCardCtx.userInfo.email;
    const department = userCardCtx.userInfo.department;
    const role = userCardCtx.userInfo.userRole;

    return (
        <Card sx={{ boxShadow: 0, textAlign: "center" }}>
            <CardContent sx={{ height: 170, mt: 1, lineHeight: 4 }}>
                <Typography variant='h4' color='text.main' component='div'>
                    {fullName}
                    {dash}
                    {userId}
                </Typography>
                <Typography variant='h5' sx={{ pt: 1.5 }} color='text.secondary'>
                    {email}
                </Typography>
                <Typography
                    variant='h5'
                    sx={{ pt: 1.8, lineHeight: 1.8, fontSize: "1.6rem", fontWeight: 500 }}
                    color='text.secondary'>
                    {department}
                    <br />
                    {role}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
