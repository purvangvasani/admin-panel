import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, CardHeaderComponent, ColComponent, ContainerComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, PageItemDirective, PageLinkDirective, PaginationComponent, RowComponent, TemplateIdDirective, TextColorDirective, ThemeDirective, WidgetStatAComponent, WidgetStatBComponent, WidgetStatCComponent, WidgetStatFComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ToastService } from 'src/app/util/toastr.service';
import { LoaderService } from 'src/app/util/loader.service';
import { TransactionService } from 'src/app/services/transactionRequest.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { UtilService } from 'src/app/util/util.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from '../../widgets/widgets-e/widgets-e.component';
import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { cilArrowTop, cilOptions } from '@coreui/icons';
import { getStyle } from '@coreui/utils';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-merchant-summary',
  standalone: true,
  imports: [AgGridAngular, WidgetStatAComponent, ChartjsComponent, PaginationComponent, PageItemDirective, RouterLink, PageLinkDirective, NgTemplateOutlet, FormsModule, ThemeDirective, CommonModule, ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardHeaderComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, DropdownToggleDirective,
    DropdownMenuDirective, DropdownComponent,
    DropdownItemDirective, NgStyle, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, WidgetsDropdownComponent, WidgetStatBComponent, WidgetsEComponent, WidgetStatFComponent, WidgetsBrandComponent, WidgetStatCComponent, TemplateIdDirective],
  templateUrl: './merchant-summary.component.html',
  styleUrl: './merchant-summary.component.scss'
})
export class MerchantSummaryComponent implements OnInit {
  public merchant = "";
  public depositFields: any = [];
  public payoutsList: any[] = [];
  public totalNoOfCounts: any = {};
  public id: any;
  public deositeList: any[] = [];

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    filter: true,
  };
  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50];
  public themeClass: string =
    "ag-theme-quartz";
  public totalDepositPages: number = 1;
  public currentDepositPage: number = 1;

  public totalWithdrawalPages: number = 1;
  public currentWithdrawalPage: number = 1;
  private gridApi!: GridApi<any>;
  context = {
    componentParent: this
  };
  constructor(
    private toastrService: ToastService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private transactionService: TransactionService,
    private merchantService: MerchantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getMerchantSummary(params['id']);
        this.makeTableDeposit();
      } else {
        this.toastrService.showWarning('Warning!', "You donot have permission to view this page!")
        this.utilService.goto('/404');
      }
    });
    this.data = {
      primary: {
        labels: this.labels.slice(0, 7),
        datasets: this.primary
      },
      info: {
        labels: this.labels.slice(0, 7),
        datasets: this.info
      },
      warning: {
        labels: this.labels.slice(0, 7),
        datasets: this.warning
      },
      danger: {
        labels: this.labels.slice(0, 7),
        datasets: this.danger
      },
    };
    this.options = this.optionsDefault;
  }

  icons = { cilOptions, cilArrowTop };

  data: any = {};
  options: any = {};

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];

  primary = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];
  info = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];
  warning = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];
  danger = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-danger'),
      pointHoverBorderColor: getStyle('--cui-danger'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };
  private makeTableDeposit() {
    this.columnDefs = [
      // this row just shows the row index, doesn't use any data from the row
      { headerName: "Account Name", field: "accountName", suppressMovable: true },
      { headerName: "Amount", field: "amount", suppressMovable: true },
      { headerName: "Status", field: "status", suppressMovable: true }
    ];

    // this.getAllDeposite();
    // this.getAllWithdrawal();
  }
  private getMerchantSummary = (id: any) => {
    let success = (data: any) => {
      if (data && data.success) {
        if (data.data.merchant) {
          this.merchant = data.data.merchant.merchantname;
          this.totalNoOfCounts = data.data;
          // this.depositFields = data.data.depositFields.deposits?.length ? data.data.depositFields.deposits[0].typeDetails : [];
        }
      } else {
        this.toastrService.showError('Error!', data.message)
        this.utilService.goto('/404')
      }
      this.loaderService.hideLoader();
    }
    let failure = (error: any) => {
      this.loaderService.hideLoader();
      this.toastrService.showError('Error!', error.error && error.error?.errors?.msg ? error.error.errors.msg : 'Error while fetching merchant.')
      this.utilService.goto('/404')
    }
    this.loaderService.showLoader();
    this.merchantService.getMerchantSummaryById({ merchantId: id }, success, failure)
  }

  onPaginationChanged = (event: any) => {
    console.log("onPaginationPageLoaded");
  }

  onDepopsitGridReady = (params: GridReadyEvent<any>) => {
    this.gridApi = params.api;
    this.getAllDeposite();
  }
  onWithdrawalGridReady = (params: GridReadyEvent<any>) => {
    this.gridApi = params.api;
    this.getAllWithdrawal();
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  public getAllDeposite = () => {
    const successCallback = (response: any) => {
      this.loaderService.hideLoader();
      if (response && response.success) {
        if (response.data && response.data.length) {
          this.deositeList = response.data || [];
          this.currentDepositPage = response.currentPage;
          this.totalDepositPages = response.totalPages;
        }
      }
    }
    const errorCallback = (error: any) => {
      this.loaderService.hideLoader();
      this.deositeList = [];
    }
    this.loaderService.showLoader();
    const criteria = {
      merchantId: this.id,
      pageQuery: this.currentDepositPage, pageSize: this.paginationPageSize,
      type: 'Deposit',
    }
    this.transactionService.getbyMerchantId(criteria, successCallback, errorCallback);
  }
  public handleDepositPagination = (pageNumber: number) => {
    this.currentDepositPage = pageNumber;
    this.deositeList = [];
    this.getAllDeposite();
  }

  public getAllWithdrawal = () => {
    const successCallback = (response: any) => {
      this.loaderService.hideLoader();
      if (response && response.success) {

        if (response.data && response.data.length) {
          this.payoutsList = response.data || [];
          this.currentWithdrawalPage = response.currentPage;
          this.totalWithdrawalPages = response.totalPages;
        }
      }
    }
    const errorCallback = (error: any) => {
      this.loaderService.hideLoader();
      this.payoutsList = [];
    }
    this.loaderService.showLoader();
    const criteria = {
      merchantId: this.id,
      pageQuery: this.currentWithdrawalPage, pageSize: this.paginationPageSize,
      type: 'Withdrawal',
    }
    this.transactionService.getbyMerchantId(criteria, successCallback, errorCallback);
  }
  public handleWithdrawalPagination = (pageNumber: number) => {
    this.currentWithdrawalPage = pageNumber;
    this.payoutsList = [];
    this.getAllWithdrawal();
  }

  exportPDF() {
    const columnDefs = this.columnDefs.map(col => ({
      headerName: col.headerName,
      field: col.field
    }));
    this.generatePDF(
      columnDefs, this.deositeList, 'Deposit',
      columnDefs, this.payoutsList, 'Withdrawal',
      this.totalNoOfCounts
    );
  }

  generatePDF(
    depositColumns: any[],
    depositRowData: any[],
    depositTitle: string,
    withdrawalColumns: any[],
    withdrawalRowData: any[],
    withdrawalTitle: string,
    summaryData: any
  ) {
    const doc = new jsPDF();

    let finalY = 30;
    const depositSummary = [
      [`Deposit Amount Total: ${summaryData.depositAmountTotal}`],
      [`Deposit Approved Count: ${summaryData.depositApprovedCount}`],
      [`Deposit Rejected Count: ${summaryData.depositRejectedCount}`],
      [`Deposit Processing Count: ${summaryData.depositProcessingCount}`]
    ];

    const withdrawalSummary = [
      [`Withdrawal Amount Total: ${summaryData.withdrawalAmountTotal}`],
      [`Withdrawal Approved Count: ${summaryData.withdrawalApprovedCount}`],
      [`Withdrawal Rejected Count: ${summaryData.withdrawalRejectedCount}`],
      [`Withdrawal Processing Count: ${summaryData.withdrawalProcessingCount}`]
    ];

    // Add Deposit and Withdrawal Summary Table with merged headers
    autoTable(doc, {
      startY: finalY,
      head: [['Deposit Statistics', 'Withdrawal Statistics']],
      body: depositSummary.map((row, index) => [
        row[0], // Deposit metrics and values
        withdrawalSummary[index] ? withdrawalSummary[index][0] : '' // Withdrawal metrics and values
      ]),
      theme: 'striped',
      styles: { fontSize: 10 },
      // margin: { left: 10, right: 10 },
      // columnStyles: {
      //   0: { cellWidth: 100 }, // Width for Deposit Statistics column
      //   1: { cellWidth: 100 }  // Width for Withdrawal Statistics column
      // },
      // Merge cells for the header row
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontSize: 12
      }
    });

    finalY = (doc as any).lastAutoTable.finalY + 20;

    // Add Deposit Table
    doc.text(depositTitle, 15, finalY);
    autoTable(doc, {
      head: [depositColumns.map(col => col.headerName)],
      body: depositRowData.map(row => depositColumns.map(col => row[col.field])),
      headStyles: { fillColor: [0, 0, 0] },
      styles: { fontSize: 10 },
      startY: finalY + 5,
    });
    finalY = (doc as any).lastAutoTable.finalY + 20;

    // Add Withdrawal Table
    doc.text(withdrawalTitle, 15, finalY);
    autoTable(doc, {
      head: [withdrawalColumns.map(col => col.headerName)],
      body: withdrawalRowData.map(row => withdrawalColumns.map(col => row[col.field])),
      headStyles: { fillColor: [0, 0, 0] }, // Black background for header 
      styles: { fontSize: 10 },
      startY: finalY + 5,
    });

    doc.save('merchantSummary.pdf');
  }

  exportExcel() {
    const fixedHeaders = ["Account Name", "Amount", "Status"];
    const filterRowData = (data: any[]) => {
      return data.map(row => {
        const filteredRow: any = {};
        fixedHeaders.forEach(header => {
          const field = this.columnDefs.find(col => col.headerName === header)?.field;
          if (field) {
            filteredRow[header] = row[field];
          }
        });
        return filteredRow;
      });
    };

    const depositRowData = filterRowData(this.deositeList);
    const withdrawalRowData = filterRowData(this.payoutsList);

    const depositSheet = XLSX.utils.json_to_sheet(depositRowData, { header: fixedHeaders });
    const withdrawalSheet = XLSX.utils.json_to_sheet(withdrawalRowData, { header: fixedHeaders });

    const depositSummary = [
      ["Deposit Amount Total", this.totalNoOfCounts.depositAmountTotal],
      ["Deposit Approved Count", this.totalNoOfCounts.depositApprovedCount],
      ["Deposit Rejected Count", this.totalNoOfCounts.depositRejectedCount],
      ["Deposit Processing Count", this.totalNoOfCounts.depositProcessingCount]
    ];

    const withdrawalSummary = [
      ["Withdrawal Amount Total", this.totalNoOfCounts.withdrawalAmountTotal],
      ["Withdrawal Approved Count", this.totalNoOfCounts.withdrawalApprovedCount],
      ["Withdrawal Rejected Count", this.totalNoOfCounts.withdrawalRejectedCount],
      ["Withdrawal Processing Count", this.totalNoOfCounts.withdrawalProcessingCount]
    ];

    // Create summary data array with merged headers
    const summaryData = [
      ["Deposit Statistics", "Withdrawal Statistics"],
      ...depositSummary.map((row, index) => [
        row[0] + ": " + row[1], // Deposit metrics and values
        withdrawalSummary[index] ? withdrawalSummary[index][0] + ": " + withdrawalSummary[index][1] : '' // Withdrawal metrics and values
      ])
    ];

    // Create a summary sheet with merged header and data
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

    // Apply styles to summary sheet headers
    const applySummaryHeaderStyle = (sheet: XLSX.WorkSheet) => {
      const range = XLSX.utils.decode_range(sheet['!ref']!);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
        if (!sheet[cellAddress]) continue;
        sheet[cellAddress].s = {
          fill: { fgColor: { rgb: "DADADA" } },
          font: { bold: true, color: { rgb: "000000" } }
        };
      }
    };

    applySummaryHeaderStyle(summarySheet);
    // Create a new workbook and append all sheets
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    XLSX.utils.book_append_sheet(workbook, depositSheet, 'Deposit');
    XLSX.utils.book_append_sheet(workbook, withdrawalSheet, 'Withdrawal');

    // Generate the Excel file and save it
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'merchantSummary.xlsx');
  }

}
