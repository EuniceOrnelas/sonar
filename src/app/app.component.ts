import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'copilot-project';
  imageForm: FormGroup;
  completionForm: FormGroup;
  code;
  image = '';
  prompt = '';
  role = "";
  message = '';
  typing=false;
  chatArray = [];
  userArray = [];
  constructor(private appService: AppServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.imageForm = this.fb.group({
      prompt: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      size: ['medium', Validators.compose([Validators.required])]
    });
    this.completionForm = this.fb.group({
      textPrompt: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }

  generateImage(prompt: string) {
    console.log(this.imageForm.value);
    this.appService.generateImage(prompt).subscribe((response: { success, data }) => {
      console.log('Response from API is:', response);
      this.image = response.data;
    }, (error) => {
      console.log('Error from API is', error);
    });
  }

  createCompletion() {
    this.code = '';
    this.message = this.completionForm.value.textPrompt;
    this.chatArray.push({ code: this.completionForm.value.textPrompt, role: 'user' });
    this.completionForm.controls.textPrompt.setValue('');
    console.log(this.completionForm.value);
    this.typing=true;
    this.appService.createCompletion(this.message).subscribe((response: { success, data }) => {
      console.log('Response from API is:', response);
      this.code = response.data.content;
      this.role = response.data.role;
      console.log(this.code.split('<PROMPT>:', 2));
      this.code = this.code.split('<PROMPT>:', 2);
      this.typing=false;
      this.chatArray.push({ code: this.code[0], role: this.role });
      if (this.code[1]) {
        this.generateImage(this.code[1]);
      }
    }, (error) => {
      console.log('Error from API is', error);
    });
    console.log(this.chatArray);
  }

}
