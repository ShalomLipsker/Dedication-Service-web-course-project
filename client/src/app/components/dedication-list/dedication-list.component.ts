import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DedicationService } from 'src/app/services/dedication.service';

@Component({
  selector: 'app-dedication-list',
  templateUrl: './dedication-list.component.html',
  styleUrls: ['./dedication-list.component.scss'],
})
export class DedicationListComponent implements OnInit {
  onlyActive: boolean = false;

  constructor(
    public dedicationService: DedicationService,
    public router: Router,
  ) {}

  ngOnInit(): void {}

  navigateToCreate() {
    this.router.navigate(['dedication', 'create']);
  }
}
