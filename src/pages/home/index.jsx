import React from "react";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

import { Text, Table } from "../../components";
import { useGetStationsQuery } from "../../service/stations";
import TrajectoriesDashboard from "../../components/trajectories-dashboard";

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
    const { data: allStations, isFetching } = useGetStationsQuery();

    console.log(allStations);

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
                    <TrajectoriesDashboard />
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
                    <Table data={allStations?.results} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
