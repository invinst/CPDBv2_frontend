import numeral from 'numeral';

const MONEY_FORMAT = '0,0.00';
const MONEY_FORMAT_SHORT = '0.0a';

export const moneyFormat = (money) => money ? numeral(money).format(MONEY_FORMAT) : '-';
export const moneyFormatShort = (money) => money ? numeral(money).format(MONEY_FORMAT_SHORT) : '0';
export const moneyFormatWord = (money) => {
  const mapWordTable = {
    k: ' thousand',
    m: ' million',
    b: ' billion',
    t: ' trilliion',
  };
  const tempFormat = moneyFormatShort(money);
  const unit = tempFormat[tempFormat.length - 1];
  return tempFormat.replace(unit, mapWordTable[unit]);
};
