import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;

   @Output() toggleStatus = new EventEmitter<Task>();

   @Output() edit = new EventEmitter<Task>();

   @Output() delete = new EventEmitter<Task>();

  handleToggleStatus() {
    this.toggleStatus.emit(this.task);
    console.log('Task status toggled:', this.task.id, this.task.status);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task);
  }

  priorityColor(priority: number): string {
    switch (priority) {
      case 1: return '#e53935';
      case 2: return '#fb8c00';
      case 3: return '#43a047';
      default: return '#ccc';
    }
  }

  priorityName(priority: number): string {
    switch (priority) {
      case 1: return 'Alta';
      case 2: return 'Média';
      case 3: return 'Baixa';
      default: return '';
    }
  }
}
