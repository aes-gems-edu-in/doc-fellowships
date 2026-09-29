/**
 * DocTutorials Fellowship — Google Apps Script
 *
 * Saves form leads into Google Sheet tab: fellowship
 *
 * SETUP:
 * 1. Paste this file → Save
 * 2. Confirm SPREADSHEET_ID below
 * 3. Run setupSheet() once (Authorize Sheets + Drive)
 * 4. Deploy → Manage deployments → Edit → New version → Deploy
 *    Execute as: Me | Who has access: Anyone
 */

var SPREADSHEET_ID = "1EsXz8_D4vF38tZPdZgHOnyICVSRUeFU5Fu0Fbhd8E8s";
var SHEET_NAME = "fellowship";

var HEADERS = [
  "Full Name",
  "Phone",
  "Email",
  "Specialty",
  "City",
  "Date",
];

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.fullName) {
      saveLead_(e.parameter);
      return htmlOk_("Saved");
    }
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    return htmlOk_(
      "OK — API running. Sheet: " + ss.getUrl() + " | Tab: " + SHEET_NAME
    );
  } catch (err) {
    return htmlOk_("ERROR: " + err.message);
  }
}

function doPost(e) {
  try {
    var data = parseRequest_(e);
    saveLead_(data);
    return htmlOk_("Lead saved");
  } catch (err) {
    return htmlOk_("ERROR: " + (err && err.message ? err.message : err));
  }
}

function setupSheet() {
  var sheet = getOrCreateTab_();
  Logger.log("Ready: " + sheet.getParent().getUrl() + " tab=" + sheet.getName());
  return sheet.getParent().getUrl();
}

function saveLead_(data) {
  var fullName = String((data && data.fullName) || "").trim();
  var phone = String((data && data.phone) || "").trim();
  var email = String((data && data.email) || "").trim();
  var specialty = String((data && data.specialty) || "").trim();
  var city = String((data && data.city) || "").trim();

  if (!fullName || !phone || !email || !specialty) {
    throw new Error("Missing required fields");
  }

  var sheet = getOrCreateTab_();
  var now = new Date();

  sheet.appendRow([
    fullName,
    phone.indexOf("+") === 0 ? phone : "+91" + phone,
    email,
    specialty,
    city || "-",
    now,
  ]);

  // Format last column (Date) as dd/MM/yyyy HH:mm
  var row = sheet.getLastRow();
  var dateCell = sheet.getRange(row, HEADERS.length);
  dateCell.setNumberFormat("dd/MM/yyyy HH:mm");
  dateCell.setValue(now);
}

function getOrCreateTab_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // If fellowship tab missing, use the first sheet (after Sheet1 removed)
  if (!sheet) {
    sheet = ss.getSheets()[0] || ss.insertSheet(SHEET_NAME);
    try {
      sheet.setName(SHEET_NAME);
    } catch (err) {
      // name already exists / cannot rename
    }
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.getRange("F:F").setNumberFormat("dd/MM/yyyy HH:mm");
  } else {
    var first = String(sheet.getRange(1, 1).getValue() || "");
    if (first !== HEADERS[0]) {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    sheet.getRange("F:F").setNumberFormat("dd/MM/yyyy HH:mm");
  }

  return sheet;
}

function parseRequest_(e) {
  var out = {};

  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function (key) {
      out[key] = e.parameter[key];
    });
  }

  if (e && e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    try {
      var json = JSON.parse(raw);
      Object.keys(json).forEach(function (key) {
        out[key] = json[key];
      });
    } catch (err) {
      // form-urlencoded already in e.parameter
    }
  }

  return out;
}

function htmlOk_(message) {
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><body>" + message + "</body></html>"
  );
}
