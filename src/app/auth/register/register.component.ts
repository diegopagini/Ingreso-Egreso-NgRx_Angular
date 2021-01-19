import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroFrom: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registroFrom = this.fb.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  crearUsuario() {
    console.log(this.registroFrom.valid, this.registroFrom.value);
  }
}
