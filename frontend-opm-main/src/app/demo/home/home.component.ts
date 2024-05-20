import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  techniciansCount: number = 0
  clientsCount: number = 0
  workOrdersCount: number = 0
  ticketsCount: number = 0
  contractsCount: number = 0
  foldersCount: number = 0
  unhandledWorkOrdersCount: number = 0

  openTicketsCount: number = 0
  closedTicketsCount: number = 0

  openWOCount: number = 0
  closedWOCount: number = 0

  get authority() {
    return sessionStorage.getItem("authority")
  }

  get id() {
    return sessionStorage.getItem("_id")
  }

  constructor(private analytics: AnalyticsService, private dataService: DataService) { }

  ngOnInit(): void {
    if (this.authority === "admin") {
      this.countContracts()
      this.countUsersByAuthority()
      this.countWorkOrders()
      this.countUnhandledWorkOrder()
      this.countFolders()
      this.countTickets()
      this.countWorkOrders()
    }

    if (this.authority === "technician") {
      this.countStatsByEmployeeId()
    }

    if (this.authority === "client") {
      this.countStatsByClientId()
    }
  }

  // ADMIN
  countUsersByAuthority() {
    this.analytics.countUsersByAuthority("client")
      .subscribe(
        (data: any) => {
          this.clientsCount = data.rows.count;
        },
        (error: any) => {
          console.log(error);
        }
      )
    this.analytics.countUsersByAuthority("technician")
      .subscribe(
        (data: any) => {
          this.techniciansCount = data.rows.count;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  countContracts() {
    this.analytics.countContracts()
      .subscribe(
        (data: any) => {
          this.contractsCount = data.rows.count;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  countUnhandledWorkOrder() {
    this.analytics.countUnhandledWorkOrder()
      .subscribe(
        (data: any) => {
          this.unhandledWorkOrdersCount = data.rows.count;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  countAllTickets() {
    this.analytics.countAllTickets()
      .subscribe(
        (data: any) => {
          this.ticketsCount = data.rows.count;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  countFolders() {
    this.dataService.getAllFolders()
      .subscribe((response: any) => {
        this.foldersCount = response.rows.length
      })
  }

  countTickets() {
    this.dataService.getAllTickets()
      .subscribe(
        (response: any) => {
          console.log(response)
          this.openTicketsCount = response.rows.filter((ticket: any) => ticket.status !== 'Closed').length;
          this.closedTicketsCount = response.rows.filter((ticket: any) => ticket.status === 'Closed').length;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  countWorkOrders() {
    this.dataService.getAllWorkOrders()
      .subscribe((repsonse: any) => {
        this.workOrdersCount = repsonse.rows.length
        this.openWOCount = repsonse.rows.filter((workOrder: any) => workOrder.status !== 'Done').length;
        this.closedWOCount = repsonse.rows.filter((workOrder: any) => workOrder.status === 'Done').length;
      })
  }

  countStatsByEmployeeId() {
    this.dataService.getWorkOrderByEmployeeId(this.id!)
      .subscribe((response: any) => {
        this.workOrdersCount = response.rows.length;
        this.openWOCount = response.rows.filter((workOrder: any) => workOrder.status !== 'Valid').length;
        this.closedWOCount = response.rows.filter((workOrder: any) => workOrder.status === 'Valid').length;

        let _tickets: any[] = [];
        response.rows.forEach((workOrder: any) => {
          if (workOrder.ticketList) {
            _tickets = _tickets.concat(workOrder.ticketList);
          }
        });

        if (_tickets.length > 0) {
          this.openTicketsCount = _tickets.filter((ticket: any) => ticket.status !== 'Closed').length;
          this.closedTicketsCount = _tickets.filter((ticket: any) => ticket.status === 'Closed').length;
        }
      });
  }

  countStatsByClientId() {
    this.dataService.getWorkOrdersByClientId(this.id!)
      .subscribe((response: any) => {
        this.workOrdersCount = response.rows.length;
        this.openWOCount = response.rows.filter((workOrder: any) => workOrder.status !== 'Valid').length;
        this.closedWOCount = response.rows.filter((workOrder: any) => workOrder.status === 'Valid').length;
      })
  }

}
