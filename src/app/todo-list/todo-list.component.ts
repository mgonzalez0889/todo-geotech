import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {Observable, Subscription} from 'rxjs';
import {ITask} from '../shared/interfaces/task.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnChanges {
  public subscription$: Subscription | undefined;
  public task: ITask[] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadTask();
  }

  public loadTask(): void {
    this.subscription$ = this.taskService.getTask().subscribe(
      (res: ITask[]) => {
        this.task = res;
        console.log(this.task);
      }
    );

  }

  public onEdit(task: ITask): void {
    Swal.fire({
      title: 'Actualizar Tarea',
      text: '¿Esta seguro de marcar la tarea como completada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.updateTask(task).subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Guardado Con exito',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    });
  }

  public onDelete(task: ITask, i: number): void {
    Swal.fire({
      title: 'Eliminar Tarea',
      text: '¿Esta seguro de eliminar la tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.task.splice(i, 1);
        this.taskService.deleteTask(task).subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminado Con exito',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.loadTask();
    }
  }

}
