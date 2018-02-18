export default function(){
  this.transition(
    this.fromRoute('balances'),
    this.toRoute('expenses'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
