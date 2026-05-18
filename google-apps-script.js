/**
 * Baozuan website inquiry receiver
 * 1) Create a Google Sheet and copy its Sheet ID.
 * 2) Replace SHEET_ID below.
 * 3) Deploy this Apps Script as a Web app.
 * 4) Add the Web app URL to Cloudflare Pages environment variable: GOOGLE_SCRIPT_URL
 */

const NOTIFY_EMAIL = 'info@baozuanhardware.com';
const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Website Inquiries';

function doGet() {
  return jsonOutput_({ ok: true, message: 'Baozuan inquiry receiver is running.' });
}

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const sheet = getSheet_();
    ensureHeader_(sheet);

    const receivedAt = new Date();
    sheet.appendRow([
      receivedAt,
      data.name || '',
      data.contact || '',
      data.message || '',
      data.page || '',
      data.country || '',
      data.ip || '',
      data.userAgent || '',
      data.timezone || '',
      data.submittedAt || '',
    ]);

    const body = buildEmailBody_(data, receivedAt);
    const replyTo = extractEmail_(data.contact);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Inquiry from Baozuan Website - ' + (data.name || 'Customer'),
      body,
      name: 'Baozuan Website',
      replyTo: replyTo || NOTIFY_EMAIL,
    });

    return jsonOutput_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonOutput_({ ok: false, error: String(error) });
  }
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      // Fall back to URL encoded parameters below.
    }
  }
  return (e && e.parameter) ? e.parameter : {};
}

function getSheet_() {
  if (!SHEET_ID || SHEET_ID === 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE') {
    throw new Error('Please replace SHEET_ID in Apps Script first.');
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'Received At',
    'Name',
    'Email / WhatsApp',
    'Product Requirement',
    'Page',
    'Country',
    'IP',
    'User Agent',
    'Timezone',
    'Submitted At',
  ]);
}

function buildEmailBody_(data, receivedAt) {
  return [
    'New Inquiry from Baozuan Website',
    '',
    'Received At: ' + receivedAt,
    'Name: ' + (data.name || ''),
    'Email / WhatsApp: ' + (data.contact || ''),
    '',
    'Product Requirement:',
    data.message || '',
    '',
    'Page: ' + (data.page || ''),
    'Country: ' + (data.country || ''),
    'IP: ' + (data.ip || ''),
    'User Agent: ' + (data.userAgent || ''),
  ].join('\n');
}

function extractEmail_(value) {
  const match = String(value || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : '';
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
