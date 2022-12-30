import { PROTOCOL_TYPES } from "@jk/api";

const response = [
  {
    name: "ReturnCode",
    rename: "Result",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "ReturnMessage",
    rename: "Message",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "OriMsgNo",
    rename: "bindingOrderId",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "ID",
    rename: "userId",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "Birth",
    rename: "birthday",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "JkoAccount",
    rename: "jkosId",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "DebitAccountLimitLen",
    rename: "digitAccountLen",
    type: PROTOCOL_TYPES.NUMBER,
  },
  {
    name: "OtpLimitLen",
    rename: "otpLen",
    type: PROTOCOL_TYPES.NUMBER,
  },
  {
    name: "BankLogoPhotoUrl",
    rename: "imageUrl",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "BankTitle",
    rename: "title",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "BankCode",
    rename: "code",
    type: PROTOCOL_TYPES.STRING,
  },
  {
    name: "ShowIdentify",
    rename: "showIndentify",
    type: PROTOCOL_TYPES.BOOL,
  },
];

export default { response };
