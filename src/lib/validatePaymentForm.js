export default function validatePaymentForm({
  startDate,
  endDate,
  fullName,
  cardNumber,
  expiryDate,
  cvv,
}) {
  if (!startDate || !endDate || !fullName || !cardNumber || !expiryDate || !cvv)
    return false;
  if (new Date(startDate) >= new Date(endDate)) return false;
  if (cardNumber.replace(/\s/g, '').length < 13) return false;
  return true;
}
