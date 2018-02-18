export default function() {
  this.get('/balances', () => {
    let balances =[]
    const MAX_BALANCE = 1000

    for(let i=0; i < 12; i++) {
      balances.push({
        date: new Date(2017, i, 5),
        value: Math.floor(Math.random()*(MAX_BALANCE - 1))
      })
    }
    return balances
  });

  this.get('/expenses', () => {
    let expenses =[]
    let categories = ['Transport', 'Restauration', 'Hotels', 'Services', 'Taxes']
    const categoriesLength = categories.length
    const MAX_BALANCE = 100

    for(let i=0; i < categoriesLength; i++) {
      expenses.push({
        category: categories.shift(),
        value: Math.floor(Math.random()*(MAX_BALANCE - 1))
      })
    }
    return expenses
  });
}
