import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../../task/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskFilterComponent } from '../../task/task-filter/task-filter.component';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { TaskModalComponent } from "../../task/task-modal/task-modal.component";

@Component({
  selector: 'app-task-layout',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, HttpClientModule, TaskFilterComponent, TaskModalComponent],
  providers: [TaskService],
  templateUrl: './task-layout.component.html',
  styleUrl: './task-layout.component.scss'
})
export class TaskLayoutComponent {
  protected tasks: Task[] = [];
  protected errorMessage: string = '';
  isModalOpen = false;
  isEditMode = false;
  currentTask: Task = { id: 0, title: '', description: '', priority: 1, status: false };

  constructor(private readonly taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(status?: number, priority?: number) {
    this.taskService.getTasks(status, priority).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  applyFilter(filter: { status?: number; priority?: number }) {
    this.getTasks(filter.status, filter.priority);
  }

  handleToggleStatus(task: Task) {
    const newStatusBool = !task.status;
    this.taskService.toggleTask(task.id, { status: newStatusBool ? 1 : 0 }).subscribe(
      () => this.getTasks()
    );
  }

  handleEdit(task: Task) {
    this.isEditMode = true;
    this.currentTask = { ...task };
    this.isModalOpen = true;
  }

  handleDelete(task: Task) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter(t => t.id !== task.id);
            Swal.fire('Excluído!', 'A tarefa foi excluída com sucesso.', 'success');
          },
          error: (error) => {
            this.errorMessage = error.message || 'Ocorreu um erro ao excluir a tarefa';
            Swal.fire('Erro', this.errorMessage, 'error');
          }
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'A tarefa não foi excluída.', 'error');
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentTask = { id: 0, title: '', description: '', priority: 1, status: false };
    this.isModalOpen = true;
  }

  openEditModal(task: Task) {
    this.isEditMode = true;
    this.currentTask = { ...task };
    this.isModalOpen = true;
  }

  handleSave(task: Task) {
    if (this.isEditMode) {
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.getTasks();
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        this.getTasks();
      });
    }

    this.isModalOpen = false;
  }
}


