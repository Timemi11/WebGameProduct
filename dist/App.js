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
exports.GetProfile = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Navbar_1 = __importDefault(require("./Component/Navbar"));
const Product_1 = __importDefault(require("./Component/Product"));
const ProductCreate_1 = __importDefault(require("./Component/ProductCreate"));
const ProductUpdate_1 = __importDefault(require("./Component/ProductUpdate"));
const ShowGameProduct_1 = __importDefault(require("./Component/ShowGameProduct"));
const liff_1 = __importDefault(require("@line/liff"));
exports.GetProfile = (0, react_1.createContext)(undefined);
const App = () => {
    const liffId = '2005244347-lY246dm4';
    const [dataLine, setDataLine] = (0, react_1.useState)();
    const getProfile = () => __awaiter(void 0, void 0, void 0, function* () {
        const profile = yield liff_1.default.getProfile();
        const { pictureUrl, userId, displayName, statusMessage, } = profile;
        setDataLine({ pictureUrl, userId, displayName, statusMessage });
    });
    (0, react_1.useEffect)(() => {
        // Initialize LIFF SDK
        const initLiff = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield liff_1.default.init({
                    liffId: liffId,
                });
                if (!liff_1.default.isLoggedIn()) {
                }
                else {
                    getProfile();
                }
            }
            catch (error) {
                console.error('LIFF initialization failed', error);
            }
        });
        initLiff();
    }, []);
    return (react_1.default.createElement(exports.GetProfile.Provider, { value: dataLine },
        react_1.default.createElement(Navbar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(ShowGameProduct_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "admin", element: react_1.default.createElement(Product_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "create", element: react_1.default.createElement(ProductCreate_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "update/:id", element: react_1.default.createElement(ProductUpdate_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, null))));
};
exports.default = App;
