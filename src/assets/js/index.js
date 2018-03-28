$('#thanks').hide()
$('body').show()

$('#form-contact').submit((event) => {
  event.preventDefault()
  const name = $('#name').val();
  const email = $('#email').val();
  if (email && name) {
    fetch('/api/customer/register', { method: 'POST', body: { _name: name, _email: email } })
      .then(res => res.status)
      .then(status => {
        if (status === 200) {
          $('#ask').hide()
          $('#thanks').show()
        }
      });
  } else {
    alert("Hey, acho que você esqueceu de colocar o e-mail ou seu nome! ;)")
  }
})