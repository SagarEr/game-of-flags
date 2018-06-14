import { CountriesService } from './../countries.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css','../../../node_modules/flag-icon-css/css/flag-icon.css']
})
export class FlagComponent implements OnInit {
  randomNationName="";
  randomNationISOCode="";
  myGuess="";
  option=[];
  a=[0,1,2,3];
  mode=1;
  score=0;
  constructor(private cService : CountriesService) { }

  ngOnInit() {
  }
 
  next()
  {
    this.mode=0;
    let countries=this.cService.getCountries();
    let random=Math.floor(Math.random()*countries.length);
    this.randomNationName=countries[random].name;
    this.randomNationISOCode=countries[random]['alpha-2'];
    console.log(this.randomNationISOCode,this.randomNationName);
    let randomNumber=Math.floor(Math.random()*4);
    for(let i=0;i<4;i++)
    {
      if(i==randomNumber)
      {
        this.option[i]=this.randomNationName;
      }
      else{
      let randomOption=Math.floor(Math.random()*countries.length);
      this.option[i]=countries[randomOption].name;
      }
    }
  }
  compare(ind)
  {
    if(this.option[ind]==this.randomNationName)
    {
      this.myGuess="Correct";
      this.score++;
    }
    else{
      this.myGuess="InCorrect";
    }
    this.next();
  }

  onFinished()
  {
    this.mode=1;
    this.option=[];
    this.myGuess="";
    
  }
  onStart()
  {
    this.score=0;
  }

}
