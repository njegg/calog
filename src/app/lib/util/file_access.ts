import { importUserData, UserData } from "./user_data";

const app = require("tns-core-modules/application");
const encoder = new TextEncoder();

// TODO: error handling how

const CREATE_FILE_AND_WRITE_REQUEST = 69;
const PICK_A_FILE_WITH_USER_DATA_AND_IMPORT = 420;

let sharedDataBuffer: number[];

// TODO: cant return the file from here because of the fucking event listener, should
// use a promise or something to return the shared buffer somehow
export function pickAndImportUserData(): void {
  let intent = new android.content.Intent(android.content.Intent.ACTION_OPEN_DOCUMENT);
  intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
  intent.setType("application/json");

  try {
    const activity = app.android.foregroundActivity || app.android.startActivity;
    activity.startActivityForResult(intent, PICK_A_FILE_WITH_USER_DATA_AND_IMPORT);
  } catch (error) {
    console.error(error);
  }
}

export function writeToPickedFile(fileName: string, data: any): void {
  let intent = new android.content.Intent(android.content.Intent.ACTION_CREATE_DOCUMENT);
  intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
  intent.setType("application/json");
  intent.putExtra(android.content.Intent.EXTRA_TITLE, fileName);

  sharedDataBuffer = anyToBytes(data);

  try {
    const activity = app.android.foregroundActivity || app.android.startActivity;
    activity.startActivityForResult(intent, CREATE_FILE_AND_WRITE_REQUEST);
  } catch (error) {
    console.error(error);
  }
}

// https://developer.android.com/training/data-storage/shared/documents-files#edit
app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
    if (args.requestCode == CREATE_FILE_AND_WRITE_REQUEST) {
      if (args.intent) {
        let uri: java.net.URI = args.intent.getData();
        writeBytesToUri(uri, sharedDataBuffer);

        sharedDataBuffer = [];
      }
    } else if (args.requestCode == PICK_A_FILE_WITH_USER_DATA_AND_IMPORT) {
      if (args.intent) {
        let uri: java.net.URI = args.intent.getData();

        let fileContent = readFileFromUri(uri);
        let userData: UserData = JSON.parse(fileContent);

        importUserData(userData);
      }
    } else {
      console.error(`no handler for requestCode ${args.requestCode}, args:`);
      console.error(args)
    }
  }
);

function readFileFromUri(uri: java.net.URI): string {
    let inputStream: java.io.InputStream = app.android.nativeApp
            .getContentResolver()
            .openInputStream(uri);

    let bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
    let stringBuilder = new java.lang.StringBuilder();

    while (true) {
      let line = bufferedReader.readLine();

      if (line == null) break;

      stringBuilder.append(line);
    }

    bufferedReader.close();
    inputStream.close();

    return stringBuilder.toString();
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

function anyToBytes(object: any): number[] {
  return Array.from(encoder.encode(JSON.stringify(object)));
}

