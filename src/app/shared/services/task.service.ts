import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ITask} from '../interfaces/task.interface';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public url = 'https://todo-geotech-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient
  ) { }
  /**
   * @description: Guarda una nueva tarea
   */
  public addTask(todo: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.url}/tareas.json`, todo);
  }
  /**
   * @description: Trae el listado de todas las tareas
   */
  public getTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.url}/tareas.json`)
                    .pipe(
                      map( resp => this.convertArrayResponse(resp))
                    );
  }
  /**
   * @description: Actualiza el estado de la tarea
   */
  public updateTask(task: ITask): Observable<ITask> {
    const id: string = task.id;
    task.status = 1;
    // @ts-ignore
    delete task.id;
    return this.http.put<ITask>(`${this.url}/tareas/${id}.json`, task);
  }
  /**
   * @description: Elimina una tarea
   */
  public deleteTask(task: ITask): Observable<ITask> {
    const id: string = task.id;
    return this.http.delete<ITask>(`${this.url}/tareas/${id}.json`);
  }
  /**
   * @description: Convierte la respuesta de firebase a un arreglo de objetos
   */
  private convertArrayResponse(taskObj: Object): ITask[] {
    const task: ITask[] = [];
    Object.keys(taskObj).forEach(key => {
      // @ts-ignore
      const tasks: ITask = taskObj[key];
      tasks.id = key;
      task.push( tasks );
    });
    return task;
  }
}
