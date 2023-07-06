"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_middleware_1 = require("../middleware/passport.middleware");
const path_1 = __importDefault(require("path"));
const todos_route_1 = __importDefault(require("./api/todos.route"));
const user_route_1 = __importDefault(require("./api/user.route"));
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.get('/', (_req, res) => {
            console.log('API Running');
            res.send('API Running');
            res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
        });
        this.app.use(passport_middleware_1.myPassport.initialize());
        this.app.use(passport_middleware_1.myPassport.session());
        this.app.use('/api/todos', todos_route_1.default);
        this.app.use('/api/user', user_route_1.default);
    }
}
exports.default = AppRouter;
//# sourceMappingURL=index.js.map