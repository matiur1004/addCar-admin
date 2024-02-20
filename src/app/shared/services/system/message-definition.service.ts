import { Injectable } from '@angular/core';
import { MessageDefinition } from '@app-shared/models/system/message-definition.model';
import { MessageCodes } from '../../models/system/message-codes';

@Injectable({
  providedIn: 'root',
})
export class MessageDefinitionService {

  constructor() {
    this.checkDuplicateDefinitions();
    this.checkAllCodesHaveDefinitions();
  }

  getMessageDefinition(code: number): MessageDefinition {
    if (!code) {
      throw new Error("code is undefined");
    }
    const msgDef = this.findMessageDefinition(code);
    if (msgDef)
      return { code: code, definition: msgDef.definition };
    else
      return this.getUnknownMessageDefinition(code);
  }

  private getUnknownMessageDefinition(code: number): MessageDefinition {
    const msgDef = this.findMessageDefinition(MessageCodes.UnknownMessage);
    const text = msgDef.definition.replace("{0}", code.toString());
    return { code: MessageCodes.UnknownMessage, definition: text };
  }

  private findMessageDefinition(code: number): MessageDefinition {
    const msgDef = this.messageDefinitions.find(a => a.code == code);
    return msgDef;
  }

  //Checks for duplicate codes
  private checkDuplicateDefinitions() {
    this.messageDefinitions.forEach(a => {
      const result = this.messageDefinitions.find(b => b.code === a.code && b != a);
      if (result) {
        throw new Error(`Duplicate message definitions for code '${a.code}'`);
      }
    });
  }

  //Checks if all codes have message text defined
  private checkAllCodesHaveDefinitions() {
    for (let code in MessageCodes) {
      if (!isNaN(+code)) {
        const msgDef = this.findMessageDefinition(+code);
        if (!msgDef) {
          console.error(`Message code ${code} (${MessageCodes[code]}) does not have text definition`);
        }
      }
    }
  }

  //TODO: load dynamically or move to a separate class
  private messageDefinitions: MessageDefinition[] =
    [
      { code: MessageCodes.UnknownMessage, definition: "*** The message text supposed to be here, but it was not found. Please ask developers to add text for message code '{0}'" },
      { code: MessageCodes.NotAuthorizedError, definition: "You are not authorized to perform this action" },
      { code: MessageCodes.NoInternetConnection, definition: "There is No Internet Connection" },
      { code: MessageCodes.UnableToCompleteRequest, definition: "We are Unable to Complete this Request" },

      { code: MessageCodes.BrokerSaveSuccess, definition: "Broker was saved successfully" },
      { code: MessageCodes.FranchiseeSaveSuccess, definition: "Franchise was saved successfully" },
      { code: MessageCodes.SubfranchiseeSaveSuccess, definition: "Sub Franchise was saved successfully" },
      { code: MessageCodes.DeductionSaveSuccess, definition: "Deduction was saved successfully" },
      { code: MessageCodes.CommissionSaveSuccess, definition: "Commission was saved successfully" },
      { code: MessageCodes.UserProfileSaveSuccess, definition: "User Profile was saved successfully" },
      { code: MessageCodes.LabelListSaveSuccess, definition: "Label was saved successfully." },
      { code: MessageCodes.LabelLinkCreationSuccess, definition: "Labels Link was created and sent by email to interpreter." },
      { code: MessageCodes.PageLinkCreationSuccess, definition: "Pages Link was created and sent by email to interpreter." },

      { code: MessageCodes.BrokerInvoiceTemplateUploadSuccess, definition: "Invoice template was successfully attached" },
      { code: MessageCodes.BrokerInvoiceTemplateRemovalSuccess, definition: "Invoice template was successfully deleted" },
      { code: MessageCodes.FranchiseeRemovalSuccess, definition: "The Franchise was deleted successfully" },
      { code: MessageCodes.SubfranchiseeRemovalSuccess, definition: "The Sub Franchise was deleted successfully" },
      { code: MessageCodes.BrokerRemovalSuccess, definition: "The broker was deleted successfully" },
      { code: MessageCodes.UserProfileRemovalSuccess, definition: "The User Profile was deleted successfully" },
      { code: MessageCodes.DeductionRemovalSuccess, definition: "The deduction was deleted successfully" },
      { code: MessageCodes.DeductionCloneSuccess, definition: "The deduction was cloned successfully" },
      { code: MessageCodes.UserProfileChangePasswordSuccess, definition: "Password was changed successfully" },

      { code: MessageCodes.UserProfileDeactivationSuccess, definition: "The user was deactivated successfully" },
      { code: MessageCodes.UserProfileActivationSuccess, definition: "The user was Activated successfully" },
      { code: MessageCodes.UserProfileResendInvitationSuccess, definition: "The invitation was resent successfully" },

      { code: MessageCodes.QualityReportScreenshotUploadSuccess, definition: "Quality report screenshot was saved successfully" },
      { code: MessageCodes.PasswordCopySuccess, definition: "Your password was copied successfully" },
      { code: MessageCodes.CustomPaymentSuccess, definition: "Custom payment added successfully" },
      { code: MessageCodes.MarkedAsPaidSuccess, definition: "Marked as paid successfully" },
      { code: MessageCodes.VehicleImageUploadSuccess, definition: "Vehicle image was upload successfully" },
      { code: MessageCodes.VehicleImageDeleteSuccess, definition: "Vehicle image was deleted successfully" },
      { code: MessageCodes.CountryImageDeleteSuccess, definition: "Country image was deleted successfully" },

      { code: MessageCodes.ContentTooLargeError, definition: "Content is too large. Please check image size and use smaller images." },
      { code: MessageCodes.FranchiseeSaveError, definition: "Error happened during saving the franchisee" },
      { code: MessageCodes.SubfranchiseeSaveError, definition: "Error happened during saving the sub franchisee" },
      { code: MessageCodes.DeductionSaveError, definition: "Error happened during saving the deduction" },
      { code: MessageCodes.UserProfileSaveError, definition: "Error happened during saving the user" },
      { code: MessageCodes.UserProfileDeactivationError, definition: "Error happened during deactivating the user" },
      { code: MessageCodes.UserProfileDeactivationOwnAccountError, definition: "You cannot deactivate your own account" },
      { code: MessageCodes.UserProfileRemovalOwnAccountError, definition: "You cannot delete your own account" },
      { code: MessageCodes.UserProfileChangePasswordError, definition: "Error happened during changing a password" },
      { code: MessageCodes.BrokerNotFoundError, definition: "Broker not found." },
      { code: MessageCodes.LocationDoesNotBelongToTheSubFranchiseError, definition: "The location does not belong to the subfranchise." },
      { code: MessageCodes.UserProfileNotFoundError, definition: "User profile not found." },
      { code: MessageCodes.ApplicationUserNotFoundError, definition: "Application user not found." },
      { code: MessageCodes.UserProfileActivationTermsOfUseError, definition: "User activation is impossible without accepting terms of use." },
      { code: MessageCodes.UserProfileEmailConfirmError, definition: "An error occurred while trying to confirm email." },
      { code: MessageCodes.TermsOfServiceAcceptError, definition: "An error occurred while trying to accept terms of service." },
      { code: MessageCodes.SetNewPasswordError, definition: "An error occurred while trying to set new password." },
      { code: MessageCodes.RoleExistError, definition: "Provided role does not exist." },
      { code: MessageCodes.InvitingUserProfileNotFoundError, definition: "Inviting user profile not found." },
      { code: MessageCodes.FranchiseeNotFoundError, definition: "Unable to find franchisee." },
      { code: MessageCodes.SubFranchiseeNotFoundError, definition: "Unable to find subfranchisee." },
      { code: MessageCodes.ApplicationUserCreateError, definition: "An error occurred while trying to create application user." },
      { code: MessageCodes.ResetPasswordError, definition: "An error occurred while trying to reset the password." },
      { code: MessageCodes.CreateResetTokenError, definition: "An error occurred while trying to create email confirmation token." },
      { code: MessageCodes.ChangePasswordError, definition: "An error occurred while trying to change the password." },
      { code: MessageCodes.IncorrectCurrentPasswordError, definition: "Incorrect current password." },
      { code: MessageCodes.UserIdExtractTokenError, definition: "An error occurred while trying to extract user id from token." },
      { code: MessageCodes.InvoiceTemplateNotFoundError, definition: "The broker does not have an invoice template." },
      { code: MessageCodes.CurrencyNotFoundError, definition: "The specified currency was not found." },
      { code: MessageCodes.BrokerInvoiceNumberExistError, definition: "BrokerInvoice with specified InvoiceNumber already exists." },
      { code: MessageCodes.BrokerInvoiceDateRangeError, definition: "From date must be more than till date." },
      { code: MessageCodes.BrokerRentalAgreementPeriodNotFountError, definition: "There is no rental agreement in the specified period of time." },
      { code: MessageCodes.QualityReportScreenshotUploadError, definition: "Error happened during saving the quality report screenshot." },
      { code: MessageCodes.DefaultLanguageDeleteError, definition: "Unable to delete the default language." },
      { code: MessageCodes.SiteStructurePageDeleteError, definition: "Cannot delete a site structure page. They are critical for the site functioning." },
      { code: MessageCodes.BrokerInvoiceNotFoundError, definition: "Broker invoice not found." },
      { code: MessageCodes.BrokerInvoiceMarkAsSentError, definition: "An error occurred while changing the invoice status." },
      { code: MessageCodes.ExcelFileCorruptError, definition: "Excel file has an invalid format. Must be an .xslx file." },
      { code: MessageCodes.ExcelFileSingleSheetError, definition: "Excel file must have one worksheet only." },
      { code: MessageCodes.ExcelFileWorkBookError, definition: "The document type must be a workbook (.xslx). No macros or addin supported." },
      { code: MessageCodes.ExcelFileFormulaError, definition: "The document cannot contain formulas." },
      { code: MessageCodes.ReservationMixedCurrenciesError, definition: "Cannot create invoice due to mixed currencies. Following currencies would be placed on the same invoice: {conflictCurrenies}." },
      { code: MessageCodes.ReservationNullCurrencyError, definition: "Reservation does not have currency assigned" },
      { code: MessageCodes.VehicleImageUploadError, definition: "An error occurred while trying to upload vehicle image." },
      { code: MessageCodes.VehicleImageDeleteError, definition: "An error occurred while trying to delete vehicle image." },
      { code: MessageCodes.DuplicateAllowedCountryReferenceError, definition: "An error occurred while trying to add allowed country reference." },
      { code: MessageCodes.CurrentAllowedCountryReferenceError, definition: "An error occurred while trying to add current country as allowed." },
      { code: MessageCodes.ImageIsEmptyError, definition: "An error occurred while trying to add empty image." },
      { code: MessageCodes.ImageAspectRatioError, definition: "An error occurred while trying to add image where aspect ratio (width / height) must be between 1 and 4." },
      { code: MessageCodes.ImageMinWidthError, definition: "An error occurred while trying to add image with width smoller than 300." },
      { code: MessageCodes.CountryImageDeleteError, definition: "An error occurred while trying to delete country image." },
      { code: MessageCodes.LabeListUpdateError, definition: "An error occurred while trying to save label." },
      { code: MessageCodes.ImageFileFormatError, definition: "Unsupported image format. Please upload .png, .jpg, .bmp images." },
      { code: MessageCodes.ContentTextTooLargeError, definition: "Content is too large. Please check text size and use smaller text." },
      { code: MessageCodes.TranslationLinkNotFoundError, definition: " An error occurred while creating Link as Translation Link is not Found." },
      { code: MessageCodes.TranslationLinkExpiredError, definition: "An error occurred while creating Link as Translation Link is Expired." },
      { code: MessageCodes.TranslationLinkIsAlreadyCompletedError, definition: "An error occurred while creating Link as Translation Link already Completed" },
      { code: MessageCodes.TranslationLinkIsAlreadyExistsError, definition: "An error occurred while creating Link as Translation Link already Exists." },
      { code: MessageCodes.TranslationLinkDoesNotHaveThisCodeError, definition: "An error occurred while creating Link as Translation Link does not have this Code." },
      { code: MessageCodes.LabelLinkCreationError, definition: "An error occurred while creating Labels Link. " },
      { code: MessageCodes.PageLinkCreationError, definition: "An error occurred while creating Pages Link. " },
      { code: MessageCodes.ExcelGenerationNoGroupsOnCountryError, definition: "Unable to generate Excel, because the country does not have any location with car group configured" },
      { code: MessageCodes.ExcelGenerationNoPricingError, definition: "Unable to generate Excel, because the country does not have any location with pricing configured" },

    ];
}

