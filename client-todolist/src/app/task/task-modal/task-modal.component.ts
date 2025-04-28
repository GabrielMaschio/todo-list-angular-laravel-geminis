import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit, OnChanges {
  taskForm!: FormGroup;

  @Input() isOpen = false;
  @Input() isEditMode = false;
  @Input() task: Task = { id: 0, title: '', description: '', priority: 1, status: false };
  @Output() save = new EventEmitter<Task>();
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      description: new FormControl(this.task.description, [Validators.required, Validators.minLength(8), Validators.maxLength(160)]),
      priority: new FormControl(this.task.priority, [Validators.required]),
    });
  }

  ngOnChanges() {
    if (this.taskForm) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        status: this.task.status
      });
    }
  }

  get title() {
    return this.taskForm.get('title')!;
  }

  get description() {
    return this.taskForm.get('description')!;
  }

  get priority() {
    return this.taskForm.get('priority')!;
  }

  submitForm() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.task = { ...this.taskForm.value, id: this.task.id };

    this.save.emit(this.task);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
