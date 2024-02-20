import {Injectable} from '@angular/core';
import {forkJoin, from, Observable} from "rxjs";
import {encode} from "base64-arraybuffer";
import * as SparkMD5 from 'spark-md5';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ImageConverterService {
  getBase64EncodedFileData(file: File): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        const { result } = reader;
        const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
        const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string

        observer.next(base64Encoded);
        observer.complete();
      };

      reader.onerror = () => {
        observer.error(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  getMd5HashForFile(file: File, base64Encode = false): Observable<string> {
    return from(this.computeChecksumMd5(file, base64Encode));
  }

  private computeChecksumMd5(file: File, encode = false): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunkSize = 2097152;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();

      let cursor = 0;

      fileReader.onerror = function (): void {
        reject('MD5 computation failed - error reading the file');
      };

      function processChunk(chunkStart: number): void {
        const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
        fileReader.readAsArrayBuffer(file.slice(chunkStart, chunkEnd));
      }

      fileReader.onload = function (e: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        spark.append(e.target.result);
        cursor += chunkSize;

        if (cursor < file.size) {
          processChunk(cursor);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          resolve(spark.end(encode));
        }
      };

      processChunk(0);
    });
  }

  getPostBodyForFileUpload(file: File, vehicleUid: string, sequenceNo: number): Observable<any> {
    const encodeHash = false;

    const data$ = this.getBase64EncodedFileData(file);
    const md5$ = this.getMd5HashForFile(file, encodeHash);

    return forkJoin([data$, md5$]).pipe(
      map(([imageData, imageMd5]) => ({ imageData, imageMd5, vehicleUid, sequenceNo })),
    );
  }
}
