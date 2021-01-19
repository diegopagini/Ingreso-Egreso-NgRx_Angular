import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

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

    Swal.fire({
      title: "Espere por favor",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const { nombre, correo, password } = this.registroFrom.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  }
}
