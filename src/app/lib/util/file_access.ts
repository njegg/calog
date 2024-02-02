const app = require("tns-core-modules/application");
const encoder = new TextEncoder();

const CREATE_FILE_AND_WRITE_REQUEST = 69;

let global_data: number[]; // TODO: better way to pass data?

export function writeToPickedFile(fileName: string, data: any) {
  let createAFileIntent = intentToPickCreateFile(fileName);

  global_data = anyToBytes(data);

  const activity = app.android.foregroundActivity || app.android.startActivity;
  activity.startActivityForResult(createAFileIntent, CREATE_FILE_AND_WRITE_REQUEST);
}

// https://developer.android.com/training/data-storage/shared/documents-files#edit
app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
    if (args.requestCode == CREATE_FILE_AND_WRITE_REQUEST) {
      if (args.intent) {
        let uri: java.net.URI = args.intent.getData();

        writeBytesToUri(uri, global_data);

        global_data = [];
      }
    } else {
      throw 'activity failed';
    }
  }
);

function intentToPickCreateFile(fileName: string): android.content.Intent {
  let intent = new android.content.Intent(android.content.Intent.ACTION_CREATE_DOCUMENT);
  intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
  intent.setType("application/json");
  intent.putExtra(android.content.Intent.EXTRA_TITLE, fileName);

  return intent;
}

function writeBytesToUri(uri: java.net.URI, bytes: number[]): [boolean, any] {
  try {
    let pfd: android.os.ParcelFileDescriptor = app.android.nativeApp
      .getContentResolver()
      .openFileDescriptor(uri, "w");

    let fileOutputStream: java.io.FileOutputStream =
      new java.io.FileOutputStream(pfd.getFileDescriptor());

    fileOutputStream.write(bytes);

    fileOutputStream.close();
    pfd.close();
  } catch (e) {
    return [false, e];
  }

  return [true, undefined];
}

// TODO: a: num[] = string
function anyToBytes(object: any): number[] {
  return Array.from(encoder.encode(JSON.stringify(object)));
}

