export const currencyFormat = (num: number) =>
    num != null
        ? num.toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
          })
        : '0'

export const dateFormat = (date: Date) =>
    date.toLocaleDateString('es-ES', {
        year: '2-digit',
        day: 'numeric',
        month: 'short',
    })
