import React from "react";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

import { Text, Table } from "../../components";
import {
    useGetStationsQuery,
    useGetStationsSlugQuery,
} from "../../service/stations";
import { useGetTrajectoriesSlugQuery } from "../../service/trajectories";
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
    const { slug_station } = useSelector((state) => state.Stations);

    const { data: allStations } = useGetStationsQuery();
    const { data: station, isLoading: isLoadingStation } =
        useGetStationsSlugQuery({ slug: slug_station });
    const { data: trajectorie, isLoadingTrajectorie } =
        useGetTrajectoriesSlugQuery({
            slug: slug_station,
        });

    if (isLoadingStation && isLoadingTrajectorie) {
        return <div>Loading</div>;
    }

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
                    <TrajectoriesDashboard
                        station={station}
                        trajectorie={trajectorie}
                    />
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
