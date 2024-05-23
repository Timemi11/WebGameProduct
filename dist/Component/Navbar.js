"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const liff_1 = __importDefault(require("@line/liff"));
const react_1 = require("react");
const App_1 = require("../App");
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const material_1 = require("@mui/material/");
function Navbar() {
    const liffId = '2005244347-lY246dm4';
    const dataLine = (0, react_1.useContext)(App_1.GetProfile);
    const [isLogin, setIsLogin] = (0, react_1.useState)(false);
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const theme = (0, material_1.useTheme)();
    const isMobile = (0, material_1.useMediaQuery)(theme.breakpoints.down('sm'));
    const sendMessageToLine = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.line.me/v2/bot/message/push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Bearer ต่อด้วย  Channel access token ของ messagesing api
                    Authorization: 'Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=',
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
            }
            else {
                alert('Failed to send message');
            }
        }
        catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message');
        }
    });
    (0, react_1.useEffect)(() => {
        sendMessageToLine();
    }, []);
    (0, react_1.useEffect)(() => {
        // Initialize LIFF SDK
        const initLiff = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield liff_1.default.init({ liffId });
                setIsLogin(liff_1.default.isLoggedIn());
            }
            catch (error) {
                console.error('LIFF initialization failed', error);
            }
        });
        initLiff();
    }, [isLogin, dataLine]);
    const btnLogin = (0, react_1.useCallback)(() => {
        liff_1.default.login();
    }, []);
    const goAdminPage = (0, react_1.useCallback)(() => {
        window.location.href = '/admin';
    }, []);
    const goUserPage = (0, react_1.useCallback)(() => {
        window.location.href = '/';
    }, []);
    const btnLogOut = (0, react_1.useCallback)(() => {
        console.log('Logout');
        liff_1.default.logout();
        window.location.reload();
    }, []);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (React.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        React.createElement(material_1.AppBar, { style: { backgroundColor: 'rgb(76 29 149)' }, position: "static" },
            React.createElement(material_1.Toolbar, null,
                React.createElement(material_1.IconButton, { size: "large", edge: "start", color: "inherit", "aria-label": "menu", sx: { mr: 2 }, onClick: isMobile ? handleMenuOpen : undefined }, isMobile && React.createElement(Menu_1.default, null)),
                React.createElement(material_1.Typography, { style: { fontSize: '20px' }, variant: "h6", component: "div", sx: { flexGrow: 1 } },
                    React.createElement("a", { href: "/" }, "GameProductShop")),
                isMobile ? (React.createElement(material_1.Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose }, !isLogin
                    ? [
                        React.createElement(material_1.MenuItem, { key: "login", onClick: btnLogin }, "Login"),
                        React.createElement(material_1.MenuItem, { key: "avatar" },
                            React.createElement(material_1.Avatar, { alt: "Profile Picture", src: dataLine === null || dataLine === void 0 ? void 0 : dataLine.pictureUrl, sx: { mr: 2 } })),
                    ]
                    : [
                        React.createElement(material_1.MenuItem, { key: "admin", onClick: goAdminPage }, "Admin"),
                        React.createElement(material_1.MenuItem, { key: "user", onClick: goUserPage }, "User"),
                        React.createElement(material_1.MenuItem, { key: "logout", onClick: btnLogOut }, "LogOut"),
                        React.createElement(material_1.MenuItem, { key: "img" },
                            React.createElement("img", { width: "50px", height: "50px", style: { borderRadius: '2rem', marginRight: '10px' }, src: dataLine === null || dataLine === void 0 ? void 0 : dataLine.pictureUrl, alt: "User" })),
                        React.createElement(material_1.MenuItem, { key: "displayName" },
                            React.createElement("p", null, dataLine === null || dataLine === void 0 ? void 0 : dataLine.displayName)),
                    ])) : (React.createElement(material_1.ButtonGroup, { className: "flex gap-x-4 p-4 ", variant: "outlined", "aria-label": "Basic button group" }, !isLogin ? (React.createElement(React.Fragment, null,
                    React.createElement(material_1.Avatar, { alt: "Profile Picture", src: dataLine === null || dataLine === void 0 ? void 0 : dataLine.pictureUrl, sx: { mr: 2 } }),
                    React.createElement(material_1.Button, { variant: "contained", style: {
                            backgroundColor: '#0A6847',
                        }, onClick: btnLogin }, "Login"))) : (React.createElement(React.Fragment, null,
                    React.createElement("p", { className: "flex items-center " }, dataLine === null || dataLine === void 0 ? void 0 : dataLine.displayName),
                    React.createElement("img", { width: "50px", height: "50px", style: { borderRadius: '2rem', marginRight: '10px' }, src: dataLine === null || dataLine === void 0 ? void 0 : dataLine.pictureUrl, alt: "User" }),
                    React.createElement(material_1.Button, { variant: "contained", color: "error", onClick: btnLogOut }, "LogOut"),
                    React.createElement(material_1.Button, { variant: "contained", style: { backgroundColor: '#ECB176' }, onClick: goAdminPage }, "Admin"),
                    React.createElement(material_1.Button, { variant: "contained", style: { backgroundColor: '#B0EBB4' }, onClick: goUserPage }, "User")))))))));
}
exports.default = Navbar;
