import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import data from '../../../assets/data/data.json';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {


  title:string = "";
  questions:any;
  questionSelected:any;
  answers:string[] = [];
  answerSelected:string []= [];
  questionIndex:number = 0;
  questionMaxIndex:number = 0;
  finish:boolean = false;
  result:string = "";

  constructor(){  }

  ngOnInit(): void {
    this.title = data.title;
    this.questions = data.questions;
    this.questionMaxIndex = this.questions.length;
    this.questionSelected = this.questions[this.questionIndex].question;
  }

  currentOption(current:any) {
    if(!this.finish){
      this.answers.push(current.alias);
      this.answerSelected.push(current.name)

      if(this.questionIndex < this.questionMaxIndex-1){
        this.questionIndex++;
      }
      else{
        this.finish = true;
        this.result = data.results[this.resultQuestion(this.answers) as keyof typeof data.results ];
      }
      this.questionSelected = this.questions[this.questionIndex].question;
    }
  }

  resultQuestion(array:string []):string{
    array.sort()
    const result = array.reduce((previous, current, index, currentArray)=>{
      if(currentArray.filter(value => value == previous).length > currentArray.filter(value => value == current).length){
        return previous;
      }else{
        return current;
      }
    })
    return result;
  }

}
