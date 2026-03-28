const muhammara = require('muhammara');
const fs = require('fs');

// Create a dummy PDF
const pdfWriter = muhammara.createWriter('dummy.pdf');
const page = pdfWriter.createPage(0, 0, 595, 842);
pdfWriter.writePage(page);
pdfWriter.end();

// Encrypt it
muhammara.recrypt('dummy.pdf', 'encrypted.pdf', {
  userPassword: 'password123',
  ownerPassword: 'password123',
  userProtectionFlag: 4
});

// Decrypt it
try {
  muhammara.recrypt('encrypted.pdf', 'decrypted.pdf', {
    password: 'password123'
  });
  console.log('Decrypted successfully!');
  
  // Verify using pdf-lib just to be sure it loads without error
  const { PDFDocument } = require('pdf-lib');
  PDFDocument.load(fs.readFileSync('decrypted.pdf')).then(() => {
    console.log('pdf-lib successfully loaded the decrypted file!');
  }).catch(e => console.error('pdf-lib error:', e));
} catch (e) {
  console.error('Decryption failed:', e);
}
