"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const server_1 = require("./server");
class App {
    async start() {
        var _a;
        const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '5008';
        const sqs = (await server_1.Server.initSQS());
        this.server = new server_1.Server(port, sqs);
        await this.server.listen();
    }
}
exports.App = App;
try {
    new App().start();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});
//# sourceMappingURL=app.js.map