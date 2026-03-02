export async function getUSDExchange() {
  const res = await fetch('https://api.exchangerate-api.com/v4/latest/MXN');

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.rates.USD;
}