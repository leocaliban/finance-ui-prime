import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.configurarGraficoPie();
    this.configurarGraficoLine();
  }

  configurarGraficoPie() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dadosResponse => {
        this.pieChartData = {
          labels: dadosResponse.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dadosResponse.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  configurarGraficoLine() {
    this.dashboardService.lancamentosPorDia()
      .then(dadosResponse => {
        const diasDoMes = this.confnnigurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(dadosResponse.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);

        const totaisDespesas = this.totaisPorCadaDiaMes(dadosResponse.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);
        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        };
      })
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private confnnigurarDiasMes() {
    const mesReferencia = new Date();

    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }
}
