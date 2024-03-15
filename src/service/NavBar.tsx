'use client'

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {useRouter} from 'next/navigation'
import {CurrentUser} from "./ServerDetail";

class Page {
    name: string;
    route: string;

    constructor(name: string, route: string) {
        this.name = name;
        this.route = route;
    }
}

const pages: Page[] = [
    new Page("Meta", "meta"),
    new Page("Workspace", "workspace"),
    new Page("Onboarding", "onboard"),
    new Page("Simulate", "simulate"),
];

function NavBar() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [pathname, setPathname] = React.useState<string>("");
    const router = useRouter()
    let username = "";

    React.useEffect(() => {
        let item = localStorage.getItem("user");
        const user: CurrentUser = JSON.parse(item != null ? item : "{}");
        username = user.username;
        setPathname(window.location.pathname);
    }, []);

    const logoutHandler = () => {
        localStorage.clear()
        router.push("/vulcan/login")
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pathChecker = (pathname: string, page: Page): boolean => {
        return pathname.includes(page.route);
    };

    const navigateHandler = (route: string) => {
        router.push(`/vulcan/${route}`);
    }

    return (
        <AppBar
            sx={{backgroundImage: 'linear-gradient(to right, #1e266d, #3a3f9e, #5c69e1)'}}>
            <Toolbar variant="regular" sx={{justifyContent: "space-between", height: "8%", alignItems: "center"}}>
                <Box
                    component="img"
                    sx={{
                        height: "auto",
                        width: 80,
                        mr: 2,
                        py: 2,
                    }}
                    alt="Intics"
                    src={"/intics-logo.webp"}
                ></Box>
                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingLeft: "inherit",
                    }}
                >
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={() => navigateHandler(page.route)}
                            sx={{
                                display: "block",
                                textTransform: "none",
                                borderBottom: pathChecker(pathname, page)
                                    ? "3px solid #fbd01a"
                                    : "none", // Set borderBottom style for active button
                            }}
                        >
                            <Typography
                                textAlign="center"
                                component="div"
                                sx={{
                                    color: "white",
                                    fontWeight: "800",
                                    fontSize: "16px",
                                }}
                            >
                                {page.name}
                            </Typography>
                        </Button>
                    ))}
                </Box>
                <Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt={username}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: "45px"}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={logoutHandler}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
