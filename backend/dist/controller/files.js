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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const client_1 = require("@prisma/client");
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const components_json_1 = __importDefault(require("../../components.json"));
const archiver_1 = __importDefault(require("archiver"));
const prisma = new client_1.PrismaClient();
const fileDownload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspaceId = req.body.workspaceId;
        const fileContent = req.body.code;
        const response = yield prisma.workshop.findFirst({
            where: {
                id: workspaceId
            },
            include: {
                component: true
            }
        });
        console.log(req.session);
        const files = components_json_1.default;
        console.log(response, "response to string");
        const fileName = response === null || response === void 0 ? void 0 : response.component.map((component) => component.name);
        const folderName = "generatedFiles";
        const rootPath = node_path_1.default.join(__dirname, '../..');
        const folderPath = node_path_1.default.join(rootPath, folderName);
        yield fs.mkdir(folderPath, { recursive: true });
        const appFilePath = node_path_1.default.join(folderPath, 'app.tsx');
        yield fs.writeFile(appFilePath, fileContent);
        yield fs.mkdir(node_path_1.default.join(folderPath, 'components'), { recursive: true });
        const componentFolderPath = node_path_1.default.join(folderPath, 'components');
        const zipFolderPath = node_path_1.default.join(rootPath, "zipFolder", `zipFile${req.session.userId}.zip`);
        if (fileName) {
            for (const name of fileName) {
                console.log(name, "name");
                yield fs.writeFile(node_path_1.default.join(componentFolderPath, `${name}.tsx`), files[name]);
            }
        }
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename=zipFile${req.session.userId}.zip`);
        const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
        // Error handling
        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                console.warn('Archiver warning:', err);
            }
            else {
                throw err;
            }
        });
        archive.on('error', (err) => {
            console.error('Archiver error:', err);
            res.status(500).send({ message: 'Error creating ZIP file' });
        });
        // Pipe directly to HTTP response (no file on disk)
        archive.pipe(res);
        // Add folder
        archive.directory(folderPath, false);
        // Finalize
        yield archive.finalize();
    }
    catch (error) {
        throw error;
    }
});
const file = { fileDownload };
exports.default = file;
