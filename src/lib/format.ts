export const formatPrice = (price: number, currency: string = 'TWD') => {
  if (currency === 'TWD') {
    return `NT$ ${price.toLocaleString('zh-TW')}`;
  }
  return `${currency} ${price.toLocaleString()}`;
};

export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
