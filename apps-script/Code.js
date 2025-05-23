function extractTextFromImages(imageIds) {
  var results = {};
  imageIds.forEach(function(id) {
    var file = DriveApp.getFileById(id);
    var blob = file.getBlob();
    var resource = {
      title: file.getName(),
      mimeType: 'application/vnd.google-apps.document'
    };
    var docFile = Drive.Files.insert(resource, blob, {ocr: true});
    var doc = DocumentApp.openById(docFile.id);
    results[id] = doc.getBody().getText();
    Drive.Files.remove(docFile.id);
  });
  return results;
}

function installQuarterHourlyTrigger() {
  ScriptApp.newTrigger('run').timeBased().everyMinutes(15).create();
}

function run() {
  var folderId = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');
  var docId = PropertiesService.getScriptProperties().getProperty('DOC_ID');
  if (!folderId || !docId) {
    throw new Error('FOLDER_ID and DOC_ID must be set in script properties.');
  }
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var imageIds = [];
  while (files.hasNext()) {
    var f = files.next();
    if (f.getMimeType().match('image/')) {
      imageIds.push(f.getId());
    }
  }
  var texts = extractTextFromImages(imageIds);
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  Object.keys(texts).forEach(function(id) {
    body.appendParagraph('Text extracted from file ID: ' + id);
    body.appendParagraph(texts[id]);
    body.appendHorizontalRule();
  });
}
