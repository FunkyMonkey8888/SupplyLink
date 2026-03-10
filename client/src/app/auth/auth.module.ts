// import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";

// import { AuthRoutingModule } from "./auth-routing.module";
// import { ReactiveFormsModule } from "@angular/forms";
// import { HttpClientModule } from "@angular/common/http";

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     AuthRoutingModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//   ],
//   exports: [
    
//   ]
// })
// export class AuthModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'user', component: UserComponent }
    ]
  }
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent, UserComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
