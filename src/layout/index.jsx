import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/system";

import { Header } from "../components";

const Layout = () => {
    return (
        <Box sx={{ bgcolor: "#201c1c" }}>
            <Header />
            <Box>
                <Container
                    maxWidth="xl"
                    sx={{ mt: 8, background: "#201c1c", color: "white", pb: 8 }}
                >
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
