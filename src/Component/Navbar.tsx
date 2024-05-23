import * as React from 'react';
import liff from '@line/liff';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GetProfile } from '../App';
import { User } from './Model/User';
import MenuIcon from '@mui/icons-material/Menu';
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
} from '@mui/material/';


export default function Navbar() {
  const liffId = '2005244347-lY246dm4';
  const dataLine = useContext<User | undefined>(GetProfile);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sendMessageToLine = async () => {
    try {
      const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Bearer ต่อด้วย  Channel access token ของ messagesing api
          Authorization:
            'Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=',
        },
        body: JSON.stringify({
          // to : userId
          to: 'Uee534050cb274b81e66a9f0333932612',
          messages: [
            {
              type: 'text',
              text: 'ส่งข้อความ',
            },
          ],
        }),
      });

      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    }
  };

  // useEffect(() => {
  //   sendMessageToLine();
  // }, []);

  useEffect(() => {
    // Initialize LIFF SDK
    const initLiff = async () => {
      try {
        await liff.init({ liffId });
        setIsLogin(liff.isLoggedIn());
      } catch (error) {
        console.error('LIFF initialization failed', error);
      }
    };
    initLiff();
  }, [isLogin, dataLine]);

  const btnLogin = useCallback(() => {
    liff.login();
  }, []);

  const goAdminPage = useCallback(() => {
    window.location.href = '/admin';
  }, []);

  const goUserPage = useCallback(() => {
    window.location.href = '/';
  }, []);

  const btnLogOut = useCallback(() => {
    console.log('Logout');
    liff.logout();
    window.location.reload();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: 'rgb(76 29 149)' }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={isMobile ? handleMenuOpen : undefined}
          >
            {isMobile && <MenuIcon />}
          </IconButton>
          <Typography
            style={{ fontSize: '20px' }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <a href="/">GameProductShop</a>
          </Typography>

          {isMobile ? (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
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
                    <MenuItem key="user" onClick={goUserPage}>
                      User
                    </MenuItem>,
                    <MenuItem key="logout" onClick={btnLogOut}>
                      LogOut
                    </MenuItem>,
                    <MenuItem key="img">
                      <img
                        width="50px"
                        height="50px"
                        style={{ borderRadius: '2rem', marginRight: '10px' }}
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
              aria-label="Basic button group"
            >
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
                      backgroundColor: '#0A6847',
                    }}
                    onClick={btnLogin}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <p className="flex items-center ">{dataLine?.displayName}</p>
                  <img
                    width="50px"
                    height="50px"
                    style={{ borderRadius: '2rem', marginRight: '10px' }}
                    src={dataLine?.pictureUrl}
                    alt="User"
                  />
                  <Button variant="contained" color="error" onClick={btnLogOut}>
                    LogOut
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#ECB176' }}
                    onClick={goAdminPage}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#B0EBB4' }}
                    onClick={goUserPage}
                  >
                    User
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
