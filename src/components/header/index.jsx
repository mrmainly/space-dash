import { AppBar, Container, Box, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

import { Text } from "..";

const NavbarWrapper = styled(AppBar)({
    background: "black",
});

const Navbar = styled(Box)(({ theme }) => ({
    minHeight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // [theme.breakpoints.down("md")]: {
    //     flexDirection: "column",
    //     alignItems: "start",
    // },
}));

const MenuList = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const Item = styled(Link)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
    color: "white",
    textDecoration: "none",
    marginLeft: 5,
}));

const Header = () => {
    const items = [
        {
            label: "Станции",
            path: "/",
        },
        {
            label: "Телеметрия",
            path: "/",
        },
        {
            label: "Снимки",
            path: "/",
        },
        {
            label: "ООО <<ЯКС>>",
            path: "/",
        },
    ];

    return (
        <NavbarWrapper position="relative">
            <Container maxWidth="xl">
                <Navbar>
                    <Box>
                        <img
                            src="/img/logo-opt.svg"
                            alt=""
                            style={{ width: 250 }}
                        />
                    </Box>
                    <MenuList>
                        {items.map((item, index) => (
                            <Item to={item.path} key={index}>
                                <MenuItem>{item.label}</MenuItem>
                            </Item>
                        ))}
                    </MenuList>
                </Navbar>
            </Container>
        </NavbarWrapper>
    );
};

export default Header;
