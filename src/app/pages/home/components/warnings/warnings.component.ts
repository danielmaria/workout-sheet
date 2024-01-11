import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss'],
})
export class WarningsComponent {
  @Input() warnings: string[] = [];
}
