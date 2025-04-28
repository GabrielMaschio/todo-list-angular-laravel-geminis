import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent implements OnInit {
  filterForm!: FormGroup;

  @Output() filterChanged = new EventEmitter<{ status?: number; priority?: number }>();

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      priority: new FormControl('')
    });
  }

  applyFilters(): void {
    const { status, priority } = this.filterForm.value;
    this.filterChanged.emit({
      status: status === '' ? undefined : +status,
      priority: priority === '' ? undefined : +priority
    });
  }
}
