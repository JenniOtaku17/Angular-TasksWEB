
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  Person: any;
  ActualPerson: any;
  tasks: any;
  tasksForm: FormGroup;
  updateForm: FormGroup;

  constructor(private tasksService : TasksService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ListPerson();

    this.tasksForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.updateForm = this.formBuilder.group({
      taskID: [''],
      title: [''],
      description: [''],
      date: ['']
    });

  }

  ListPerson(){
    this.tasksService.ListPerson().subscribe( z =>{
      this.Person = z;
      console.log(z);
    })
  }

  ChangePerson( person : any){
    this.ActualPerson = person;
    this.tasksService.ListTasks(this.ActualPerson.personID).subscribe( z =>{
      this.tasks = z;
      console.log(z);
    })
  }

  CreateTask(){
    const title =  this.tasksForm.value.title;
    const description =  this.tasksForm.value.description;
    const personID =  this.ActualPerson.personID;
    
    let newTask = {
      "title" : title,
      "description" : description,
      "personID" : personID
    }

    this.tasksService.Add(newTask).subscribe( z=>{
      console.log(z);
      this.ChangePerson( this.ActualPerson );
      this.tasksForm.reset();
    })
  }

  TaskToUpdate(task: any){
    this.updateForm.controls['taskID'].setValue(task.taskID);
    this.updateForm.controls['title'].setValue(task.title);
    this.updateForm.controls['description'].setValue(task.description);
    this.updateForm.controls['date'].setValue(task.date);
  }

  UpdateTask(){
    const taskID = this.updateForm.value.taskID;
    const title =  this.updateForm.value.title;
    const description =  this.updateForm.value.description;
    const personID =  this.ActualPerson.personID;
    const date = this.updateForm.value.date;
    
    let updatedTask = {
      "taskID" : taskID,
      "title" : title,
      "description" : description,
      "date" : date,
      "personID" : personID
    }

    this.tasksService.Update(updatedTask).subscribe( z=>{
      console.log(z);
      this.ChangePerson( this.ActualPerson );
      let elemento = document.getElementById('close')
      elemento.click();
    })
  }

  DeleteTask( ID: number){
    this.tasksService.Delete(ID).subscribe( z=>{
      console.log(z);
      this.ChangePerson( this.ActualPerson );
    })
  }

}
