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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const App_1 = require("../App");
const react_router_dom_1 = require("react-router-dom");
const ngrokdomain_1 = require("../Component/pathngrok/ngrokdomain");
const material_1 = require("@mui/material");
function ProductUpdate() {
    const [prod_img, setProdImg] = (0, react_1.useState)('');
    const [prod_name, setProdName] = (0, react_1.useState)('');
    const [prod_desc, setProdDesc] = (0, react_1.useState)('');
    const [prod_price, setProdPrice] = (0, react_1.useState)('');
    const dataLine = (0, react_1.useContext)(App_1.GetProfile);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        fetch(ngrokdomain_1.ngrokDomain + 'products/' + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
            //ในคลิปมี key status แต่ api ใน mongo ไม่ได้ทำเอาไว้
            setProdImg(result['prod_img']);
            setProdName(result['prod_name']);
            setProdDesc(result['prod_desc']);
            setProdPrice(result['prod_price']);
        })
            .catch((error) => console.error(error));
    }, [id]); //ดึงข้อมูลจาก Id ที่ส่งมาจาก หน้าแรก แค่รอบเดียว และ get ค่าอีกครั้งเมื่อ Id เปลี่ยนค่า
    const handleSubmit = (event) => {
        event.preventDefault(); //ป้องกันการ refresh หน้าเว็บเมื่อ submit
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
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(ngrokdomain_1.ngrokDomain + '/products/' + id, requestOptions)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(() => {
            alert('แก้ไขข้อมูล Product แล้ว T0T');
        })
            .catch((error) => console.error(error));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.CssBaseline, null),
        react_1.default.createElement("div", { className: "w-full h-screen pt-8", style: { backgroundColor: '#c8c6c6' } },
            react_1.default.createElement(material_1.Container, { className: "bg-white", maxWidth: "sm", sx: { p: 6, overflow: 'auto' } },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true, component: 'div' }, "Update Products"),
                react_1.default.createElement("form", { onSubmit: handleSubmit },
                    react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1.default.createElement(material_1.TextField, { id: "prod_img", label: "Product Image", variant: "outlined", fullWidth: true, required: true, onChange: (e) => setProdImg(e.target.value), value: prod_img })),
                        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1.default.createElement(material_1.TextField, { id: "prod_name", label: "Product Name", variant: "outlined", fullWidth: true, required: true, onChange: (e) => setProdName(e.target.value), value: prod_name })),
                        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1.default.createElement(material_1.TextField, { id: "prod_desc", label: "Product Desciption", variant: "outlined", fullWidth: true, onChange: (e) => setProdDesc(e.target.value), value: prod_desc })),
                        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1.default.createElement(material_1.TextField, { id: "prod_price", label: "Product Price", type: "number", variant: "outlined", fullWidth: true, required: true, onChange: (e) => setProdPrice(e.target.value), value: prod_price })),
                        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1.default.createElement(material_1.ButtonGroup, { style: { display: 'flex', justifyContent: 'space-between' }, variant: "outlined", "aria-label": "Basic button group" },
                                react_1.default.createElement(material_1.Button, { variant: "contained", color: "error", onClick: () => (window.location.href = '/admin') }, "Back"),
                                react_1.default.createElement(material_1.Button, { variant: "contained", color: "warning", onClick: () => {
                                        setProdImg('');
                                        setProdName('');
                                        setProdDesc('');
                                        setProdPrice('');
                                    } }, "Clear"),
                                react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", color: "success" }, "Update")))))))));
}
exports.default = ProductUpdate;
