const USD_TO_VND = 26_000;

const vndNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

export function convertUsdToVnd(amount) {
  return Number(amount) * USD_TO_VND;
}

export function convertVndToUsd(amount) {
  return Number(amount) / USD_TO_VND;
}

export function formatVndNumber(amount) {
  return vndNumberFormatter.format(Number(amount));
}

export function formatUsdAsVnd(amount) {
  return `${formatVndNumber(convertUsdToVnd(amount))}đ`;
}

export function formatVnd(amount) {
  return `${formatVndNumber(amount)}đ`;
}
