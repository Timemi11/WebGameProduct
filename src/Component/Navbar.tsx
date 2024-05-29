import * as React from "react";
import liff from "@line/liff";
import { useCallback, useContext, useEffect, useState } from "react";
import { GetProfile } from "../App";
import { User } from "./Model/User";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  ButtonGroup,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from "@mui/material/";

export default function Navbar() {
  const liffId = "2005244347-lY246dm4";
  const dataLine = useContext<User | undefined>(GetProfile);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const initLiff = async () => {
      setIsLogin(liff.isLoggedIn());
    };
    setInterval(initLiff, 1000);
  }, []);

  const btnLogin = useCallback(() => {
    liff.login();
  }, []);

  const goAdminPage = useCallback(() => {
    window.location.href = "/admin";
  }, []);

  const btnLogOut = useCallback(() => {
    console.log("Logout");
    liff.logout();
    window.location.href = "/user";
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{ backgroundColor: "rgba(33, 34, 51, 0.9)" }}
        position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={isMobile ? handleMenuOpen : undefined}>
            {isMobile && <MenuIcon />}
          </IconButton>
          <Typography
            style={{ fontSize: "20px" }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            <a className="font-extrabold flex items-center gap-x-2 " href="/">
              <img
                style={{ width: "30px", height: "30px" }}
                src="https://cdn-icons-png.flaticon.com/512/528/528111.png"
                alt="redMushroom"
              />
              GameProductShop
            </a>
          </Typography>

          {isMobile ? (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              {!isLogin
                ? [
                    <MenuItem key="login" onClick={btnLogin}>
                      Login
                    </MenuItem>,
                    <MenuItem key="avatar">
                      <Avatar
                        alt="Profile Picture"
                        src={dataLine?.pictureUrl}
                        sx={{ mr: 2 }}
                      />
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="admin" onClick={goAdminPage}>
                      Admin
                    </MenuItem>,

                    <MenuItem key="logout" onClick={btnLogOut}>
                      LogOut
                    </MenuItem>,
                    <MenuItem key="img">
                      <img
                        width="50px"
                        height="50px"
                        style={{ borderRadius: "2rem", marginRight: "10px" }}
                        src={dataLine?.pictureUrl}
                        alt="User"
                      />
                    </MenuItem>,
                    <MenuItem key="displayName">
                      <p>{dataLine?.displayName}</p>
                    </MenuItem>,
                  ]}
            </Menu>
          ) : (
            <ButtonGroup
              className="flex gap-x-4 p-4 "
              variant="outlined"
              aria-label="Basic button group">
              {!isLogin ? (
                <>
                  <Avatar
                    alt="Profile Picture"
                    src={dataLine?.pictureUrl}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(104, 66, 255)",
                    }}
                    onClick={btnLogin}>
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <p className="flex items-center ">{dataLine?.displayName}</p>
                  <img
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "2rem", marginRight: "10px" }}
                    src={dataLine?.pictureUrl}
                    alt="User"
                  />
                  <Button variant="contained" color="error" onClick={btnLogOut}>
                    LogOut
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#ef8f2f" }}
                    onClick={goAdminPage}>
                    Admin
                  </Button>
                </>
              )}
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
