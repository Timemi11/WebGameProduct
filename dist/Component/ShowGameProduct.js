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
const react_1 = __importStar(require("react"));
const Modal_1 = __importDefault(require("./Modal"));
const ngrokdomain_1 = require("../Component/pathngrok/ngrokdomain");
function ShowGameProduct() {
    const [gamedata, setGameData] = (0, react_1.useState)([]);
    const [isDetail, setIsDetail] = (0, react_1.useState)(false);
    const [selectedProduct, setSelectedProduct] = (0, react_1.useState)();
    const handleToggleModal = (product) => {
        setSelectedProduct(product);
        setIsDetail(!isDetail);
    };
    (0, react_1.useEffect)(() => {
        getGameProduct();
    }, []);
    const getGameProduct = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        fetch(ngrokdomain_1.ngrokDomain + '/products/', requestOptions)
            .then((response) => response.json())
            .then((result) => setGameData(result))
            .catch((error) => console.error(error));
    };
    return (react_1.default.createElement("div", { className: "container  mx-auto p-4" },
        react_1.default.createElement("h1", { className: "text-3xl text-center shadow-md p-4 rounded-lg bg-white font-semibold mb-8 " }, "\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E2A\u0E39\u0E48 GameProductShop"),
        react_1.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" },
            gamedata.map((items, ind) => (react_1.default.createElement("div", { key: ind, className: "flex flex-col items-center justify-center p-8 shadow-2xl border border-gray-200 bg-white rounded-lg w-11/12" },
                react_1.default.createElement("img", { src: items.prod_img, alt: "prod_img", className: "h-48 w-48 object-cover mb-4 rounded-lg" }),
                react_1.default.createElement("h3", { className: "text-lg font-semibold" }, items.prod_name),
                react_1.default.createElement("p", null, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),
                react_1.default.createElement("p", { className: "text-gray-500 truncate w-60 " }, items.prod_desc),
                react_1.default.createElement("p", { className: "text-gray-500" },
                    "\u0E23\u0E32\u0E04\u0E32 ",
                    items.prod_price,
                    " \u0E1A\u0E32\u0E17"),
                react_1.default.createElement("button", { onClick: () => handleToggleModal(items), className: "mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21")))),
            isDetail && selectedProduct && (react_1.default.createElement(Modal_1.default, { handleToggleModal: handleToggleModal, product: selectedProduct })))));
}
exports.default = ShowGameProduct;
