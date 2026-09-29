/**
 * DocTutorials Fellowship — Google Apps Script
 *
 * SETUP:
 * 1. Google Drive → New → Google Sheets → name it "Fellowship Leads"
 * 2. Extensions → Apps Script → paste this whole file → Save
 * 3. Run setupSheet() once (Authorize when prompted)
 * 4. Deploy → New deployment → Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the Web App URL → put in .env as:
 *      REACT_APP_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
 * 6. Restart npm start
 *
 * Sheet → File → Download → Microsoft Excel (.xlsx) for Excel export.
 */

var SHEET_NAME = "Leads";

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
  return jsonResponse({
    ok: true,
    message: "DocTutorials Fellowship Leads API is running",
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

    var sheet = getOrCreateSheet_();
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
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err && err.message ? err.message : err),
    });
  }
}

/** Run once from Apps Script editor to create headers. */
function setupSheet() {
  var sheet = getOrCreateSheet_();
  return "Sheet ready: " + sheet.getName();
}

/** Optional: download current sheet as Excel (.xlsx) to your Drive. */
function exportSheetAsExcel() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    ss.getId() +
    "/export?format=xlsx";

  var blob = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
  }).getBlob().setName(ss.getName() + ".xlsx");

  var file = DriveApp.createFile(blob);
  return file.getUrl();
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function parseRequest_(e) {
  if (!e) return {};

  // JSON body (recommended from React)
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // form-urlencoded fallback
    }
  }

  // Form / query params fallback
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
