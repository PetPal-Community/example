import { CommonModule  } from '@angular/common';
import { Component, inject, AfterViewInit  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import {Chart, registerables} from 'chart.js' 
import { PetService } from '../../core/services/pet.service';
@Component({
  selector: 'app-pet-report',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './pet-report.component.html',
  styleUrl: './pet-report.component.css'
})



export class PetReportComponent implements AfterViewInit {
  chart: any;
  private petService = inject(PetService);

  constructor() {
    // Registrar todos los componentes de Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.generateChart(); // Llamar a la función para generar el gráfico después de que el DOM se haya cargado
  }

  generateChart(): void {
    const data = this.petService.getPetsCountByType();
    const labels = Object.keys(data); // Tipos de mascotas
    const values = Object.values(data); // Cantidades de cada tipo

    this.chart = new Chart('petChart', {
      type: 'doughnut', // Tipo de gráfico de dona
      data: {
        labels: labels, // Etiquetas para el gráfico
        datasets: [{
          label: 'Cantidad de mascotas por tipo',
          data: values, // Datos para cada tipo de mascota
          backgroundColor: [
            'rgba(75,192,192,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderColor: [
            'rgba(75,192,192,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(153,102,255,1)',
            'rgba(255,159,64,1)',
          ],
          borderWidth: 1, // Ancho del borde
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top', // Posición de la leyenda
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' mascotas'; // Mostrar cantidad en el tooltip
              }
            }
          }
        }
      }
    });
  }
}


// export class PetReportComponent implements AfterViewInit {
//   chart: any;
//   private petService = inject(PetService);

//   constructor() {
//     // Registrar todos los componentes de Chart.js
//     Chart.register(...registerables);
//   }

//   ngAfterViewInit(): void {
//     this.generateChart(); // Llamar a la función para generar el gráfico después de que el DOM se haya cargado
//   }

//   generateChart(): void {
//     const data = this.petService.getPetsCountByType();
//     const labels = Object.keys(data); // Tipos de mascotas
//     const values = Object.values(data); // Cantidades de cada tipo

//     this.chart = new Chart('petChart', {
//       type: 'bar', // Tipo de gráfico (barras)
//       data: {
//         labels: labels, // Etiquetas para el eje X
//         datasets: [{
//           label: 'Cantidad de mascotas por tipo',
//           data: values, // Datos para el eje Y
//           backgroundColor: [
//             'rgba(75,192,192,0.2)',
//             'rgba(54,162,235,0.2)',
//             'rgba(255,206,86,0.2)',
//             'rgba(153,102,255,0.2)',
//             'rgba(255,159,64,0.2)',
//           ],
//           borderColor: [
//             'rgba(75,192,192,1)',
//             'rgba(54,162,235,1)',
//             'rgba(255,206,86,1)',
//             'rgba(153,102,255,1)',
//             'rgba(255,159,64,1)',
//           ],
//           borderRadius: 1,
//         }],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false
//       }
//     });
//   }
// }