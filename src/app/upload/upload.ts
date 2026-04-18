import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultService } from '../../openapi/api/default.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.css'],
})
export class Upload {
  selectedFile: File | null = null;
  previewData: any[] = [];
  previewKeys: string[] = [];
  uploadbtn = false

  user_type : any
  constructor(private http: HttpClient,private service: DefaultService, private router: Router) {      
    if (typeof window !== 'undefined' && sessionStorage) {
      this.user_type = sessionStorage.getItem('User_type') || '';
      if (this.user_type != 'Admin') {
        this.router.navigate(['/home']);
      }
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,')
    if (!this.selectedFile) {
      return;
    }

  // ✅ Check file type by extension or MIME type
  const validExtensions = ['.xlsx', '.xls'];
  const fileName = this.selectedFile.name.toLowerCase();
  const isExcel = validExtensions.some(ext => fileName.endsWith(ext));

  // if (!isExcel) {
  //   console.error('Invalid file type. Please upload an Excel file (.xlsx or .xls).');
  //   this.selectedFile = null;
  //   return;
  // }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.previewData = XLSX.utils.sheet_to_json(worksheet);
      this.previewKeys = Object.keys(this.previewData[0] || {});
      this.uploadbtn = false
      if(this.previewData.length>0){
        this.uploadbtn = true
      }
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        (error.message as string).includes('XLSX')
      ) {
        console.error('Error parsing Excel file:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };
  reader.readAsArrayBuffer(this.selectedFile);
}

  onUpload() {
  const formData = new FormData();
  if (!this.selectedFile) return;
  formData.append("file", this.selectedFile);
  this.service.uploadUploadPost(this.user_type, this.selectedFile).subscribe({
    next: response => console.log('Upload success:', response),
    error: error => console.error('Upload error:', error),
  });
}
}