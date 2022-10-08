import React from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const MyText = ({ children, lg, md, xs, sm, xl, ...props }) => {
    const Text = styled(Typography)(({ theme }) => ({
        [theme.breakpoints.down("lg")]: {
            fontSize: lg && lg,
        },
        [theme.breakpoints.down("xl")]: {
            fontSize: xl && xl,
        },
        [theme.breakpoints.down("md")]: {
            fontSize: md && md,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: sm && sm,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: xs && xs,
        },
    }));
    return <Text {...props}>{children}</Text>;
};

export default MyText;
