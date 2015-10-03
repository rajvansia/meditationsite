function submitForm() {
  $('form[name="contact-form"]').submit();
  $('input[type="text"], textarea').val('');
}