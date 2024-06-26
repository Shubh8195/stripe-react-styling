"use strict";
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    typescript: true,
});
app.post("/paymentintent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const model = req.body;
    console.log(model);
    try {
        const p = yield stripe.paymentIntents.create({
            amount: model.amount,
            currency: model.currency || "USD",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            success: true,
            clientSecret: p === null || p === void 0 ? void 0 : p.client_secret,
        });
    }
    catch (e) {
        res.status(500).send({ success: false, error: e === null || e === void 0 ? void 0 : e.message });
    }
}));
app.listen(3001, () => {
    console.log("Server listening on port: 3001");
});
