import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fromPath } from 'pdf2pic';
import archiver from 'archiver';

// Helper to save document
const savePdf = async (pdfDoc, prefix) => {
  const pdfBytes = await pdfDoc.save();
  const filename = `${prefix}-${Date.now()}.pdf`;
  const filepath = path.join(process.cwd(), 'uploads', filename);
  fs.writeFileSync(filepath, pdfBytes);
  return filename;
};

export const mergePdfs = async (filePaths) => {
  const mergedPdf = await PDFDocument.create();
  
  for (const filePath of filePaths) {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await savePdf(mergedPdf, 'merged');
};

export const splitPdf = async (filePath, ranges) => {
  // ranges = "1-3,5,7-9" (comma separated, 1-indexed). If empty, split all pages into separate files.
  const pdfBytes = fs.readFileSync(filePath);
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const totalPages = pdf.getPageCount();
  
  // For simplicity, just split into individual pages if ranges aren't provided
  const outputFiles = [];
  for (let i = 0; i < totalPages; i++) {
    const newDoc = await PDFDocument.create();
    const [page] = await newDoc.copyPages(pdf, [i]);
    newDoc.addPage(page);
    const filename = await savePdf(newDoc, `split-page-${i + 1}`);
    outputFiles.push(filename);
  }
  
  return outputFiles; // Returns array of filenames
};

export const compressPdf = async (filePath) => {
  // Basic compression via rebuilding the PDF without object streams
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false, ignoreEncryption: true });
  // Saving with UseObjectStreams = false might not always compress, but it's pure JS best-effort
  const compressedBytes = await pdfDoc.save({ useObjectStreams: false });
  
  const filename = `compressed-${Date.now()}.pdf`;
  const outPath = path.join(process.cwd(), 'uploads', filename);
  fs.writeFileSync(outPath, compressedBytes);
  return filename;
};

export const rotatePdf = async (filePath, angle) => {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  
  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + parseInt(angle)));
  });
  
  return await savePdf(pdfDoc, 'rotated');
};

export const addWatermark = async (filePath, text) => {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(45),
      opacity: 0.5,
    });
  });

  return await savePdf(pdfDoc, 'watermarked');
};

export const protectPdf = async (filePath, password) => {
  const muhammara = (await import('muhammara')).default;
  const filename = `protected-${Date.now()}.pdf`;
  const outPath = path.join(process.cwd(), 'uploads', filename);

  muhammara.recrypt(filePath, outPath, {
    userPassword: password,
    ownerPassword: password,
    userProtectionFlag: 4
  });

  return filename;
};

export const unlockPdf = async (filePath, password) => {
  const muhammara = (await import('muhammara')).default;
  const filename = `unlocked-${Date.now()}.pdf`;
  const outPath = path.join(process.cwd(), 'uploads', filename);

  muhammara.recrypt(filePath, outPath, {
    password: password
  });

  return filename;
};

export const addPageNumbers = async (filePath) => {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    page.drawText(`Page ${idx + 1} of ${pages.length}`, {
      x: width / 2 - 40,
      y: 20,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  });

  return await savePdf(pdfDoc, 'numbered');
};

export const imagesToPdf = async (filePaths) => {
  const pdfDoc = await PDFDocument.create();
  
  for (const filePath of filePaths) {
    const imgBytes = fs.readFileSync(filePath);
    let image;
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      image = await pdfDoc.embedJpg(imgBytes);
    } else if (ext === '.png') {
      image = await pdfDoc.embedPng(imgBytes);
    } else {
      continue; // Skip unsupported
    }
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }
  
  return await savePdf(pdfDoc, 'images-to-pdf');
};

export const pdfToJpg = async (filePath) => {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  const outputDirectory = path.join(process.cwd(), 'uploads');
  const baseName = `pdf-to-jpg-${Date.now()}`;
  
  const options = {
    density: 300,
    saveFilename: baseName,
    savePath: outputDirectory,
    format: "jpg",
    width: 2480,
    height: 3508
  };
  
  const convert = fromPath(filePath, options);
  const jpgFiles = [];
  
  const bulkObj = await convert.bulk(-1, { responseType: "image" });
  const results = Array.isArray(bulkObj) ? bulkObj : [bulkObj];
  
  results.forEach(res => {
    if (res && res.path) {
      jpgFiles.push(res.path);
    }
  });

  // Now zip them
  const zipFilename = `${baseName}.zip`;
  const zipPath = path.join(outputDirectory, zipFilename);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });
  
  return new Promise((resolve, reject) => {
    output.on('close', () => {
      // Cleanup the individual JPG files
      jpgFiles.forEach(f => {
        if (fs.existsSync(f)) fs.unlinkSync(f);
      });
      resolve(zipFilename);
    });
    
    archive.on('error', (err) => reject(err));
    
    archive.pipe(output);
    jpgFiles.forEach(f => {
      if (fs.existsSync(f)) {
         archive.file(f, { name: path.basename(f) });
      }
    });
    archive.finalize();
  });
};

const convertWithLibreOffice = async (filePath, outExtension, outFilename) => {
  const inputBuffer = fs.readFileSync(filePath);

  // libreoffice-convert is CommonJS; use dynamic import for ESM compatibility.
  const libreMod = await import('libreoffice-convert');
  const libre = libreMod.default || libreMod;
  const convertWithOptions = libre.convertWithOptions;
  const convertFn = libre.convert;

  if (typeof convertWithOptions !== 'function' && typeof convertFn !== 'function') {
    throw new Error('LibreOffice conversion library not available.');
  }

  const rawPaths =
    process.env.LIBREOFFICE_SOFFICE_BINARY_PATHS ||
    process.env.LIBREOFFICE_SOFFICE_BINARY_PATH ||
    '';

  const sofficeBinaryPaths = rawPaths
    .split(/[;,]/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const options = sofficeBinaryPaths.length
    ? { sofficeBinaryPaths }
    : {};

  const runConvertWithOptions = (document, format, filter, opts) =>
    new Promise((resolve, reject) => {
      convertWithOptions(document, format, filter, opts, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

  const runConvert = (document, format, filter) =>
    new Promise((resolve, reject) => {
      convertFn(document, format, filter, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

  let outputBuffer;
  try {
    if (typeof convertWithOptions === 'function') {
      // format must include leading dot: '.pdf', '.docx'
      outputBuffer = await runConvertWithOptions(inputBuffer, outExtension, undefined, options);
    } else {
      outputBuffer = await runConvert(inputBuffer, outExtension, undefined);
    }
  } catch (err) {
    const message = err?.message || String(err);
    // Improve error clarity for deployments.
    if (message.toLowerCase().includes('could not find soffice binary')) {
      const platformHint = process.platform === 'win32'
        ? 'Windows: install LibreOffice and ensure `soffice.exe` is on PATH, or set `LIBREOFFICE_SOFFICE_BINARY_PATH` (single path) / `LIBREOFFICE_SOFFICE_BINARY_PATHS` (comma/semicolon-separated list) to the full `soffice.exe` path.'
        : 'Linux: install LibreOffice (soffice) and ensure `soffice` is on PATH, or set `LIBREOFFICE_SOFFICE_BINARY_PATH` (single path) / `LIBREOFFICE_SOFFICE_BINARY_PATHS` (comma/semicolon-separated list) to the full `soffice` path.';
      throw new Error(`LibreOffice is not available for conversion. ${platformHint}`);
    }
    throw new Error(`LibreOffice conversion failed: ${message}`);
  }

  const outPath = path.join(process.cwd(), 'uploads', outFilename);
  fs.writeFileSync(outPath, outputBuffer);

  return outFilename;
};

export const wordToPdf = async (filePath) => {
  // Convert .doc/.docx -> .pdf using LibreOffice
  const outFilename = `word-to-pdf-${Date.now()}.pdf`;
  return convertWithLibreOffice(filePath, '.pdf', outFilename);
};

export const pdfToWord = async (filePath) => {
  // Convert .pdf -> .docx (text-extraction based for cross-platform reliability).
  // Note: scanned/image PDFs need OCR (not included here).
  const pdfParseMod = await import('pdf-parse');
  const pdfParse = pdfParseMod.default || pdfParseMod;
  const docxMod = await import('docx');
  const { Document, Packer, Paragraph, TextRun } = docxMod;

  const pdfBytes = fs.readFileSync(filePath);
  const parsed = await pdfParse(pdfBytes);
  const rawText = (parsed?.text || '').replace(/\r/g, '');
  const lines = rawText.split('\n');

  const paragraphs = lines.length
    ? lines.map((line) =>
        new Paragraph({
          children: [new TextRun(line || ' ')],
        })
      )
    : [new Paragraph({ children: [new TextRun('')] })];

  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outFilename = `pdf-to-word-${Date.now()}.docx`;
  const outPath = path.join(process.cwd(), 'uploads', outFilename);
  fs.writeFileSync(outPath, buffer);
  return outFilename;
};
