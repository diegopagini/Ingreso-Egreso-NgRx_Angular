import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroFrom = this.fb.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  crearUsuario() {
    if (this.registroFrom.invalid) {
      return;
    }
    const { nombre, correo, password } = this.registroFrom.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this.router.navigate(["/"]);
      })
      .catch((err) => console.error(err));
  }
}
