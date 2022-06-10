import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare let  jQuery:any;
declare var $:any;
declare var iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any= {};
  public usuario : any = {};
  public token : any = '';


  constructor(
    private _adminService:AdminService,
    private _router : Router

  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this._router.navigate(['/']);
    }else{
      //MANTENER EN EL COMPONENTE
    }
  }


  //Peticion http del login
  login(loginForm){
    if(loginForm.valid){
      console.log(this.user);

      //Resivir data del input y guardarla en el objeto
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      //Login traido del admin service, que utiliza el metodo del back
      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined){
            //Cartel de error
            iziToast.show({
              title: 'ERROR',
              titleColor:'#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
          });
        }else{
          this.usuario = response.data;


          localStorage.setItem('token', response.token);
          localStorage.setItem('_id', response.data._id);

          this._router.navigate(['/']);
        }
        },  
        error => {
          console.log(error)
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }
    
  }

}
