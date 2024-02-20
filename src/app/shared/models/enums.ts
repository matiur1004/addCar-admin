// All enums are located here

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

export enum UserRoles {
  AddCarAdmin = 0,
  FranchiseeAdmin = 1,
  AddCarUser = 2,
  FranchiseeUser = 3,
  AddCarEditor = 4,
  FranchiseeEditor = 5
}

export enum UserStates {
  New = 0,
  Active = 1,
  Deactivated = 2,
  Removed = 3,
}

export enum MailAddressTypes {
  Email = 0,
  AlternativeEmail = 1,
}

export enum DiscountTypes {
  PerRa = 0,
  PerRaDay = 1,
  Percent = 2,
}

export enum BrokerForwardingMethods {
  Email = 0,
  Ftp = 1,
}

export enum StatementStatus {
  Draft = 0,
  Published = 1,
  Closed = 2
}

export enum BrokerInvoiceStatus {
  New = 0,
  Sent = 1,
  PartiallyPaid = 2,
  Paid = 3
}

export enum CommissionType {
  Amount = 0,
  Percent = 1
}

export enum CommissionStatus {
  Active = 0,
  Paused = 1
}


export enum FranchiseeInvoiceStatus {
  New = 0,
  Draft = 1,
  Published = 2
}

export enum ReservationStatus {
  Confirmed = 0,
  NoShow = 1,
  Cancelled = 2,
  RaOpen = 3,
  RaClosed = 4,
  Invoiced = 5,
  PaidByBroker = 6,
  PaidToCashier = 7
}

export enum FieldSections {
  Single = 0,
  ReservationRow = 1
}

export enum GearTypes {
  Automatic = 0,
  Four = 4,
  Five = 5,
  Six = 6
}

export enum FuelTypes {
  Gasoline = 0,
  Diesel = 1,
  Hybrid = 2,
  Electro = 3,

  //AntiMatter = 999,
}

export enum CountryPageTypes {
  General = 0,
  LocationContent = 1,
  TermsAndConditions = 2,
  Conditions = 3,
  ImportantInformation = 4,
}

export enum PageTypes {
  General = 0,
  HomePage = 1,
  About = 2,
}
