import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  isLoading = true
  folders: any[] = []

  constructor(private dataService: DataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllFolders()
  }

  getAllFolders() {
    this.dataService.getAllFolders().subscribe((response: any) => {
      this.folders = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  trackById(index: number, item: any) {
    return item.id
  }
}
