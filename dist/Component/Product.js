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
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const react_1 = require("react");
const Link_1 = __importDefault(require("@mui/material/Link"));
const material_1 = require("@mui/material");
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const liff_1 = __importDefault(require("@line/liff"));
const ngrokdomain_1 = require("../Component/pathngrok/ngrokdomain");
// ตัวอย่างข้อมูล
// prod_img : https://th.bing.com/th/id/OIP.Z7ONfsHRRODBL1xmGG65RwHaE7?w=719&h=479&rs=1&pid=ImgDetMain
// prod_name: ไอโฟน
// prod_desc : สุดยอดกล้อง
// prod_price : 1200
function Product() {
    const [items, setItems] = (0, react_1.useState)([]);
    const liffId = '2005244347-lY246dm4';
    const ProductUpdate = (id) => {
        window.location.href = '/update/' + id;
    };
    const ProductDelete = (id) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };
        fetch(ngrokdomain_1.ngrokDomain + '/products/' + id, requestOptions)
            .then((response) => response.json())
            .then(() => UserGet())
            .catch((error) => console.error(error));
    };
    const UserGet = () => {
        fetch(ngrokdomain_1.ngrokDomain + '/products')
            .then((res) => res.json()) //  .then ส่งค่าคืนมาเป็นformat json  สามารถ ส่งค่า resolve function และ reject function
            .then((result) => {
            setItems(result);
        });
    };
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        UserGet();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(CssBaseline_1.default, null),
        React.createElement("div", { className: "w-full h-full pt-8", style: { backgroundColor: '#c8c6c6' } },
            React.createElement(Container_1.default, { maxWidth: "xl", sx: { p: 2 } },
                React.createElement(Paper_1.default, { sx: { p: 2 } },
                    React.createElement(Box_1.default, { display: 'flex' },
                        React.createElement(Box_1.default, { sx: { width: '100%' } },
                            React.createElement(Typography_1.default, { variant: "h6", gutterBottom: true, component: 'div' }, "Products")),
                        React.createElement(Box_1.default, null,
                            React.createElement(Link_1.default, { href: "/create" },
                                React.createElement(Button_1.default, { variant: "contained" }, "Create")))),
                    React.createElement(TableContainer_1.default, { component: Paper_1.default, sx: { marginTop: 2 } },
                        React.createElement(Table_1.default, { sx: { minWidth: 650 }, "aria-label": "simple table" },
                            React.createElement(TableHead_1.default, null,
                                React.createElement(TableRow_1.default, null,
                                    React.createElement(TableCell_1.default, null, "ID"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "Product_Image"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "Product_Name"),
                                    React.createElement(TableCell_1.default, { align: "left" }, "Product_Description"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "Product_Price"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "User_Avatar"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "User_Id"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "User_Name"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "User_StatusName"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "Upload_Date"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "Action"))),
                            React.createElement(TableBody_1.default, null, items.map((row) => (React.createElement(TableRow_1.default, { key: row._id, sx: { '&:last-child td, &:last-child th': { border: 0 } } },
                                React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row._id),
                                React.createElement(TableCell_1.default, { align: "right" },
                                    React.createElement("img", { className: "rounded-lg", src: row.prod_img })),
                                React.createElement(TableCell_1.default, { align: "right" }, row.prod_name),
                                React.createElement(TableCell_1.default, { className: "text-wrap ", style: {
                                        minWidth: '500px',
                                    }, align: "left" }, row.prod_desc),
                                React.createElement(TableCell_1.default, { style: {
                                        minWidth: '200px',
                                    }, align: "right" }, row.prod_price),
                                React.createElement(TableCell_1.default, { align: "right" },
                                    React.createElement("img", { className: "rounded-lg", src: row.pictureUrl })),
                                React.createElement(TableCell_1.default, { align: "right" }, row.userId),
                                React.createElement(TableCell_1.default, { align: "right" }, row.displayName),
                                React.createElement(TableCell_1.default, { align: "right" }, row.statusMessage),
                                React.createElement(TableCell_1.default, { align: "right" }, row.update_at),
                                React.createElement(TableCell_1.default, { align: "right" },
                                    React.createElement(material_1.ButtonGroup, { variant: "outlined", "aria-label": "Basic button group" },
                                        React.createElement(Button_1.default, { sx: { marginRight: 1 }, variant: "contained", color: "warning", onClick: () => ProductUpdate(row._id) }, "Edit"),
                                        React.createElement(Button_1.default, { variant: "contained", color: "error", startIcon: React.createElement(Delete_1.default, null), onClick: () => ProductDelete(row._id) }, "Delete"))))))))))))));
}
exports.default = Product;
