export const ErrorMessages = {
  GENERAL_SERVER_ERROR: "Oops! Something went wrong! Please try again later.",
  NOT_MATCHING_CARD_PINS: (
    <>
      <strong>Oops!</strong> The card PINs you entered do not match, please try
      again.
    </>
  ),
  NOT_MATCHING_PASSCODES: (
    <>
      <strong>Oops!</strong> The passcodes you entered do not match, please try
      again.
    </>
  ),
  PIN_LENGTH: "PIN must be 4 digits long.",
  PIN_CHANGE_SERVER_ERROR:
    "There was an error changing your PIN, please try again or contact support.",
  INCORRECT_PASSCODE: "The passcode you entered is incorrect.",
  CARD_ACTIVATION:
    "There was an error activating your card, please try again or contact support.",
}
