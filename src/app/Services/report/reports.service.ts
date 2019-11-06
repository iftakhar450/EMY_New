import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ExportToCsv } from 'export-to-csv';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }
  getmonthlySalaryData(date) {
    const url: any = environment.baseUrl + environment.monthlySalaryData;
    return this.http.post(url, date);
  }
  getDashboardData() {
    const url: any = environment.baseUrl + environment.dashboardData;
    return this.http.get(url);
  }
  exportAsCsv(data, title, headers, filename) {
    const options = {
      fieldSeparator: ',',
      filename: filename,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      // title: title,
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: headers   // Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }
}
