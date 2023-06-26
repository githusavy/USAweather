import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lookup-history',
  templateUrl: './lookup-history.component.html',
  styleUrls: ['./lookup-history.component.css'],
})
export class LookupHistoryComponent {
  @Input() lookupHistory: any[] = [];

  displayedColumns: string[] = ['serialNumber', 'city', 'datetime'];
  currentPage = 1;
  pageSize = 10;

  dataSource!: MatTableDataSource<any>;

  ngOnChanges(): void {
    this.currentPage = 1;
    this.updateDataSource();
  }

  onPageChange(page: number): void {
    const totalPages = this.getTotalPages();
    if (page < 1 || page > totalPages) {
      return;
    }
    this.currentPage = page;
    this.updateDataSource();
  }

  getTotalPages(): number {
    return Math.ceil(this.lookupHistory.length / this.pageSize);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  private updateDataSource(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.lookupHistory.slice(startIndex, endIndex);

    // Generate serial numbers for the current page
    const pageSerialNumbers = pageData.map((_, index) => this.getSerialNumber(index));

    // Update the data source with the appropriate slice of lookupHistory and serial numbers
    this.dataSource = new MatTableDataSource(pageData.map((item, index) => ({
      ...item,
      serialNumber: pageSerialNumbers[index]
    })));
  }
}
