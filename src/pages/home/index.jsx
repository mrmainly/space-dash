import React from "react";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

import { Text, Table } from "../../components";
import { useGetStationsQuery } from "../../service/stations";
import AntenLocation from "../../components/anten-location-dash";

const Maket = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    width: "100%",
    height: 300,
    color: "black",
}));

const Home = () => {
    const { data } = useGetStationsQuery();

    console.log(data);

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
                <Grid item lg={8}>
                    <Maket sx={{ height: "100%" }}>Карта</Maket>
                </Grid>
                <Grid item lg={4}>
                    <AntenLocation />
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
                    <Table />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
