import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileItems } from 'src/app/interfaces/profile-items';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    role: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    isActive: new FormControl(false),
    country: new FormControl('', Validators.maxLength(30)),
    experience: new FormControl('', Validators.maxLength(30))
  });

  atualizar = false;  
  id: string = ''; 

  constructor(private profileService: ProfileService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.atualizar = true;
        this.id = params['id'];
        this.loadProfile(this.id);
      }
    });
  }

  loadProfile(id: string) {
    this.profileService.findById(id).subscribe(result => {
      this.profileForm.patchValue(result); 
    });
  }

  registerProfile() {
    const profile = this.profileForm.value as ProfileItems;

    this.profileService.register(profile).subscribe(result => {
      Swal.fire({
        title: 'Cadastrado!',
        text: 'Perfil cadastrado com sucesso!',
        icon: 'success',
      });
      this.router.navigateByUrl('/profile');
    });
  }

  updateProfile() {
    const profile = this.profileForm.value as ProfileItems;
    profile.id = this.id;

    this.profileService.update(profile).subscribe(result => {
      Swal.fire({
        title: 'Atualizado!',
        text: 'Perfil atualizado com sucesso!',
        icon: 'success',
      });
      this.router.navigateByUrl('/profile');
    });
  }
}

