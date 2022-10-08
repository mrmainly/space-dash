import React from "react";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

import { Text } from "../../components";

const Maket = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    width: "100%",
    height: 300,
}));

const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Text variant="h4">МАИ-РСЯ-01</Text>
            <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid item lg={7}>
                    <Maket />
                </Grid>
                <Grid item lg={5}>
                    <Maket />
                </Grid>
                <Grid item lg={4}>
                    <Maket />
                </Grid>
                <Grid item lg={4}>
                    <Maket />
                </Grid>
                <Grid item lg={4}>
                    <Maket />
                </Grid>
                <Grid item lg={12}>
                    <Maket />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
