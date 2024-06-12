import * as React from "react";
import liff from "@line/liff";
import { useContext, useEffect, useState } from "react";
import { GetProfile } from "../App";
import { Profile } from "../type/Items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
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
  Modal,
  Backdrop,
  Fade,
  colors,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Navbar() {
  const dataLine = useContext<Profile | null>(GetProfile);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const initLiff = async () => {
      if (liff.isLoggedIn) {
        setIsLogin(liff.isLoggedIn());
      }
    };
    // initLiff();
    setInterval(initLiff, 1500); //delay แสดงการเปลี่ยน navbar หลัง login
  }, []);

  const btnLogin = () => {
    liff.login();
  };

  const btnLogOut = () => {
    console.log("Logout");
    liff.logout();
    window.location.href = "/user";
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToFavPage = () => {
    window.location.href = "/fav";
  };

  // const plsLogin = () => {
  //   setOpenModal(true);
  // }

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <Box sx={{ flexGrow: 1, width: "100dvw" }}>
      <AppBar
        style={{ backgroundColor: "rgba(33, 34, 51, 0.9)" }}
        position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "20px" }} variant="h6" component="div">
            <a className="font-extrabold flex items-center gap-x-2 " href="/">
              <img
                style={{ width: "30px", height: "30px" }}
                src="https://cdn-icons-png.flaticon.com/512/528/528111.png"
                alt="redMushroom"
              />
              GameProductShop
            </a>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={isMobile ? handleMenuOpen : undefined}>
            {isMobile && <MenuIcon />}
          </IconButton>
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
              className="flex gap-x-4 p-4 items-center"
              variant="outlined"
              aria-label="Basic button group">
              {!isLogin ? (
                <>
                  <Avatar
                    alt="Profile Picture"
                    src={dataLine?.pictureUrl}
                    sx={{ mr: 2 }}
                    onClick={() => goToFavPage()}
                  />
                  {/* <button
                    // onClick={() => plsLogin()}
                    className={` p-2 rounded-full bg-red-500`}>
                    <FontAwesomeIcon icon={solidHeart} style={{ color: "white" }} />
                  </button> */}

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
                    onClick={() => goToFavPage()}
                  />
                  <FavoriteIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "30px",
                    }}
                    onClick={() => goToFavPage()}></FavoriteIcon>
                  <Button variant="contained" color="error" onClick={btnLogOut}>
                    LogOut
                  </Button>
                </>
              )}
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
            }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              กรุณา Login
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              คุณต้องเข้าสู่ระบบเพื่อดำเนินการต่อ
            </Typography>
            <Button
              variant="contained"
              style={{ marginTop: '20px' }}
              onClick={btnLogin}>
              Login
            </Button>
          </Box>
        </Fade>
      </Modal> */}
    </Box>
  );
}
