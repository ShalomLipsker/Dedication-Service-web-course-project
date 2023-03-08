import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DedicationService } from 'src/app/services/dedication.service';

@Component({
  selector: 'app-dedication-list',
  templateUrl: './dedication-list.component.html',
  styleUrls: ['./dedication-list.component.scss'],
})
export class DedicationListComponent implements OnInit {
  onlyActive = false;

  constructor(
    public dedicationService: DedicationService,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit(): void {}

  navigateToCreate() {
    this.router.navigate(['dedication', 'create']);
  }
}
