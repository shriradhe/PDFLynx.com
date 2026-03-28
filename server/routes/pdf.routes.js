import express from 'express';
import upload from '../middleware/upload.middleware.js';
import * as pdfController from '../controllers/pdf.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply optionalAuth so history gets saved if logged in
router.use(optionalAuth);

router.post('/merge', upload.array('files', 10), pdfController.mergePdf);
router.post('/split', upload.single('file'), pdfController.splitPdf);
router.post('/compress', upload.single('file'), pdfController.compressPdf);
router.post('/rotate', upload.single('file'), pdfController.rotatePdf);
router.post('/watermark', upload.single('file'), pdfController.watermarkPdf);
router.post('/unlock', upload.single('file'), pdfController.unlockPdf);
router.post('/protect', upload.single('file'), pdfController.protectPdf);
router.post('/number', upload.single('file'), pdfController.numberPdf);
router.post('/jpg-to-pdf', upload.array('files', 20), pdfController.jpgToPdf);
router.post('/pdf-to-jpg', upload.single('file'), pdfController.pdfToJpg);
router.post('/word-to-pdf', upload.single('file'), pdfController.wordToPdf);
router.post('/pdf-to-word', upload.single('file'), pdfController.pdfToWord);

export default router;
