import * as pdfService from '../services/pdf.service.js';
import fs from 'fs';
import path from 'path';

// Helper to record history if user is logged in
import User from '../models/User.model.js';
const recordHistory = async (req, toolName, filename) => {
  if (req.user) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { history: { tool: toolName, filename } }
      });
    } catch (error) {
      console.error('Failed to save history', error);
    }
  }
};

// Return download URL to client
const sendResponse = (req, res, filename, toolName) => {
  if (filename) {
    recordHistory(req, toolName, filename);
    const downloadUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ success: true, downloadUrl, filename });
  } else {
    res.status(500).json({ success: false, message: 'Processing failed' });
  }
};

export const mergePdf = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: 'Please upload at least two PDFs' });
    }
    const filePaths = req.files.map(f => f.path);
    const filename = await pdfService.mergePdfs(filePaths);
    sendResponse(req, res, filename, 'Merge PDF');
    // Cleanup input files
    filePaths.forEach(p => fs.unlinkSync(p));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const splitPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    // Returns array of filenames
    const filenames = await pdfService.splitPdf(req.file.path, req.body.ranges);
    // For simplicity, we just return the first split file, or we should zip them.
    // Let's just zip them or return an array. We return array.
    res.json({ success: true, files: filenames.map(f => `${req.protocol}://${req.get('host')}/uploads/${f}`) });
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const compressPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const filename = await pdfService.compressPdf(req.file.path);
    sendResponse(req, res, filename, 'Compress PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rotatePdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const angle = req.body.angle || 90;
    const filename = await pdfService.rotatePdf(req.file.path, angle);
    sendResponse(req, res, filename, 'Rotate PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const watermarkPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const text = req.body.text || 'CONFIDENTIAL';
    const filename = await pdfService.addWatermark(req.file.path, text);
    sendResponse(req, res, filename, 'Watermark PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlockPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const password = req.body.password;
    if (!password) return res.status(400).json({ message: 'Password required' });
    const filename = await pdfService.unlockPdf(req.file.path, password);
    sendResponse(req, res, filename, 'Unlock PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const numberPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const filename = await pdfService.addPageNumbers(req.file.path);
    sendResponse(req, res, filename, 'Page Numbers');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const jpgToPdf = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one Image' });
    }
    const filePaths = req.files.map(f => f.path);
    const filename = await pdfService.imagesToPdf(filePaths);
    sendResponse(req, res, filename, 'JPG to PDF');
    filePaths.forEach(p => fs.unlinkSync(p));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const protectPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const password = req.body.password || '1234';
    const filename = await pdfService.protectPdf(req.file.path, password);
    sendResponse(req, res, filename, 'Protect PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pdfToJpg = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const filename = await pdfService.pdfToJpg(req.file.path);
    sendResponse(req, res, filename, 'PDF to JPG');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const wordToPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a Word document' });
    const filename = await pdfService.wordToPdf(req.file.path);
    sendResponse(req, res, filename, 'Word to PDF');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pdfToWord = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const filename = await pdfService.pdfToWord(req.file.path);
    sendResponse(req, res, filename, 'PDF to Word');
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
