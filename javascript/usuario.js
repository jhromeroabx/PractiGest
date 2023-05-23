function VerificarUsuario() {
  var usu = $("#txt_usu").val();
  var con = $("#txt_con").val();

  if (usu.length == 0 || con.length == 0) {
    return Swal.fire(
      "Mensaje de advertencia",
      "Llene los campos vacíos",
      "warning"
    );
  }
  $.ajax({
    url: "../Controlador/usuario/controlador_verificar_usuario.php",
    type: "POST",
    data: {
      user: usu,
      pass: con,
    },
  }).done(function (resp) {
    if (resp == 0) {
      swal.fire(
        "Mensaje de Error",
        "Usuario y/o contrase\u00f1a incorrecta",
        "error"
      );
    } else {
      var data = JSON.parse(resp);
      if (data[0][4] === "Inactivo") {
        return Swal.fire(
          "Mensaje de Advertencia",
          "Lo sentimos el usuario " +
            usu +
            " se encuentra suspendido, comuniquese con el administrador",
          "warning"
        );
      }
      swal.fire("Mensaje de confirmación", "Bienvenido al sistema", "success");
      $.ajax({
        url: "../Controlador/usuario/controlador_crear_sesion.php",
        type: "POST",
        data: {
          id_acceso: data[0][0],
          nombre_usuario: data[0][1],
          nivel_acceso: data[0][3],
        },
      }).done(function (resp) {
        let timerInterval;
        Swal.fire({
          title: "Bienvenido al sistema",
          html: "Usted sera redireccionado en <b></b> milisegundos.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
          }
        });
      });
    }
  });
}
