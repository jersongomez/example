import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  constructor(private http: HttpClient) {}

  public downloadFile(filename: string) {
    const url = `${window.location.href}/assets/documents?filename=${filename}`;
    return this.http.get(url, {
      responseType: 'arraybuffer',
    });
  }
}
