"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
var cors = require('cors');
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
app.use(cors());
const router = new routes_1.default(app);
(0, database_1.default)();
app.set('port', process.env.PORT || 6000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}));
router.init();
const port = app.get('port');
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
//# sourceMappingURL=server.js.map