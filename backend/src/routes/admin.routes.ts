import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';
import { upload } from '../utils/upload';
import * as beritaController from '../controllers/berita.controller';
import * as aboutController from '../controllers/about.controller';
import * as kegiatanController from '../controllers/kegiatan.controller';
import * as donasiController from '../controllers/donasi.controller';
import * as dashboardController from '../controllers/dashboard.controller';
import * as teamController from '../controllers/team.controller';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, isAdmin);

// Dashboard
router.get('/dashboard', dashboardController.getStats);

// Berita routes
router.get('/berita', beritaController.getAll);
router.get('/berita/:id', beritaController.getById);
router.post('/berita', upload.single('image'), beritaController.create);
router.put('/berita/:id', upload.single('image'), beritaController.update);
router.delete('/berita/:id', beritaController.remove);

// About routes
router.get('/about', aboutController.getAll);
router.get('/about/:id', aboutController.getById);
router.post('/about', upload.single('image'), aboutController.create);
router.put('/about/:id', upload.single('image'), aboutController.update);
router.delete('/about/:id', aboutController.remove);

// Kegiatan routes
router.get('/kegiatan', kegiatanController.getAll);
router.get('/kegiatan/:id', kegiatanController.getById);
router.post('/kegiatan', upload.single('image'), kegiatanController.create);
router.put('/kegiatan/:id', upload.single('image'), kegiatanController.update);
router.delete('/kegiatan/:id', kegiatanController.remove);

// Donasi routes
router.get('/donasi/list/active', donasiController.getActiveList);
router.get('/donasi', donasiController.getAll);
router.get('/donasi/:id', donasiController.getById);
router.post('/donasi', upload.single('image'), donasiController.create);
router.put('/donasi/:id', upload.single('image'), donasiController.update);
router.delete('/donasi/:id', donasiController.remove);
router.get('/donasi/:id/transactions', donasiController.getTransactions);

// Team routes
router.get('/team', teamController.getAll);
router.get('/team/:id', teamController.getById);
router.post('/team', upload.single('photo'), teamController.create);
router.put('/team/:id', upload.single('photo'), teamController.update);
router.delete('/team/:id', teamController.remove);

export default router;
