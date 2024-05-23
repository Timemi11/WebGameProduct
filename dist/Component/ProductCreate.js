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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const liff_1 = __importDefault(require("@line/liff"));
const App_1 = require("../App");
const ngrokdomain_1 = require("../Component/pathngrok/ngrokdomain");
const material_1 = require("@mui/material");
function ProductCreate() {
    const [prod_img, setProdImg] = (0, react_1.useState)('');
    const [prod_name, setProdName] = (0, react_1.useState)('');
    const [prod_desc, setProdDesc] = (0, react_1.useState)('');
    const [prod_price, setProdPrice] = (0, react_1.useState)('');
    const dataLine = (0, react_1.useContext)(App_1.GetProfile);
    (0, react_1.useEffect)(() => {
        const liffId = '2005244347-lY246dm4';
        liff_1.default
            .init({
            liffId: liffId,
        })
            .then(() => {
            if (liff_1.default.isLoggedIn()) {
                // if (dataLine) console.log(dataLine);
            }
            else {
                liff_1.default.login();
            }
        });
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            pictureUrl: dataLine === null || dataLine === void 0 ? void 0 : dataLine.pictureUrl,
            userId: dataLine === null || dataLine === void 0 ? void 0 : dataLine.userId,
            displayName: dataLine === null || dataLine === void 0 ? void 0 : dataLine.displayName,
            statusMessage: dataLine === null || dataLine === void 0 ? void 0 : dataLine.statusMessage,
            prod_img: prod_img,
            prod_name: prod_name,
            prod_desc: prod_desc,
            prod_price: prod_price,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(ngrokdomain_1.ngrokDomain + '/products', requestOptions)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(() => {
            alert('เพิ่มข้อมูล Product แล้ว T0T');
        })
            .catch((error) => console.error(error));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(material_1.CssBaseline, null),
        React.createElement("div", { className: "w-full h-screen pt-8", style: { backgroundColor: '#c8c6c6' } },
            React.createElement(material_1.Container, { className: "bg-white", maxWidth: "sm", sx: { p: 6, overflow: 'auto' } },
                React.createElement(material_1.Typography, { variant: "h6", gutterBottom: true, component: 'div' }, "Create Products"),
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(material_1.Grid, { container: true, spacing: 2 },
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.TextField, { id: "prod_img", label: "Product image", variant: "outlined", fullWidth: true, required: true, value: prod_img, onChange: (e) => setProdImg(e.target.value) })),
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.TextField, { id: "prod_name", label: "Product Name", variant: "outlined", fullWidth: true, required: true, value: prod_name, onChange: (e) => setProdName(e.target.value) })),
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.TextField, { id: "prod_desc", label: "Product Desciption", variant: "outlined", fullWidth: true, value: prod_desc, onChange: (e) => setProdDesc(e.target.value) })),
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.TextField, { id: "prod_price", label: "Product Price", variant: "outlined", type: "number", fullWidth: true, required: true, value: prod_price, onChange: (e) => setProdPrice(e.target.value) })),
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.ButtonGroup, { style: { display: 'flex', justifyContent: 'space-between' }, variant: "outlined", "aria-label": "Basic button group" },
                                React.createElement(material_1.Button, { variant: "contained", color: "error", onClick: () => (window.location.href = '/admin') }, "Back"),
                                React.createElement(material_1.Button, { variant: "contained", color: "warning", onClick: () => {
                                        setProdImg('');
                                        setProdName('');
                                        setProdDesc('');
                                        setProdPrice('');
                                    } }, "Clear"),
                                React.createElement(material_1.Button, { type: "submit", variant: "contained", color: "success" }, "Create")))))))));
}
exports.default = ProductCreate;
