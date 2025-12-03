import { Router } from 'express';
import * as beritaController from '../controllers/berita.controller';
import * as aboutController from '../controllers/about.controller';
import * as kegiatanController from '../controllers/kegiatan.controller';
import * as donasiController from '../controllers/donasi.controller';
import * as teamController from '../controllers/team.controller';
import * as dashboardController from '../controllers/dashboard.controller';
import * as homeController from '../controllers/home.controller';
import * as beritaCommentController from '../controllers/berita-comment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Home content (public)
router.get('/home-content', homeController.getHomeContent);
router.get('/home-stats', dashboardController.getHomeStats);

// Berita
router.get('/berita', beritaController.getPublished);
router.get('/berita/:id', beritaController.getPublishedById);
router.get('/berita/:id/comments', beritaCommentController.getForBerita);
router.post('/berita/:id/comments', authenticate, beritaCommentController.createForBerita);

// Berita comments (by comment id)
router.put('/berita-comments/:id', authenticate, beritaCommentController.updateComment);
router.delete('/berita-comments/:id', authenticate, beritaCommentController.deleteComment);

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
