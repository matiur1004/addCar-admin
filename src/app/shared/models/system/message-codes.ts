//Constants describing the message code meaning
export enum MessageCodes {
  //Codes 0 - 1000 are reserved for system needs
  //Codes 1001 - 10000 should be used for success messages
  //Codes 10001 - 20000 should be used for error messages
  //Codes above 20001 can be used for custom messages

  //System codes
  UnknownMessage = 0, //Shown if the message was not found
  NotAuthorizedError = 1,
  NoInternetConnection = 2, //No Internet Connection
  UnableToCompleteRequest = 3, //Unable to complete request

  //Success codes
  BrokerSaveSuccess = 1001,
  FranchiseeSaveSuccess = 1002,
  SubfranchiseeSaveSuccess = 1003,
  DeductionSaveSuccess = 1004,
  UserProfileSaveSuccess = 1005,
  BrokerInvoiceTemplateUploadSuccess = 1006,
  BrokerInvoiceTemplateRemovalSuccess = 1007,
  FranchiseeRemovalSuccess = 1008,
  SubfranchiseeRemovalSuccess = 1009,
  DeductionRemovalSuccess = 1010,
  BrokerRemovalSuccess = 1011,
  UserProfileRemovalSuccess = 1012, //The user was deleted successfully
  DeductionCloneSuccess = 1013,
  UserProfileDeactivationSuccess = 1014,
  UserProfileActivationSuccess = 1015,
  UserProfileResendInvitationSuccess = 1016, //The invitation was resent successfully
  UserProfileChangePasswordSuccess = 1017,
  CommissionSaveSuccess = 1018,
  QualityReportScreenshotUploadSuccess = 1019, //Success of uploading quality report screenshot
  PasswordCopySuccess = 1020,
  CustomPaymentSuccess = 1021,
  MarkedAsPaidSuccess = 1022,
  VehicleImageUploadSuccess = 1023,
  VehicleImageDeleteSuccess = 1024,
  CountryImageDeleteSuccess = 1025,
  LabelListSaveSuccess = 1026,
  LabelLinkCreationSuccess = 1027,
  PageLinkCreationSuccess=1028,

  //Error codes
  ContentTooLargeError = 10001,
  FranchiseeSaveError = 10002,
  SubfranchiseeSaveError = 10003,
  DeductionSaveError = 10004,
  UserProfileSaveError = 10005,
  UserProfileDeactivationError = 10006, //Error during the deactivation
  UserProfileDeactivationOwnAccountError = 10007, //"You cannot deactivate your own account"
  UserProfileRemovalOwnAccountError = 10008, //"You cannot delete your own account"
  UserProfileChangePasswordError = 10009,
  BrokerNotFoundError = 10010,
  LocationDoesNotBelongToTheSubFranchiseError = 10011,
  UserProfileNotFoundError = 10012,
  ApplicationUserNotFoundError = 10013,
  UserProfileActivationTermsOfUseError = 10014, //User activation is impossible without accepting terms of use.
  UserProfileEmailConfirmError = 10015, //An error occurred while trying to confirm email.
  TermsOfServiceAcceptError = 10016, //An error occurred while trying to accept terms of service.
  SetNewPasswordError = 10017, //An error occurred while trying to set new password.
  RoleExistError = 10018, //Provided role does not exist.
  InvitingUserProfileNotFoundError = 10019, //Inviting user profile not found.
  FranchiseeNotFoundError = 10020, //Unable to find franchisee.
  SubFranchiseeNotFoundError = 10021, //Unable to find subfranchisee.
  ApplicationUserCreateError = 10022, //An error occurred while trying to create application user.
  ResetPasswordError = 10023, //"An error occurred while trying to reset the password."
  CreateResetTokenError = 10024, //"An error occurred while trying to create email confirmation token."
  ChangePasswordError = 10025, //"An error occurred while trying to change the password."
  IncorrectCurrentPasswordError = 10026, //"Incorrect current password."
  UserIdExtractTokenError = 10027, //"An error occurred while trying to extract user id from token."
  InvoiceTemplateNotFoundError = 10028,
  CurrencyNotFoundError = 10029,
  BrokerInvoiceNumberExistError = 10030,
  BrokerInvoiceDateRangeError = 10031,
  BrokerRentalAgreementPeriodNotFountError = 10032,
  QualityReportScreenshotUploadError = 10033,
  SiteStructurePageDeleteError = 10034,
  DefaultLanguageDeleteError = 10035,
  BrokerInvoiceNotFoundError = 10036,
  BrokerInvoiceMarkAsSentError = 10037,
  ExcelFileCorruptError = 10038,
  ExcelFileSingleSheetError = 10039,
  ExcelFileWorkBookError = 10040,
  ExcelFileFormulaError = 10041,
  ReservationMixedCurrenciesError = 10042,
  ReservationNullCurrencyError = 10043,
  VehicleImageUploadError = 10044,
  VehicleImageDeleteError = 10045,
  DuplicateAllowedCountryReferenceError = 10046,
  CurrentAllowedCountryReferenceError = 10047,
  ImageIsEmptyError = 10048,
  ImageAspectRatioError = 10049,
  ImageMinWidthError = 10050,
  CountryImageDeleteError = 10051,
  ImageFileFormatError = 10052,
  LabeListUpdateError = 10053,
  ContentTextTooLargeError = 10054,
  TranslationLinkNotFoundError = 10055,
  TranslationLinkExpiredError = 10056,
  TranslationLinkIsAlreadyCompletedError = 10057,
  TranslationLinkIsAlreadyExistsError = 10058,
  TranslationLinkDoesNotHaveThisCodeError = 10059,
  LabelLinkCreationError = 10060,
  PageLinkCreationError = 10061,
  ExcelGenerationNoGroupsOnCountryError = 10062,
  ExcelGenerationNoPricingError = 10063,
}
