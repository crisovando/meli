export function formatPrice(data, currency, languaje = 'es-AR') {
  return data.toLocaleString(languaje, {
    style: 'currency',
    minimumFractionDigits: 0,
    currency,
  });
}
