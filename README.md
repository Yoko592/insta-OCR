# insta-OCR

This repository contains a sample Google Apps Script project that extracts text from images stored in Google Drive. The script converts each image into a Google Doc using Drive's OCR capabilities and appends the recognized text to another document.

## Deployment

1. Create a new Apps Script project or clone the contents of the `apps-script/` folder into an existing project.
2. Copy the files from `apps-script/` into your project (`Code.js` and `appsscript.json`).
3. In the script editor, open **Services** from the left menu and enable the **Drive API** advanced service.
4. Set script properties `FOLDER_ID` (the Drive folder containing images) and `DOC_ID` (the document to collect OCR results).
5. Run `installQuarterHourlyTrigger()` once to create a trigger that executes `run()` every 15 minutes. Alternatively, you can run `run()` manually.

When `run()` executes, text is extracted from each image in the specified folder and appended to the destination document.
