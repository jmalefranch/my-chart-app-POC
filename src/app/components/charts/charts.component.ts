import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../../services/api-service.service';

type User = {
 gender: string;
 location: Record<string, string>;
};

@Component({
 selector: 'app-charts',
 templateUrl: './charts.component.html',
 styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
 @ViewChild('genderchart') canvasGenderRef!: ElementRef;
 @ViewChild('countrychart') canvasCountryRef!: ElementRef;

 @Input() showGenderChart: boolean = true;
 @Input() showCountryChart: boolean = true;

 genderChart: any;
 countryChart: any;

 constructor(private readonly apiService: ApiService) {}

 ngOnInit() {
    this.apiService.getChartData().subscribe(data => {
      console.log('esto es apiService: ', data);
      if (this.showGenderChart) {
        this.generateChartByGender(data);
      }
      if (this.showCountryChart) {
        this.generateChartByCountry(data);
      }
    });
 }

 // Update the type of the users parameter to User[]
 countGenders(users: User[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  users.forEach(user => {
    const gender = user.gender;
    if (!counts[gender]) {
      counts[gender] = 0;
    }
    counts[gender]++;
  });
  return counts;
}

 generateChartByGender(data: any) {
    const ctx = this.canvasGenderRef.nativeElement.getContext('2d');
    const genderCounts = this.countGenders(data.results);
    const labels = Object.keys(genderCounts);
    const dataPoints = Object.values(genderCounts);

    this.genderChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Gender Counts',
            data: dataPoints,
            backgroundColor: ['#FF6666', '#4A4A4A'], 
            borderColor: ['#FF6666', '#4A4A4A'], 
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      },
    });
 }


 countsCountries(users: User[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  users.forEach(user => {
    const country = user.location['country'];
    if (country) {
      if (!counts[country]) {
        counts[country] = 0;
      }
      counts[country] +=Math.random();
    }
  });
  return counts;
}

generateChartByCountry(data: any) {
  const ctx = this.canvasCountryRef.nativeElement.getContext('2d');
  const countryCounts = this.countsCountries(data.results);

  const labels = Object.keys(countryCounts);
  const dataPoints = Object.values(countryCounts);

  this.countryChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'User Counts by Country',
          data: dataPoints,
          backgroundColor: '#FF6666',
          borderColor: '#FF6666',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
    },
  });
}
}
