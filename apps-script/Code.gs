/**
 * DocTutorials Fellowship — Google Apps Script
 *
 * Direct save to YOUR Google Sheet (sheets.google.com).
 *
 * SETUP:
 * 1. Open your Google Sheet in browser
 * 2. Copy ID from URL:
 *    https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 * 3. Paste that ID below in SPREADSHEET_ID
 * 4. Create a tab named exactly: fellowship  (or script will create it)
 * 5. Paste this file in Apps Script → Save
 * 6. Run setupSheet() once (Authorize)
 * 7. Deploy → Manage deployments → Edit → New version → Deploy
 */

// ★ Paste your Google Sheet ID here (from the Sheet URL)
var SPREADSHEET_ID = "1EsXz8_D4vF38tZPdZgHOnyICVSRUeFU5Fu0Fbhd8E8s";

var SHEET_NAME = "fellowship";

var HEADERS = [
  "Timestamp",
  "Full Name",
  "Phone",
  "Email",
  "Specialty",
  "City",
  "Source",
];

function doGet() {
  var ss = getSpreadsheet_();
  return jsonResponse({
    ok: true,
    message: "DocTutorials Fellowship Leads API is running",
    sheetUrl: ss.getUrl(),
    sheetName: SHEET_NAME,
  });
}

function doPost(e) {
  try {
    var data = parseRequest_(e);

    var fullName = String(data.fullName || "").trim();
    var phone = String(data.phone || "").trim();
    var email = String(data.email || "").trim();
    var specialty = String(data.specialty || "").trim();
    var city = String(data.city || "").trim();
    var source = String(data.source || "fellowship-website").trim();

    if (!fullName || !phone || !email || !specialty) {
      return jsonResponse({
        ok: false,
        error: "Missing required fields: fullName, phone, email, specialty",
      });
    }

    var sheet = getOrCreateTab_();
    sheet.appendRow([
      new Date(),
      fullName,
      phone.indexOf("+") === 0 ? phone : "+91" + phone,
      email,
      specialty,
      city || "-",
      source,
    ]);

    return jsonResponse({
      ok: true,
      message: "Lead saved successfully",
      sheetUrl: sheet.getParent().getUrl(),
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err && err.message ? err.message : err),
    });
  }
}

/** Run once — opens your Sheet and prepares the fellowship tab. */
function setupSheet() {
  var ss = getSpreadsheet_();
  var sheet = getOrCreateTab_();
  Logger.log("SHEET URL: " + ss.getUrl());
  Logger.log("TAB: " + sheet.getName());
  return ss.getUrl();
}

function getSpreadsheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SHEET_ID_HERE") {
    throw new Error(
      "Set SPREADSHEET_ID in Code.gs to your Google Sheet ID from the URL."
    );
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getOrCreateTab_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  var firstCell = sheet.getRange(1, 1).getValue();
  if (sheet.getLastRow() === 0 || firstCell !== HEADERS[0]) {
    if (sheet.getLastRow() > 0) {
      sheet.clear();
    }
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function parseRequest_(e) {
  if (!e) return {};

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // fall through
    }
  }

  if (e.parameter) {
    return e.parameter;
  }

  return {};
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
