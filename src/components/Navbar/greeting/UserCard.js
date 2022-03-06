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
            mx: "6px",
            fontSize: "18px",
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

    const fullName = "Full Name"; //userCardCtx.userInfo.fullName
    const userId = "UserID"; //userCardCtx.userInfo.userId
    const email = "Email@email.com"; //userCardCtx.userInfo.email
    const department = "User Department"; //userCardCtx.userInfo.department
    const role = "User Role"; //userCardCtx.userInfo.role

    return (
        <Card sx={{ boxShadow: 0, textAlign: "center" }}>
            <CardContent sx={{ height: 180 }}>
                <Typography sx={{ mt: 1 }} color='text.main' component='div'>
                    {fullName}
                    {dash}
                    {userId}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color='text.secondary'>
                    {email}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    {department}
                    <br />
                    {role}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
