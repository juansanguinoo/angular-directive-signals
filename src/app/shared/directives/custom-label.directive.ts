import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;

    this.htmlElement.nativeElement.innerHTML = 'Hola mundo';
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    for (const error of errors) {
      console.log(this._errors['minlength']);
      switch (error) {
        case 'required':
          this.htmlElement.nativeElement.innerText = 'El campo es requerido';
          return;

        case 'minlength':
          this.htmlElement.nativeElement.innerText = `El campo debe contener mínimo ${this._errors['minlength'].requiredLength} cáracteres`;
          return;

        case 'email':
          this.htmlElement.nativeElement.innerText = `Ingrese un email válido`;
          return;
      }
    }

    return null;
  }
}
