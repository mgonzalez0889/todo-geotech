import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../shared/services/task.service';
import {ITask} from '../shared/interfaces/task.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: '',
      description: '',
      status: '0'
    });
  }

  public onSaveTodo(): void {
    if (this.form.valid) {
      const data: ITask = this.form.getRawValue();
      Swal.fire({
        title: 'Guardar Tarea',
        text: '¿Esta seguro de guardar una nueva tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Guardar',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.taskService.addTask(data).subscribe(
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
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El formulario esta vacio',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
      });
    }
  }

}
