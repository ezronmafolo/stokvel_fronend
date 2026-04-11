import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultService } from '../../openapi/api/default.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './statement.html',
  styleUrls: ['./statement.css']
})
export class Statement {
  user: string[] = ['', ''];
  userId: any;
  
  constructor(private service: DefaultService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  transactions: Transaction[] = []
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')?.toString();
    console.log(this.userId);
    this.service.getUserGetuserGet(this.userId || '')
      .subscribe({
        next: (user) => {
          this.user = user;
          this.cd.detectChanges();
          console.log(this.user);
        },
        error: (error) => {
          console.error(error);
        }
      });
    
    this.service.getStatementStatementGet(this.userId || '')
      .subscribe({
        next: (transactions) => {
          
          this.transactions = transactions;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error(error);
        }
      });


  }
}
