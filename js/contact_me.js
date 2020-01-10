$(function () {
  $("#contactForm, select, input, textarea").not("[type=submit]").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function () {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>');
          $('#success > .alert-success')
            .append('<strong>Su mensaje fue enviado correctamente !</strong>');
          $('#success > .alert-success')
            .append('</div>');
          $('#success').fadeOut(6000);

          // clear all fields
          $('#contactForm').trigger('reset');
        },
        error: function () {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>');
          $('#success > .alert-danger').append('<strong>Disculpe ' + name + ', el mensaje no pudo ser enviado. Por Favor intentelo nuevamente!');
          $('#success > .alert-danger').append('</div>');s
          $('#success').fadeOut(6000);
          // clear all fields
          $('#contactForm').trigger('reset');
        }
      })
    },
    filter: function () {
      return $(this).is(':visible');
    }
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});

/* When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
  $('#success').html('');
});
