export function textToCurrency(numb) {
    return numb.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}