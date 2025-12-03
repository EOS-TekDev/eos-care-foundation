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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const upload_1 = require("../utils/upload");
const beritaController = __importStar(require("../controllers/berita.controller"));
const aboutController = __importStar(require("../controllers/about.controller"));
const kegiatanController = __importStar(require("../controllers/kegiatan.controller"));
const donasiController = __importStar(require("../controllers/donasi.controller"));
const dashboardController = __importStar(require("../controllers/dashboard.controller"));
const teamController = __importStar(require("../controllers/team.controller"));
const homeController = __importStar(require("../controllers/home.controller"));
const router = (0, express_1.Router)();
// All admin routes require authentication and admin role
router.use(auth_middleware_1.authenticate, role_middleware_1.isAdmin);
// Dashboard
router.get('/dashboard', dashboardController.getStats);
router.get('/activities', dashboardController.getRecentActivity);
// Berita routes
router.get('/berita', beritaController.getAll);
router.get('/berita/:id', beritaController.getById);
router.post('/berita', upload_1.upload.single('image'), beritaController.create);
router.put('/berita/:id', upload_1.upload.single('image'), beritaController.update);
router.delete('/berita/:id', beritaController.remove);
// About routes
router.get('/about', aboutController.getAll);
router.get('/about/:id', aboutController.getById);
router.post('/about', upload_1.upload.single('image'), aboutController.create);
router.put('/about/:id', upload_1.upload.single('image'), aboutController.update);
router.delete('/about/:id', aboutController.remove);
// Kegiatan routes
router.get('/kegiatan', kegiatanController.getAll);
router.get('/kegiatan/:id', kegiatanController.getById);
router.post('/kegiatan', upload_1.upload.single('image'), kegiatanController.create);
router.put('/kegiatan/:id', upload_1.upload.single('image'), kegiatanController.update);
router.delete('/kegiatan/:id', kegiatanController.remove);
// Donasi routes
router.get('/donasi/list/active', donasiController.getActiveList);
router.get('/donasi', donasiController.getAll);
router.get('/donasi/:id', donasiController.getById);
router.post('/donasi', upload_1.upload.single('image'), donasiController.create);
router.put('/donasi/:id', upload_1.upload.single('image'), donasiController.update);
router.delete('/donasi/:id', donasiController.remove);
router.get('/donasi/:id/transactions', donasiController.getTransactions);
// Team routes
router.get('/team', teamController.getAll);
router.get('/team/:id', teamController.getById);
router.post('/team', upload_1.upload.single('photo'), teamController.create);
router.put('/team/:id', upload_1.upload.single('photo'), teamController.update);
router.delete('/team/:id', teamController.remove);
// Home Hero routes
router.get('/home-hero', homeController.heroGetAll);
router.get('/home-hero/:id', homeController.heroGetById);
router.post('/home-hero', homeController.heroCreate);
router.put('/home-hero/:id', homeController.heroUpdate);
router.delete('/home-hero/:id', homeController.heroRemove);
// Home Service routes
router.get('/home-services', homeController.serviceGetAll);
router.get('/home-services/:id', homeController.serviceGetById);
router.post('/home-services', homeController.serviceCreate);
router.put('/home-services/:id', homeController.serviceUpdate);
router.delete('/home-services/:id', homeController.serviceRemove);
// Home CTA routes
router.get('/home-cta', homeController.ctaGetAll);
router.get('/home-cta/:id', homeController.ctaGetById);
router.post('/home-cta', homeController.ctaCreate);
router.put('/home-cta/:id', homeController.ctaUpdate);
router.delete('/home-cta/:id', homeController.ctaRemove);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map