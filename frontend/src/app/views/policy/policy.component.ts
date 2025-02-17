import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment) => {
      const elementId = fragment === 'policyTitle' ? 'policyTitle' : 'agreementTitle';
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        })
      }
    });
  }

}
