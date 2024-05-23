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
const liff_1 = __importDefault(require("@line/liff"));
const App_1 = require("../App");
const react_2 = require("react");
function Modal({ handleToggleModal, product }) {
    const liffId = '2005244347-lY246dm4';
    const dataLine = (0, react_1.useContext)(App_1.GetProfile);
    const [message, setMessage] = (0, react_2.useState)('');
    // userId Uee534050cb274b81e66a9f0333932612
    // const sendMessageToLine = async () => {
    //   try {
    //     const response = await fetch(ngrokDomain + '/webhook', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Bearer ต่อด้วย  Channel access token ของ messagesing api
    //         Authorization:
    //           'Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=',
    //       },
    //       body: JSON.stringify({
    //         // to : userId
    //         to: 'Uee534050cb274b81e66a9f0333932612',
    //         messages: [
    //           {
    //             type: 'text',
    //             text: 'ส่งข้อความ',
    //           },
    //         ],
    //       }),
    //     });
    //     if (response.ok) {
    //       alert('Message sent successfully');
    //     } else {
    //       alert('Failed to send message');
    //     }
    //   } catch (error) {
    //     console.error('Failed to send message:', error);
    //     alert('Failed to send message');
    //   }
    // };
    // useEffect(() => {
    //   sendMessageToLine();
    // }, []);
    const logInBeforeBuy = () => {
        if (!liff_1.default.isLoggedIn()) {
            liff_1.default
                .init({
                liffId: liffId,
            })
                .then(() => {
                if (liff_1.default.isLoggedIn()) {
                    // ส่งข้อมูลเป็น flex messages
                }
                else {
                    liff_1.default.login();
                }
            });
        }
    };
    return (react_1.default.createElement("div", { className: " fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" },
        react_1.default.createElement("div", { className: "overflow-y-hidden bg-white flex flex-col items-center p-8 rounded-lg max-w-lg w-full", style: {
                overflow: 'scroll',
                maxHeight: '-webkit-fill-available',
            } },
            react_1.default.createElement("h2", { className: "text-2xl font-bold mb-4" }, product.prod_name),
            react_1.default.createElement("img", { src: product.prod_img, alt: "prod_img", className: " h-48 w-48 object-cover mb-4 rounded-lg" }),
            react_1.default.createElement("p", null, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),
            react_1.default.createElement("p", { className: "text-gray-700 mb-4" }, product.prod_desc),
            react_1.default.createElement("p", { className: "text-gray-700 mb-4 text-green-500 text-xl font-extrabold" },
                "\u0E23\u0E32\u0E04\u0E32 ",
                product.prod_price,
                " \u0E1A\u0E32\u0E17"),
            react_1.default.createElement("div", { className: "buttonGroup flex gap-x-6 justify-between w-full" },
                react_1.default.createElement("button", { onClick: handleToggleModal, className: "w-1/2 mt-4 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md" }, "\u0E1B\u0E34\u0E14"),
                react_1.default.createElement("button", { onClick: () => {
                        // sendMessageToLine();
                    }, className: "w-1/2 mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md" }, "\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D")))));
}
exports.default = Modal;
