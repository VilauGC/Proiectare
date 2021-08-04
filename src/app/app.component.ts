import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doc } from './doc.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Proiectare';

  constructor(private http: HttpClient) {}

  onCreatePost(postData: Doc) {
    this.http
      .post('http://localhost:8080/generareDocument', postData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'blob',
      })
      .subscribe((responseData) => {
        const contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const blob = new Blob([responseData], {type: contentType});
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'Memoriu_De_Rezistenta.docx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }
}
