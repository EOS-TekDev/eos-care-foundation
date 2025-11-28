import { Router } from 'express';
import * as beritaController from '../controllers/berita.controller';
import * as aboutController from '../controllers/about.controller';
import * as kegiatanController from '../controllers/kegiatan.controller';
import * as donasiController from '../controllers/donasi.controller';
import * as teamController from '../controllers/team.controller';

const router = Router();

// Berita
router.get('/berita', beritaController.getPublished);
router.get('/berita/:id', beritaController.getById);

// About
router.get('/about', aboutController.getAll);

// Kegiatan
router.get('/kegiatan', kegiatanController.getActive);
router.get('/kegiatan/:id', kegiatanController.getById);

// Donasi
router.get('/donasi', donasiController.getActive);
router.get('/donasi/:id', donasiController.getById);
router.post('/donasi/:id/donate', donasiController.createTransaction);

// Team
router.get('/team', teamController.getActive);

export default router;
