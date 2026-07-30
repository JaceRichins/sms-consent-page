/**
 * Optional true macros for the "Accountability – Goals & Group" sheet.
 * One-time install (owner only): open the sheet → Extensions → Apps Script →
 * paste this whole file → Save → reload the sheet. A "⚡ Coach" menu appears.
 * (Claude's Google connector can't attach scripts to files, hence the paste.)
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ Coach')
    .addItem('Add my goal starter block', 'addGoalBlock')
    .addItem('Add this week\'s commitment', 'addCommitment')
    .addToUi();
}

function addGoalBlock() {
  var ui = SpreadsheetApp.getUi();
  var name = ui.prompt('Your first name?').getResponseText().trim();
  if (!name) return;
  var sh = SpreadsheetApp.getActive().getSheetByName('Goals & Group');
  sh.appendRow(['GOAL', name, '(write your ONE 12-week objective)', '', 'OKR', '', '', 'active', '']);
  sh.appendRow(['KEY RESULT', name, '(measurable result #1, with a number)', 'Belongs to the objective above', 'OKR', '', '', 'active', '']);
  sh.appendRow(['KEY RESULT', name, '(measurable result #2, with a number)', 'Belongs to the objective above', 'OKR', '', '', 'active', '']);
  sh.appendRow(['SYSTEM', name, '(the daily action, e.g. 5 calls every workday)', 'The habit that drives the key results', 'Systems', '', 'weekdays', 'active', '']);
  ui.alert('4 starter rows added at the bottom — fill in the (parentheses) and you\'re live. The coach picks them up on its next morning run.');
}

function addCommitment() {
  var ui = SpreadsheetApp.getUi();
  var name = ui.prompt('Your first name?').getResponseText().trim();
  if (!name) return;
  var what = ui.prompt('This week\'s specific promise to the group?').getResponseText().trim();
  if (!what) return;
  var monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  var week = Utilities.formatDate(monday, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  SpreadsheetApp.getActive().getSheetByName('Goals & Group')
    .appendRow(['COMMITMENT', name, what, '', '12 Week Year', '', 'week of ' + week, 'active', '']);
}
