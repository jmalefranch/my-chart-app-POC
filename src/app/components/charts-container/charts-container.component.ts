import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-charts-container',
  templateUrl: './charts-container.component.html',
  styleUrls: ['./charts-container.component.scss']
})

export class ChartsContainerComponent {
  @Input() showGenderChart: boolean = true;
  @Input() showCountryChart: boolean = true;
}
