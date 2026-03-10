// src/app/auth/components/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['USER', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    this.auth.createUser(this.userForm.value).subscribe({
      next: () => {
        this.message = 'User created';
        this.userForm.reset({ role: 'USER' });
      },
      error: () => (this.message = 'Failed to create user')
    });
  }
}