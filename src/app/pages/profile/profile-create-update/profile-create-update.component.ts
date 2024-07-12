import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileItems } from 'src/app/interfaces/profile-items';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {

  constructor(private profileService: ProfileService, private router: Router) { }

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    role: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    isActive: new FormControl(false),
    country: new FormControl('', Validators.maxLength(30)),
    experience: new FormControl('', Validators.maxLength(30))
  });

  onSubmit() {
    const profile = this.profileForm.value as ProfileItems;
    console.log(profile)
    this.profileService.register(profile).subscribe(result => {
      console.log(result)
      Swal.fire({
        title: 'Cadastrado!',
        text: 'Pessoa cadastrada com sucesso!',
        icon: 'success',
      })
      this.router.navigateByUrl('/profile')
    });
  }
}
