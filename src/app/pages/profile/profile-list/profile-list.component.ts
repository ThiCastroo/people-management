import { Component, Input } from '@angular/core';
import { ProfileItems } from 'src/app/interfaces/profile-items';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {

  constructor(private profileService: ProfileService) { }

  @Input() profiles: ProfileItems[] = [];

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    this.profileService.findAll().subscribe(result => {
      this.profiles = result;
    });
  }

  confirmDelete(id: string) {
    Swal.fire({
      title: "Tem certeza que deseja excluir essa pessoa?",
      text: "Você não poderá reverter essa operação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProfile(id);
      }
    });
  }

  deleteProfile(id: string) {
    this.profileService.deleteProfile(id).subscribe(() => {
      this.loadProfiles();
      Swal.fire({
        title: "Removido!",
        text: "A pessoa foi removida com sucesso.",
        icon: "success"
      });
    });
  }
}
