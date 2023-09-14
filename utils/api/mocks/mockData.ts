import dayjs from "dayjs"
import useAuthStore from "../../store/authStore"
import { ContactType } from "../../enums/contactType"

export const getUserId = () => useAuthStore.getState().testUserId

export const getExpenseAccounts = () => ({
  xeroAccounts: {
    accountList: [
      {
        id: "expenseAccountId1",
        code: "310",
        name: "Cost of Goods Sold",
        accountType: "DIRECT COSTS",
      },
      {
        id: "expenseAccountId2",
        code: "400",
        name: "Advertising",
        accountType: "EXPENSE",
      },
      {
        id: "expenseAccountId3",
        code: "404",
        name: "Bank Fees",
        accountType: "EXPENSE",
      },

      {
        id: "expenseAccountId4",
        code: "620",
        name: "Prepayments",
        accountType: "CURRENT ASSET",
      },
      {
        id: "expenseAccountId5",
        code: "710",
        name: "Office Equipment",
        accountType: "FIXED ASSET",
      },
      {
        id: "expenseAccountId6",
        code: "711",
        name: "Less Accumulated Depreciation on Office Equipment",
        accountType: "FIXED ASSET",
      },

      {
        id: "expenseAccountId7",
        code: "880",
        name: "Owner A Drawings",
        accountType: "CURRENT LIABILITY",
      },
      {
        id: "expenseAccountId8",
        code: "881",
        name: "Owner A Funds Introduced",
        accountType: "CURRENT LIABILITY",
      },
      {
        id: "expenseAccountId9",
        code: "900",
        name: "Loan",
        accountType: "NON-CURRENT LIABILITY",
      },
    ],
  },
  newAccount: {
    code: "1Archa",
    name: "Archa Expenses",
    isExistingXeroCode: false,
  },
})

export const getIntegrations = isIntegrated => [
  {
    id: "xero-bank-feeds",
    name: "Xero",
    type: "TRANSACTIONS_FEED",
    connection: "Xero",
    enabled: isIntegrated,
    connected: isIntegrated,
    configured: isIntegrated,
    status: {
      connection: {
        type: "OAUTH2",
        connectionAvailable: true,
        tokenState: isIntegrated ? "VALID" : "NOT_SET",
      },
      configuration: {
        type: "TRANSACTIONS_FEED",
        organisationState: isIntegrated ? "VALID" : "NOT_SET",
        accountState: isIntegrated ? "VALID" : "NOT_SET",
        bankFeedState: isIntegrated ? "VALID" : "NOT_SET",
        receiptSubmissionState: null,
        lastSyncDateTime: "2020-01-16 15:52:12",
      },
    },
    configuration: {
      account: { id: "ArchaAccountId", name: "Archa Expenses" },
      organization: { id: "OrganizationId", name: "Pty Ltd" },
      bank: { id: "BankId", name: "NAB Account" },
      expenseAccount: null,
    },
    dataSync: {
      syncState: "COMPLETE",
      progress: 100,
    },
  },
  ...(isIntegrated
    ? [
        {
          id: "xero-receipts-submission",
          name: "Xero",
          type: "RECEIPTS_SUBMISSION",
          connection: "Xero",
          enabled: true,
          connected: isIntegrated,
          configured: isIntegrated,
          status: {
            connection: {
              type: "OAUTH2",
              connectionAvailable: true,
              tokenState: isIntegrated ? "VALID" : "NOT_SET",
            },
            configuration: {
              type: "TRANSACTIONS_FEED",
              organisationState: isIntegrated ? "VALID" : "NOT_SET",
              accountState: isIntegrated ? "VALID" : "NOT_SET",
              bankFeedState: isIntegrated ? "VALID" : "NOT_SET",
              receiptSubmissionState: null,
              lastSyncDateTime: "2020-01-16 15:52:12",
            },
          },
          configuration: {
            account: { id: "ArchaAccountId", name: "Archa Expenses" },
            organization: { id: "OrganizationId", name: "Pty Ltd" },
            bank: null,
            expenseAccount: {
              archaExpenseId: isIntegrated ? "ArchaExpenseId" : null,
              xeroExpenseAccounts: isIntegrated
                ? getExpenseAccounts().xeroAccounts.accountList.slice(1, 7)
                : [],
            },
          },
        },
      ]
    : []),
]

const generateUser = ({
  id,
  firstName,
  lastName,
  profileImageCode,
  contactDetails = {
    data: [
      {
        id: "EA52CA31-7564-4345-A7EC-B6CADD401CBE",
        type: ContactType.EMAIL,
        contact: "test@test.com",
        verified: false,
      },
    ],
  },
  authentication,
  businessRegistrationStatus,
  registrationStatus,
  hasNewCard = false,
  hasStatements = false,
  permissions = [{ type: "USER", label: "Cardholder" }],
  authAccounts = [
    { id: "ARCHA-001", type: "BUSINESS", displayName: "Co-build" },
  ],
  isIntegrated = false,
  encryptionKeys = null,
}) => {
  const cards = [
    {
      id: "TEST_CARD_ID_0",
      accountId: "TEST_ACCOUNT_ID_0",
      maskedPan: "XXXXXXXXXXXX0401",
      expiry: dayjs().add(3, "year").toISOString(),
      cardholderName: `${firstName} ${lastName}`,
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "CLOSED", activationEnabled: false },
      creditLimit: { currencyCode: "AUD", value: "0" },
      currentBalance: { currencyCode: "AUD", value: "0" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "0" },
      availableFunds: { currencyCode: "AUD", value: "0" },
    },
    {
      id: "TEST_CARD_ID_1",
      accountId: "TEST_ACCOUNT_ID_1",
      maskedPan: "XXXXXXXXXXXX6078",
      expiry: dayjs().add(3, "year").toISOString(),
      cardholderName: `${firstName} ${lastName}`,
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: hasNewCard
        ? { status: "NOT_ACTIVATED", activationEnabled: true }
        : { status: "ACTIVE", activationEnabled: false },
      creditLimit: { currencyCode: "AUD", value: "1000" },
      currentBalance: hasNewCard
        ? { currencyCode: "AUD", value: "0" }
        : { currencyCode: "AUD", value: "185.50" },
      pendingTransactionBalance: hasNewCard
        ? { currencyCode: "AUD", value: "0" }
        : { currencyCode: "AUD", value: "175" },
      availableFunds: hasNewCard
        ? { currencyCode: "AUD", value: "1000" }
        : { currencyCode: "AUD", value: "797.50" },
    },
    {
      id: "TEST_CARD_ID_2",
      accountId: "TEST_ACCOUNT_ID_1",
      maskedPan: "XXXXXXXXXXXX4321",
      expiry: dayjs().subtract(5, "year").toISOString(),
      cardholderName: `${firstName} ${lastName}`,
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: hasNewCard
        ? { status: "NOT_ACTIVATED", activationEnabled: true }
        : { status: "ACTIVE", activationEnabled: false },
      creditLimit: { currencyCode: "AUD", value: "1000" },
      currentBalance: hasNewCard
        ? { currencyCode: "AUD", value: "0" }
        : { currencyCode: "AUD", value: "185.50" },
      pendingTransactionBalance: hasNewCard
        ? { currencyCode: "AUD", value: "0" }
        : { currencyCode: "AUD", value: "175" },
      availableFunds: hasNewCard
        ? { currencyCode: "AUD", value: "1000" }
        : { currencyCode: "AUD", value: "797.50" },
    },
  ]
  return {
    id: id,
    authentication,
    businessRegistrationStatus,
    registrationStatus,
    me: {
      givenName: firstName,
      middleName: null,
      familyName: lastName,
      birthDate: "1990-01-01T00:00:00.000Z",
      address: {
        extraAddress: "",
        streetNumber: "1007",
        streetName: "Mountain Drive",
        locality: "Gotham",
        state: "VIC",
        postcode: "3000",
        country: "Australia",
      },
      accounts: authAccounts,
      profileImageCode: profileImageCode,
    },
    contactDetails,
    accounts: [
      {
        id: "TEST_ACCOUNT_ID_1",
        accountType: "CREDIT",
        open: true,
        creditLimit: {
          currencyCode: "AUD",
          value: "10000",
        },
        currentAccountBalance: hasNewCard
          ? { currencyCode: "AUD", value: "0" }
          : {
              currencyCode: "AUD",
              value: "1850.50",
            },
        pendingTransactionBalance: hasNewCard
          ? { currencyCode: "AUD", value: "0" }
          : {
              currencyCode: "AUD",
              value: "175",
            },
        availableFunds: hasNewCard
          ? {
              currencyCode: "AUD",
              value: "10000",
            }
          : {
              currencyCode: "AUD",
              value: "7974.50",
            },
        businessUnitId: null,
      },
    ],
    cards: cards,
    hasNewCard,
    hasStatements,
    permissions,
    accountIntegrations: getIntegrations(isIntegrated),
    accountingAccounts:
      permissions[0].type === "SUPER_USER"
        ? [
            { account: { id: "ACC_001", name: "NAB Bank Account" } },
            { account: { id: "ACC_002", name: "Archa Business" } },
          ]
        : [],
    accountIntegrationBankFeed: {
      id: "bank_feed",
      xeroBankFeedId: "xero_bank_feed",
      accountName: "NAB Feed",
      accountId: "accountId",
      currency: "AUD",
      country: "AU",
    },
    encryptionKeys: encryptionKeys || {
      authStatus: "COMPLETE",
      secret: "secret",
      keyId: "keyId",
      encryptionKeyToken: "encryptionKeyToken",
    },
  }
}

export const getTransactions = () => [
  generateTransaction(
    1,
    "Telstra",
    "-78.90",
    dayjs().subtract(2, "hour").toISOString(),
    false,
    "NOT_ADDED"
  ),
  generateTransaction(
    2,
    "Uber",
    "-25",
    dayjs().subtract(5, "hour").subtract(37, "minute").toISOString(),
    true,
    "SUBMITTED_TO_ACCOUNTING_SERVICE"
  ),
  generateTransaction(
    3,
    "Drakes Coffee",
    "-9.50",
    dayjs().subtract(11, "hour").subtract(6, "minute").toISOString(),
    true,
    "SUBMITTED"
  ),
  generateTransaction(
    4,
    "BP",
    "-54.30",
    dayjs().subtract(1, "day").subtract(1, "minute").toISOString(),
    false,
    "NOT_ADDED"
  ),
  generateTransaction(
    5,
    "Officeworks",
    "-25",
    dayjs()
      .subtract(1, "day")
      .subtract(9, "hour")
      .subtract(20, "minute")
      .toISOString(),
    true,
    "ARCHA_UPLOAD_FAILED",
    true
  ),
  generateTransaction(
    6,
    "Xero",
    "-45.50",
    dayjs()
      .subtract(1, "day")
      .subtract(12, "hour")
      .subtract(25, "minute")
      .toISOString(),
    false,
    "NOT_ADDED"
  ),
  generateTransaction(
    7,
    "AWS",
    "-119",
    dayjs().subtract(2, "day").subtract(25, "minute").toISOString(),
    false,
    "NOT_ADDED"
  ),
  generateTransaction(
    8,
    "Bunnings",
    "-345",
    dayjs()
      .subtract(2, "day")
      .subtract(7, "hour")
      .subtract(4, "minute")
      .toISOString(),
    false,
    "NOT_ADDED"
  ),
  generateTransaction(
    9,
    "Ikea",
    "-84",
    dayjs()
      .subtract(3, "day")
      .subtract(6, "hour")
      .subtract(21, "minute")
      .toISOString(),
    true,
    "SUBMIT_FAILED_TO_ACCOUNTING_SERVICE",
    true
  ),
  generateTransaction(
    10,
    "Drakes Coffee",
    "-4.45",
    dayjs()
      .subtract(3, "day")
      .subtract(12, "hour")
      .subtract(22, "minute")
      .toISOString(),
    false,
    "NOT_ADDED"
  ),
]

const generateTransaction = (
  id,
  merchantName,
  amount,
  date,
  hasAttachment,
  uploadStatus,
  receiptUploadFailed = false
) => ({
  id: `transactionId${id}`,
  accountId: "accountId1",
  cardId: "cardId1",
  receiptCode: "7H2UBDV3",
  amount: amount,
  description: "",
  pending: false,
  date: date,
  merchantId: null,
  merchantName: merchantName,
  merchantLocation: "Melbourne",
  merchantCountry: null,
  additionalText: null,
  merchantCategoryCode: null,
  isArchaTransaction: false,
  receipt: {
    uploadStatus: uploadStatus,
    notes: hasAttachment ? "Note text" : "",
    hasAttachment: hasAttachment,
    fileType: hasAttachment ? "pdf" : null,
    xeroAccount: {
      xeroAccountId: "xeroAccountId1",
      name: hasAttachment ? "Entertainment" : "",
      code: hasAttachment ? "420" : "",
      accountType: hasAttachment ? "EXPENSE" : "",
    },
    canResubmit: receiptUploadFailed,
  },
})

export const getBusinessCards = () => [
  {
    subUserId: "BusinessUser1",
    card: {
      id: "TEST_CARD_ID_1",
      accountId: "TEST_ACCOUNT_ID_1",
      maskedPan: "xxxxxxxxxxxx1111",
      expiry: "2022-10",
      cardholderName: "Keiko Seiko",
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "ACTIVE" },
      creditLimit: {
        currencyCode: "AUD",
        value: "3500",
      },
      currentBalance: { currencyCode: "AUD", value: "350" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "0" },
      availableFunds: { currencyCode: "AUD", value: "3150" },
    },
  },
  {
    subUserId: "BusinessUser2",
    card: {
      id: "BusinessUser2Card1",
      accountId: "TEST_ACCOUNT_ID_2",
      maskedPan: "xxxxxxxxxxxx1112",
      expiry: null,
      cardholderName: "Lucy Chang",
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "ACTIVE" },
      creditLimit: { currencyCode: "AUD", value: "3500" },
      currentBalance: { currencyCode: "AUD", value: "350" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "0" },
      availableFunds: { currencyCode: "AUD", value: "3150" },
    },
  },
  {
    subUserId: "BusinessUser3",
    card: {
      id: "BusinessUser3Card1",
      accountId: "TEST_ACCOUNT_ID_3",
      maskedPan: "xxxxxxxxxxxx1113",
      expiry: "2021-05",
      cardholderName: "Emily Williams",
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "LOCKED" },
      creditLimit: { currencyCode: "AUD", value: "1000" },
      currentBalance: { currencyCode: "AUD", value: "450" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "0" },
      availableFunds: { currencyCode: "AUD", value: "550" },
    },
  },
  {
    subUserId: "BusinessUser4",
    card: {
      id: "BusinessUser4Card1",
      accountId: "TEST_ACCOUNT_ID_4",
      maskedPan: "xxxxxxxxxxxx1114",
      expiry: null,
      cardholderName: "Alex Borsoff",
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "CLOSED" },
      creditLimit: { currencyCode: "AUD", value: "1000" },
      currentBalance: { currencyCode: "AUD", value: "50.50" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "25" },
      availableFunds: { currencyCode: "AUD", value: "924.50" },
    },
  },
  {
    subUserId: "BusinessUser5",
    card: {
      id: "BusinessUser5Card1",
      accountId: "TEST_ACCOUNT_ID_5",
      maskedPan: "xxxxxxxxxxxx1115",
      expiry: "2024-12",
      cardholderName: "Ethan Dean",
      cardType: "PHYSICAL_AND_VIRTUAL",
      status: { status: "NOT_ACTIVATED" },
      creditLimit: { currencyCode: "AUD", value: "1000" },
      currentBalance: { currencyCode: "AUD", value: "0" },
      pendingTransactionBalance: { currencyCode: "AUD", value: "0" },
      availableFunds: { currencyCode: "AUD", value: "1000" },
    },
  },
]

export const getSubUsers = () => [
  {
    subUserId: "BusinessUser1",
    givenName: "Keiko",
    middleName: null,
    familyName: "Seiko",
    isAdmin: true,
    userPhone: "0412 309 321",
    userEmail: "keiko.seiko@archa.com.au",
    profileImageCode: "HAC2L4MY",
  },
  {
    subUserId: "BusinessUser2",
    givenName: "Lucy",
    middleName: null,
    familyName: "Chang",
    isAdmin: false,
    userPhone: "0491 570 157",
    userEmail: "lucy.chang@test.archa.com.au",
    profileImageCode: "5JGTEDOF",
  },
  {
    subUserId: "BusinessUser3",
    givenName: "Emily",
    middleName: null,
    familyName: "Williams",
    isAdmin: false,
    userPhone: "0491 570 158",
    userEmail: "emily.williams@test.archa.com.au",
    profileImageCode: "VNQAQTLX",
  },
  {
    subUserId: "BusinessUser4",
    givenName: "Alex",
    middleName: null,
    familyName: "Borsoff",
    isAdmin: false,
    userPhone: "0491 570 158",
    userEmail: "alex.borsoff@test.archa.com.au",
    profileImageCode: "MAIQCCWC",
  },
  {
    subUserId: "BusinessUser5",
    givenName: "Kepsi",
    middleName: null,
    familyName: "Bell",
    isAdmin: false,
    userPhone: "0491 570 158",
    userEmail: "kepsi.bell@test.archa.com.au",
    profileImageCode: "2SROYJGE",
  },
  {
    subUserId: "BusinessUser6",
    givenName: "Ethan",
    middleName: null,
    familyName: "Dean",
    isAdmin: false,
    userPhone: "0491 570 158",
    userEmail: "ethan.dean@test.archa.com.au",
    profileImageCode: "YURDLY3Q",
  },
]

const validAuthentication = {
  authStatus: "COMPLETE",
  secret: "mockSecret",
  keyId: "mockKeyId",
  encryptionKeyToken: "encryptionToken",
  authProcessToken: "AuthenticationAuthProcessToken",
  mfaOptions: null,
}

const completedBusinessRegistration = {
  registrationStatus: "SUCCESSFUL",
  businessPrefill: { postalAddresses: "NOT_REQUIRED" },
  asicDataUpToDateConfirmed: true,
  authorityToActConfirmed: true,
  purposeOfCreditConfirmed: true,
  statementConsentConfirmed: false,
  statementAccessProvided: false,
  businessInfo: { status: "COMPLETE", missingData: [] },
  defaultShippingAddress: "COMPLETE",
  adminUserSetup: "COMPLETE",
}

const incompleteBusinessRegistration = {
  registrationStatus: "PENDING",
  businessPrefill: { postalAddresses: "NOT_REQUIRED" },
  asicDataUpToDateConfirmed: true,
  authorityToActConfirmed: true,
  purposeOfCreditConfirmed: true,
  statementConsentConfirmed: false,
  statementAccessProvided: false,
  businessInfo: { status: "INCOMPLETE", missingData: [] },
  defaultShippingAddress: "COMPLETE",
  adminUserSetup: "COMPLETE",
}

const completeRegistrationStatus = {
  userInfo: { status: "COMPLETE", missingData: [] },
  idDocuments: {
    status: "SUCCESS",
  },
  authenticationRequirements: [],
  registrationComplete: true,
  isInWaitlist: true,
}

const normalUser = generateUser({
  id: 1,
  firstName: "Lucy",
  lastName: "Chang",
  profileImageCode: "5JGTEDOF",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
})

const superUser = generateUser({
  id: 2,
  firstName: "Keiko",
  lastName: "Saiko",
  profileImageCode: "HAC2L4MY",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
  permissions: [{ type: "SUPER_USER", label: "Account Owner" }],
})

const missingAuthenticationRequirements = generateUser({
  id: 3,
  firstName: "Kepsi",
  lastName: "Bell",
  profileImageCode: "2SROYJGE",
  authentication: validAuthentication,
  businessRegistrationStatus: incompleteBusinessRegistration,
  registrationStatus: {
    userInfo: { status: "COMPLETE", missingData: [] },
    idDocuments: {
      status: "SUCCESS",
    },
    authenticationRequirements: ["phone", "phoneVerification", "PIN"],
    registrationComplete: false,
    isInWaitlist: true,
  },
})

const incompleteExternalUserDetailsUser = generateUser({
  id: 4,
  firstName: "Kepsi",
  lastName: "Bell",
  profileImageCode: "2SROYJGE",
  authentication: validAuthentication,
  businessRegistrationStatus: incompleteBusinessRegistration,
  registrationStatus: {
    userInfo: { status: "COMPLETE", missingData: [] },
    idDocuments: {
      status: "SUCCESS",
    },
    authenticationRequirements: [],
    registrationComplete: false,
  },
})

const lockedAccountUser = generateUser({
  id: 5,
  firstName: "Alex",
  lastName: "Borsoff",
  profileImageCode: "MAIQCCWC",
  authentication: validAuthentication,
  encryptionKeys: { reasonCode: 1 },
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
})

const requiresUserInfoUser = generateUser({
  id: 6,
  firstName: "Kepsi",
  lastName: "Bell",
  profileImageCode: "2SROYJGE",
  authentication: validAuthentication,
  businessRegistrationStatus: incompleteBusinessRegistration,
  registrationStatus: {
    userInfo: {
      status: "INCOMPLETE",
      missingData: [
        "familyName",
        "givenName",
        "birthDate",
        "address",
        "nickName",
      ],
    },
    authenticationRequirements: [],
    registrationComplete: false,
  },
})

const unActivatedCardUser = generateUser({
  id: 7,
  firstName: "Ethan",
  lastName: "Dean",
  profileImageCode: "YURDLY3Q",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
  hasNewCard: true,
})

const unregisteredPhoneNumberUser = generateUser({
  id: 8,
  firstName: "Kepsi",
  lastName: "Bell",
  profileImageCode: "2SROYJGE",
  authentication: validAuthentication,
  businessRegistrationStatus: incompleteBusinessRegistration,
  registrationStatus: {
    userInfo: { status: "COMPLETE", missingData: [] },
    authenticationRequirements: ["phone"],
    registrationComplete: false,
  },
})

const statementStatesUser = generateUser({
  id: 9,
  firstName: "Keiko",
  lastName: "Saiko",
  profileImageCode: "HAC2L4MY",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
  permissions: [{ type: "SUPER_USER", label: "Account Owner" }],
  hasStatements: true,
})

const multiBusinessUser = generateUser({
  id: 10,
  firstName: "Keiko",
  lastName: "Saiko",
  profileImageCode: "HAC2L4MY",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
  permissions: [{ type: "SUPER_USER", label: "Account Owner" }],
  authAccounts: [
    { id: "ARCHA-001", type: "BUSINESS", displayName: "Co-build" },
    { id: "ARCHA-002", type: "BUSINESS", displayName: "South Side Sangas" },
    { id: "ARCHA-003", type: "BUSINESS", displayName: "Haim Pty Lmt" },
  ],
})

const corporateAdminIntegratedUser = generateUser({
  id: 11,
  firstName: "Tony",
  lastName: "Stark",
  profileImageCode: "PDW5P1QP",
  authentication: validAuthentication,
  businessRegistrationStatus: completedBusinessRegistration,
  registrationStatus: completeRegistrationStatus,
  permissions: [{ type: "SUPER_USER", label: "Account Owner" }],
  isIntegrated: true,
})

export const getUser = id => {
  switch (id) {
    case 1:
      return normalUser
    case 2:
      return superUser
    case 3:
      return missingAuthenticationRequirements
    case 4:
      return incompleteExternalUserDetailsUser
    case 5:
      return lockedAccountUser
    case 6:
      return requiresUserInfoUser
    case 7:
      return unActivatedCardUser
    case 8:
      return unregisteredPhoneNumberUser
    case 9:
      return statementStatesUser
    case 10:
      return multiBusinessUser
    case 11:
      return corporateAdminIntegratedUser
    default:
      return normalUser
  }
}

export const getStatements = () => [
  {
    availableFormats: ["pdf", "xeroCSV"],
    issueDate: dayjs().subtract(1, "day").toISOString().replace(/T.*/, ""),
  },
  {
    availableFormats: ["pdf", "xeroCSV"],
    issueDate: dayjs().subtract(5, "day").toISOString().replace(/T.*/, ""),
  },
  {
    availableFormats: ["pdf", "xeroCSV"],
    issueDate: dayjs().subtract(5, "months").toISOString().replace(/T.*/, ""),
  },
]

export const getRewards = () => [
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading": "Get up to 20% off on HubSpot software",
    "about-company":
      "HubSpot is a CRM platform that brings everything scaling companies need to deliver a best-in-class customer experience into one place. Our crafted, not cobbled solution helps teams grow with tools that are powerful alone, but better together.",
    name: "HubSpot",
    slug: "hubspot",
    "updated-on": "2022-08-09T06:30:44.573Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:08.765Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get started for free and get 20% off HubSpot's marketing, sales, and CRM software. Unlock the offer now with your Archa Mastercard.",
    "deal-url": "https://www.hubspot.com/strategic-partner/mastercard",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--857b8593-f0a7-485e-82ae-fe52030720ea--all--hubspot",
    "how-to-redeem":
      '<ul id=""><li id="">Click on "Claim Offer" to visit the exclusive offer page.</li><li id="">Click on "Get Started" and sign up to claim the benefit.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f2077aa72c1",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e224e7bc1fc60e7234bf0c_hubspot.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--857b8593-f0a7-485e-82ae-fe52030720ea--all--hubspot",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">Business Mastercard holders can unlock up to 20% off HubSpot software in their first year and 10% upon subsequent renewals, subject to the below terms and conditions.</li><li id="">This pricing is applicable to net-new Professional or Enterprise level products.</li><li id="">Starter level products are excluded, unless bundled with qualifying Professional or Enterprise purchases or upgrades.</li><li id="">Customers may not apply this specialty program pricing to existing subscriptions of any level.</li><li id="">Current HubSpot customers at the starter-tier or above are not eligible for this discount.</li><li id="">HubSpot for Mastercard is provided by HubSpot. Requires a HubSpot account, and acceptance of HubSpot Terms of Service and Privacy Policy. HubSpot subscription fees may apply.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages.</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by HubSpot, under such terms and conditions as determined by HubSpot, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f4e94aa7286",
    "promo-code": "MASTER20",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading":
      "Get Google Ads voucher credits worth USD 500, when you spend USD 500 on Google Ads",
    "about-company":
      "Google Ads is an online advertising platform developed by Google, where advertisers bid to display brief advertisements, service offerings, product listings, or videos to web users. It can place ads both in the results of search engines like Google Search and on non-search websites, mobile apps, and videos.\n\nAdzooma helps you reach your audience with cost-effective digital marketing, ensures you get the most out of your advertising campaigns and achieve the best results possible, whatever your current level.",
    name: "Google Ads by Adzooma",
    slug: "google-ads-by-adzooma",
    "updated-on": "2022-08-09T06:30:51.233Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:08.384Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get Google Ads voucher credits worth USD 500, when you spend USD 500 on Google Ads. Unlock the offer now with your Archa Mastercard.",
    "deal-url": "https://www.adzooma.com/mastercard-google/",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--ae944b79-fe29-43bc-b08e-2631b8c9786a--all--google-ads-by-adzooma",
    "how-to-redeem":
      '<ul id=""><li id="">Click on "Claim Offer" to visit the offer link.</li><li id="">Click on "Get Started Now" to avail the benefit.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38fb23aaa72fa",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e73035e67b53ee362c544c_Google_Ads_logo.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--ae944b79-fe29-43bc-b08e-2631b8c9786a--all--google-ads-by-adzooma",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">This offer is open to Adzooma customers only.</li><li id="">Offer Terms &amp; Conditions are subject to change.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages.</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Adzooma, under such terms and conditions as determined by Adzooma, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f946faa728e",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading":
      "Get benefits worth up to USD 1400 on Facebook Ads packages",
    "about-company":
      "Advertise your business across Facebooks various ad formats and maximize your budget. People interact with millions of businesses on Facebook. Make yours one of them.\n\nDisruptive Digital is a full-service digital marketing agency helping businesses create affordable web design and e-commerce solutions, and optimize their paid search advertising strategy.",
    name: "Facebook Ads by Disruptive Digital",
    slug: "facebook-ads-by-disruptive-digital",
    "updated-on": "2022-08-09T06:30:38.142Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:08.224Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Sign up for a 6-months Facebook Ads package with Disruptive Digital, and get USD 800 ad credits for Facebook Ads over 6 months, and a custom landing page worth USD 600. Unlock the offer now with your Archa Mastercard.",
    "deal-url": "https://www.mastercardsocialads.disruptive.deals/",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--6ff5e866-cdda-4eb2-b662-80a7ac0c2f12--all--facebook-ads-by-disruptive-digital",
    "how-to-redeem":
      '<ul id=""><li id="">Click on \'Claim Offer\' to visit the offer link.</li><li id="">Enter the required details, Disruptive Digital will connect with you for next steps.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f5fd8aa72f0",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e73024e67b53ad482c5211_meta-business-logo.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--6ff5e866-cdda-4eb2-b662-80a7ac0c2f12--all--facebook-ads-by-disruptive-digital",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">The client will pay for additional work outside the scope of this package that is recommended by Disruptive Digital, and reviewed and approved by the client.</li><li id="">All material and content created by/for the client remains the sole property of the client and is treated with the utmost confidentiality.</li><li id="">Disruptive Digital shall use material provided by the client in addition to its own material in performing the Instagram ad management services.</li><li id="">The client shall provide the necessary creatives for the campaign to Disruptive Digital no later than five (5) working days before the campaign start date.</li><li id="">The client may only provide a maximum of three (3) sets of creatives per placement.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages.</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Disruptive Digital, under such terms and conditions as determined by Disruptive Digital, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f7a5daa728d",
    "promo-code": "MASTER20",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading": "Get USD 100 credits on 1Password Teams",
    "about-company":
      "The world’s most-loved password manager - 1Password is the easiest way to store and use strong passwords. Log in to sites and fill forms securely with a single click.",
    name: "1Password",
    slug: "1password",
    "updated-on": "2022-08-09T06:29:27.263Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:07.701Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Enjoy a USD 100 credit towards a 1Password Teams account. Unlock the offer now with your Archa Mastercard.",
    "deal-url": "https://start.1password.com/sign-up/team?c=MASTERCARD",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--53140355-aec9-4898-b99b-842c7bd8f4c7--all--1password",
    "how-to-redeem":
      '<ul id=""><li id="">Click on \'Claim Offer\' to visit the offer page, and enter the details requested.</li><li id="">Click on \'Create Account\' and follow the steps mentioned to claim the offer.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f5256aa72f7",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e72ff6d40fd8aa593de1f9_1password-logo.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--53140355-aec9-4898-b99b-842c7bd8f4c7--all--1password",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">This offer cannot be clubbed with any other offer.</li><li id="">Offer Terms and Conditions are subject to change.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by 1Password, under such terms and conditions as determined by 1Password, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f88ccaa7289",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading": "Get benefits worth up to USD 2,250 on Shopify Plus",
    "about-company":
      "Shopify is a complete commerce platform that lets you start, grow, and manage a business. The subscription-based software allows anyone to set up an online store and sell their products.",
    name: "Shopify",
    slug: "shopify",
    "updated-on": "2022-08-09T06:30:21.744Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:07.471Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get a range of benefits on Shopify Plus, provided by Marmeto, a Shopify Partner. Benefits include a USD 1,250 free service promo including Shopify Store Setup, Theme Customization, Ecommerce Consultation, and Shopify App Installation/Customization. Also get a 3 month complimentary subscription to all Shopify products / apps worth USD 1,000, and Priority Support. Unlock the offer now with your Archa Mastercard.",
    "deal-url": "https://marmeto-india.myshopify.com/pages/marmeto-mastercard",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--c71eb4fb-de6f-4b6a-adeb-875feea6bd66--all--shopify",
    "how-to-redeem":
      '<ul id=""><li id="">Click on \'Claim Offer\' to visit the offer page, and click on "Start your free 14 day trial".</li><li id="">Enter your company details, Marmeto will contact you with next steps.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f177aaa72f2",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e730032f9d2287060b189b_shopify-partners.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--c71eb4fb-de6f-4b6a-adeb-875feea6bd66--all--shopify",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">All coupon codes issued by Tatynerds Private Limited are subjected to a set of terms and conditions, which we reserve the right to change without prior notice in the best interests of the company.</li><li id="">Promo codes will expire one month from the date of issuance by Tatynerds Private Limited.</li><li id="">Promo codes cannot be used to purchase other services. Promo codes cannot be resold, transferred for value or redeemed for cash, except to the extent required by law.</li><li id="">The amount of promo codes cannot be partially utilised. If done, any unused amount will not be refunded.</li><li id="">Tatynerds Private Limited will not be responsible for replacing any lost or stolen promo codes.</li><li id="">Tatynerds Private Limited reserves the right to amend the validity of the promo codes or reject promo codes in order to protect the interests of the company or under circumstances of abuse.</li><li id="">Tatynerds Private Limited reserves the absolute right to withdraw and or alter any of the terms and conditions of the offer at any time without prior notice.</li><li id="">Any disputes arising out of and in connection with this offer shall be subject to the exclusive jurisdiction of the courts of New Delhi, India only.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Marmeto, under such terms and conditions as determined by Marmeto, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f03d3aa728b",
    "promo-code": "MASTER20",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading": "Get Google Workspace monthly subscription @ USD 4.99",
    "about-company":
      "Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more.",
    name: "Google Workspace",
    slug: "google-workspace",
    "updated-on": "2022-08-09T06:30:28.861Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:07.460Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get Google Workspace monthly subscription @ USD 4.99. Unlock the offer now with your Archa Mastercard.",
    "deal-url":
      "https://www.resellerclub.com/google-workspace?utm_source=poshvine&utm_campaign=aug21",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--6ac17c08-7924-48ae-94b2-84cd8540d2ca--all--google-workspace",
    "how-to-redeem":
      '<ul id=""><li id="">Click on "Claim Offer" to visit the offer page.</li><li id="">Choose your plan and proceed to checkout (discount will be auto applied).</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f4929aa72bf",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e223f25e37fa0016ba4dc9_workspace-google.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--6ac17c08-7924-48ae-94b2-84cd8540d2ca--all--google-workspace",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">ResellerClub will own all customers who will be purchasing Google Workspace through this offers program and will be responsible for providing admin support to said customers</li><li id="">ResellerClub reserves the right to terminate this offer without further notice</li><li id="">The prices of Google Workspace are subject to change based on price revisions by Google. ResellerClub reserves the right to revise pricing for Google Workspace without prior notice</li><li id="">This offer is applicable for both existing and new cardholders.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by ResellerClub, under such terms and conditions as determined by ResellerClub, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38fb09eaa7285",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading": "Get credits worth USD 1,250 on Freshworks products",
    "about-company":
      "Freshworks is the leading provider of cloud-based business software. Our products make it easy for teams to collaborate with each other, and also help provide their customers with the best experience possible. Our cloud-based suite of Saas products is used by over 150,000 customers around the world.",
    name: "Freshworks",
    slug: "freshworks",
    "updated-on": "2022-08-09T06:30:15.534Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:07.093Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get credits worth USD 1,250 each on multiple Freshworks products including Freshsales Suite, Freshsales, Freshmarketer, Freshdesk Omnichannel, Freshdesk Support Desk, Freshdesk Contact Centre, Freshchat, Freshteam and Freshservice (up to a maximum of USD 10,000). Unlock the offer now with your Archa Mastercard.",
    "deal-url":
      "https://www.freshworks.com/partners/startup-program/mastercard/",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--c1d6fe7d-6e91-4a83-ad08-011a50da72e9--all--freshworks",
    "how-to-redeem":
      '<ul id=""><li id="">Click on "Claim Offer" to visit the exclusive offer page.</li><li id="">Submit your company details, Freshworks will connect with you with next steps.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f2c2daa72c3",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e73010438313a699448064_freshworks-logo.png",
      alt: null,
    },
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--c1d6fe7d-6e91-4a83-ad08-011a50da72e9--all--freshworks",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">Offer valid for new Pro plan customers, and for existing customer upgrading to Pro from the free plan only.</li><li id="">Credit limit per product applies as indicated under each product, ie USD 1,250</li><li id="">Startups need to show proof of acceptance into the ecosystem to avail credits</li><li id="">Credits are non-negotiable and cannot be transferred between products.</li><li id="">Drop a note to startup@freshworks.com if you have any further queries related to the program.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Freshworks, under such terms and conditions as determined by Freshworks, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38fa25caa728c",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading":
      "Get benefits of up to USD 5,000 on Google Maps Platform with Navagis",
    "about-company":
      "Google Maps Platform (formerly Google Maps API) helps businesses create real world and real time experiences for their customers with dynamic maps, routes & places APIs from Google Maps Platform's location solutions.\n\nNavagis is a Google Cloud Premier Partner and have worked with many firms in a collaborative manner including SoftBank, IBM, and Oracle. As a global leader in location intelligence solutions, Navagis strives to transform their client’s through location powered data discovery, machine learning and visualization. Navagis is a world leading expert on Google Maps and Cloud and has offices throughout the USA, Japan and Asia Pacific.",
    name: "Google Maps Platform by Navagis",
    slug: "google-maps-platform-by-navagis",
    "updated-on": "2022-08-09T06:29:18.450Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:06.535Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "how-to-redeem":
      '<ul id=""><li id="">Contact NAVAGIS at <strong id="">contact@navagis.com</strong>, quoting the coupon code in your email to redeem the offer.</li></ul>',
    "deal-description":
      "Get credits of up to USD 5,000 for use on Google Maps Platform. Unlock the offer now with your Archa Mastercard.",
    "promo-code": "MCCOMMERCIAL",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--6be763c0-4a42-4cdc-a014-ff7131a049b1--all--google-maps-platform-by-navagis",
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--6be763c0-4a42-4cdc-a014-ff7131a049b1--all--google-maps-platform-by-navagis",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">NAVAGIS is solely responsible for this offer.</li><li id="">All qualified customers are eligible to apply for USD 5,000 in credits.</li><li id="">The USD 5,000 does not count against any previous GMP credit or discount received by the customer.</li><li id="">USD 5,000 will be credited to your subsequent GMP bills at a rate of 2% discount per month (on your bill for that month) for up to a period of 24 months, or until USD 5,000 of credits has been applied, whichever comes first.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Navagis, under such terms and conditions as determined by Navagis, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    "logo-image": {
      fileId: "635f34c94cc38f6429aa72f4",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e72febe1a61c4176ff4058_google-partner-logo.png",
      alt: null,
    },
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f67e6aa7288",
  },
  {
    "valid-until": "2023-03-31T00:00:00.000Z",
    "archa-selected": true,
    _archived: false,
    _draft: false,
    "deal-heading":
      "Get benefits of up to USD 5,000 on Google Cloud Platform with Navagis",
    "about-company":
      "Google Cloud Platform, is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, Google Drive, and YouTube. Alongside a set of management tools, it provides a series of modular cloud services including computing, data storage, data analytics and machine learning.\n\nNavagis is a Google Cloud Premier Partner and have worked with many firms in a collaborative manner including SoftBank, IBM, and Oracle. As a global leader in location intelligence solutions, Navagis strives to transform their client’s through location powered data discovery, machine learning and visualization. Navagis is a world leading expert on Google Maps and Cloud and has offices throughout the USA, Japan and Asia Pacific.",
    name: "Google Cloud Platform by Navagis",
    slug: "google-cloud-platform-by-navagis",
    "updated-on": "2022-08-09T06:29:11.400Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-27T23:51:06.470Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "deal-description":
      "Get credits of up to USD 5,000 for use on Google Cloud Platform. Unlock the offer now with your Archa Mastercard.",
    "how-to-redeem":
      '<ul id=""><li id="">Contact NAVAGIS at <strong id="">contact@navagis.com</strong>, quoting the coupon code in your email to redeem the offer.</li></ul>',
    "promo-code": "MCCOMMERCIAL",
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">NAVAGIS is solely responsible for this offer.</li><li id="">All qualified customers are eligible to apply for USD 5,000 in credits.</li><li id="">The USD 5,000 does not count against any previous GCP credit or discount received by the customer.</li><li id="">USD 5,000 will be credited to your subsequent GCP bills at a rate of 2% discount per month (on your bill for that month) for up to a period of 24 months, or until USD 5,000 of credits has been applied, whichever comes first.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by Navagis, under such terms and conditions as determined by Navagis, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--ab932973-5853-4d21-80cf-fa2025330e31--all--google-cloud-platform-by-navagis",
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--ab932973-5853-4d21-80cf-fa2025330e31--all--google-cloud-platform-by-navagis",
    "logo-image": {
      fileId: "635f34c94cc38fcd69aa72c2",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62e72fe02736d197c7b52ea6_google-cloud-partner-logo.png",
      alt: null,
    },
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f10ecaa7287",
  },
  {
    _archived: false,
    _draft: false,
    "deal-heading": "Get 20% off purchases of new subscriptions on iStock",
    "deal-description":
      "Get 20% off purchases of new subscriptions on iStock. Unlock the offer now with your Archa Mastercard.",
    name: "iStock by Getty Images",
    slug: "istock-by-getty-images",
    "updated-on": "2022-08-09T06:29:05.334Z",
    "updated-by": "Person_62218dcb44f73d749cb16bdb",
    "created-on": "2022-07-22T02:56:30.074Z",
    "created-by": "Person_62218dcb44f73d749cb16bdb",
    "published-on": "2022-10-31T02:37:06.287Z",
    "published-by": "Person_62218dcb44f73d749cb16bdb",
    "about-company":
      "Our imagery moves hearts, minds and opinions; powers commerce, ideas and perceptions. We are keenly aware that every day, our business affects individuals and society on many levels. That’s why we stand for creative rights that help power creative careers, for freedom of the press and the protection of journalists—both essential to a free society—and for generosity that helps communities flourish.",
    "general-website":
      "https://www.easysavingsspecials.com/info/terms-and-conditions?referer=offers--details--df955061-6dd2-4236-805e-9fddd68951cd--all--istock-by-getty-images",
    "how-to-redeem":
      '<ul id=""><li id="">Click on \'Claim Offer\' to visit the merchant website and subscribe using the coupon code to get the benefit.</li></ul>',
    "terms-conditions":
      '<h5 id="">Merchant Terms &amp; Conditions:</h5><ul id=""><li id="">Only applicable for new customers of iStock</li><li id="">Code can only be redeemed once per customer</li><li id="">Promo codes are limited time offers.</li><li id="">Promo codes are limited to one per customer and account and one time use only.</li><li id="">Promo codes may not be combined with other offers/discounts.</li><li id="">Promo codes are non-transferrable and may not be resold.</li><li id="">If you violate any of the offer terms, the offer will be invalid.</li><li id="">Only codes that we share via the affiliate channel or directly to partners are applicable for affiliate commission. Any codes sourced otherwise are not eligible for affiliate commission.</li><li id="">Promo codes for subscriptions apply only to the initial purchase—codes are not valid on renewals.</li><li id="">We may make changes to this offer at any time and certain exclusions may apply.</li><li id="">We may also refuse to verify and process any transaction we deem, in our sole discretion, to be fraudulent, suspicious, in violation of these terms and conditions, or that we believe may impose potential liability to iStock or Getty Images, its subsidiaries, affiliates or any of their respective officers, directors, employees, representatives, and agents.</li></ul><h5 id="">Mastercard Terms &amp; Conditions:</h5><ul id=""><li id="">This Offer applies to all clients from the date of commencement of the offer and will not apply retroactively.</li><li id="">Offer is only valid through above mentioned brand specific pages. &nbsp;</li><li id="">The individual brand voucher specific terms &amp; conditions will apply separately as per each brand’s T&amp;Cs. MasterCard has no authority over these T&amp;Cs and they are applicable to customers on an as is basis.</li><li id="">The services offered under this promotion are provided solely by iStock, under such terms and conditions as determined by iStock, and Mastercard accepts no liability whatsoever in connection with such services.</li></ul>',
    "valid-until": "2023-03-31T00:00:00.000Z",
    "logo-image": {
      fileId: "635f34c94cc38f2beaaa72f5",
      url: "https://uploads-ssl.webflow.com/6230360e45dbe5c94bc2459f/62da12e05aa6187bed02e60d_istock-logo-black-and-white.png",
      alt: null,
    },
    "archa-selected": true,
    "deal-url":
      "https://www.istockphoto.com/plans-and-pricing?irgwc=1&cid=IS&utm_medium=affiliate&utm_source=PoshVine&clickid=Vp9VNH08yxyNWX6xyczuAz6DUkD3CFVYD2yizU0&utm_term=Mastercard&utm_campaign=&utm_content=258824&irpid=3260585",
    "program-privacy-policy-url":
      "https://www.easysavingsspecials.com/info/privacy-policy?referer=offers--details--df955061-6dd2-4236-805e-9fddd68951cd--all--istock-by-getty-images",
    "promo-code": "MASTER20",
    _cid: "635f34c94cc38f0a9daa705d",
    _id: "635f34c94cc38f0870aa7284",
  },
]
