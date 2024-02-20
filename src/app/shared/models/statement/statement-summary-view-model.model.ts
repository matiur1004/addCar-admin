import { StatementStatus } from "../enums";
import { BaseEntity } from "../base-entity.model";

export class StatementSummaryViewModel extends BaseEntity {
  public status: StatementStatus;
  public vatAmount: number = 9500;
  public totalInvoicedToBrokers: number = 15419.82;
  public totalInvoicedCash: number = 25419.82;
  public commission: number = 2419.82;
  public fee: number = 550.00;
  public corrections: number = -40.32;
  public transferred: number = 15636.82;
  public toBeTransferred: number = 15636.82;
  public alreadyTransferred: number = 17419.82;
  public brokerRebate: number = 17419.82;
  public amountDue: number = 0;
  public ownerName: string;
  public locationName: string;
}
