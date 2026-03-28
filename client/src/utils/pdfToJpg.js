import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import JSZip from 'jszip';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const convertPdfToJpg = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2.0 scale for higher resolution
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;

        const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
        
        // Pad single pages as page-01.jpg, page-02.jpg depending on numPages
        const padLength = numPages.toString().length;
        const paddedIndex = i.toString().padStart(padLength, '0');
        zip.file(`page-${paddedIndex}.jpg`, blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      resolve(zipBlob);
    } catch (error) {
      console.error("PDF JS Error: ", error);
      reject(error);
    }
  });
};
