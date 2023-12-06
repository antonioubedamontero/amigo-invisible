import { Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { RaffleResultItem } from '../../shared/models';
import { language$ } from '../../shared/services/header-language.service';
import { RaffleService } from 'src/app/shared/services/raffle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  // Result component
  i18n: any;

  // Table columns and data source
  dataSource: RaffleResultItem[] = [];
  displayedColumns = ['from', 'to'];

  suscriptions: Subscription[] = [];

  constructor(
    private translateService: TranslateService,
    private raffleService: RaffleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current language and translations when change
    const subscription = language$.subscribe((language: string) => {
      this.getTranslations();
    });

    // Load data source from data
    this.loadTableDataSource();

    this.suscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    // Destroy suscriptions
    this.suscriptions.forEach((suscription) => suscription.unsubscribe());
  }

  loadTableDataSource(): void {
    // Load data source from data
    this.dataSource = this.raffleService.getRaffleResults();
  }

  print(): void {
    // Open print dialog window
    window.print();
  }

  generatePdf(): void {
    // Generate PDF from HTML

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text(this.i18n.title, 14, 20);

    const img = new Image();
    img.src = 'assets/img/gift-img.jpg';
    doc.addImage(img, 'png', 14, 30, 180, 80);

    autoTable(doc, {
      head: [this.displayedColumns],
      body: this.dataSource.map(({ from, to }) => [from, to]),
      startY: 120,
    });

    doc.text(
      this.i18n.greetingsWithoutImoji,
      14,
      (doc as any).lastAutoTable.finalY + 10
    );

    doc.save(this.i18n.raffleDownloadDocumentName);
  }

  goToHomePage(): void {
    // Navigate to home page
    this.router.navigate(['/']);
  }

  getTranslations() {
    // get i18n for header component
    const suscription = this.translateService
      .get('result')
      .subscribe((i18n) => {
        this.i18n = i18n;
      });

    this.suscriptions.push(suscription);
  }
}
