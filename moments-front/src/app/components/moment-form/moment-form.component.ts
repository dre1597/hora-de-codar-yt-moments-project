import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Moment } from '../../Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;
  @Output() onSubmit: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.momentData ? this.momentData.description : '',
        [Validators.required]
      ),
      image: new FormControl(''),
    });
  }

  get title(): AbstractControl {
    return this.momentForm.get('title')!;
  }

  get description(): AbstractControl {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit(): void {
    if (this.momentForm.invalid) return;

    this.onSubmit.emit(this.momentForm.value);
  }
}
