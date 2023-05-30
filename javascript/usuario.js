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
      Swal.fire(
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
      Swal.fire("Mensaje de confirmación", "Bienvenido al sistema", "success");
      $.ajax({
        url: "../Controlador/usuario/controlador_crear_sesion.php",
        type: "POST",
        data: {
          id_usuario: data[0][0],
          nombre_usuario: data[0][1],
          nombre_rol: data[0][5],
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
var table;
function listar_usuario() {
  table = $("#tabla_usuario").DataTable({
    ordering: false,
    paging: false,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 100,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../Controlador/usuario/controlador_usuario_listar.php",
      type: "POST",
    },
    columns: [
      { data: "posicion" },
      { data: "nombre_usuario" },
      { data: "nombre_rol" },
      {
        data: "sexo_usuario",
        render: function (data, type, row) {
          if (data == "M") {
            return "Masculino";
          } else {
            return "Femenino";
          }
        },
      },
      {
        data: "estado_acceso",
        render: function (data, type, row) {
          if (data == "Activo") {
            return "<span class='label label-success'>" + data + "</span>";
          } else {
            return "<span class='label label-danger'>" + data + "</span>";
          }
        },
      },
      {
        defaultContent:
          "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-trash'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>",
      },
    ],

    language: idioma_espanol,
    select: true,
  });

    document.getElementById("tabla_usuario_filter").style.display = "none";
    $("input.global_filter").on("keyup click", function () {
      filterGlobal();
    });
    $("input.column_filter").on("keyup click", function () {
      filterColumn($(this).parents("tr").attr("data-column"));
    });
  }

  $("#tabla_usuario").on("click", ".editar", function () {
    var data = table.row($(this).parents("tr")).data();
    if (table.row(this).child.isShown()) {
      var data = table.row(this).data();
    }
    $("#modal_editar").modal({ backdrop: "static", keyboard: false });
    $("#modal_editar").modal("show");
    $("#txtidusuario").val(data.id_usuario);
    $("#txtusu_editar").val(data.nombre_usuario);
    $("#cbm_sexo_editar").val(data.sexo_usuario).trigger("change");
    $("#cbm_rol_editar").val(data.nombre_rol).trigger("change");
  });

  $("#tabla_usuario").on("click", ".activar", function () {
    var data = table.row($(this).parents("tr")).data();
    if (table.row(this).child.isShown()) {
      var data = table.row(this).data();
    }
    Swal.fire({
      title: "¿Está seguro de activar al usuario?",
      text: "Una vez hecho esto el usuario  tendra acceso al sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.value) {
        Modificar_Estatus(data.id_usuario, "Activo");
      }
    });
  });

  $("#tabla_usuario").on("click", ".desactivar", function () {
    var data = table.row($(this).parents("tr")).data();
    if (table.row(this).child.isShown()) {
      var data = table.row(this).data();
    }
    Swal.fire({
      title: "¿Está seguro de desactivar al usuario?",
      text: "Una vez hecho esto el usuario no tendra acceso al sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.value) {
        Modificar_Estatus(data.id_usuario, "Inactivo");
      }
    });
  });

  function Modificar_Estatus(idusuario, estatus) {
    var mensaje = "";
    if (estatus == "Inactivo") {
      mensaje = "desactivó";
    } else {
      mensaje = "activó";
    }
    $.ajax({
      url: "../Controlador/usuario/controlador_modificar_estatus_usuario.php",
      type: "POST",
      data: {
        idusuario: idusuario,
        estatus: estatus,
      },
    }).done(function (resp) {
      if (resp > 0) {
        Swal.fire(
          "Mensaje De Confirmacion",
          "El usuario se " + mensaje + " con exito",
          "success"
        ).then((value) => {
          table.ajax.reload();
        });
      }
    });
  }

  function filterGlobal() {
    $("#tabla_usuario").DataTable().search($("#global_filter").val()).draw();
  }

  function AbrirModalRegistro() {
    $("#modal_registro").modal({ backdrop: "static", keyboard: false });
    $("#modal_registro").modal("show");
  }

  function listar_combo_rol() {
    $.ajax({
      url: "../Controlador/usuario/controlador_combo_rol_listar.php",
      type: "POST",
    }).done(function (resp) {
      var data = JSON.parse(resp);
      var cadena = "";
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          cadena +=
            "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
        }
        $("#cbm_rol").html(cadena);
        $("#cbm_rol_editar").html(cadena);
      } else {
        cadena += "<option value=''>No se encontraron registros</option>";
        $("#cbm_rol").html(cadena);
        $("#cbm_rol_editar").html(cadena);
      }
    });
  }

  function Registrar_Usuario() {
    var usu = $("#txt_usu").val();
    var contra = $("#txt_con1").val();
    var contra2 = $("#txt_con2").val();
    var sexo = $("#cbm_sexo").val();
    var rol = $("#cbm_rol").val();
    if (
      usu.length == 0 ||
      contra.length == 0 ||
      contra2.length == 0 ||
      sexo.length == 0 ||
      rol.length == 0
    ) {
      return Swal.fire(
        "Mensaje De Advertencia",
        "Llene los campos vacios",
        "warning"
      );
    }

    if (contra != contra2) {
      return Swal.fire(
        "Mensaje De Advertencia",
        "Las contraseñas deben coincidir",
        "warning"
      );
    }

    $.ajax({
      url: "../Controlador/usuario/controlador_usuario_registro.php",
      type: "POST",
      data: {
        usuario: usu,
        contrasena: contra,
        sexo: sexo,
        rol: rol,
      },
    }).done(function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $("#modal_registro").modal("hide");
          Swal.fire(
            "Mensaje De Confirmacion",
            "Datos correctamente, Nuevo usuario registrado",
            "success"
          ).then((value) => {
            LimpiarRegistro();
            table.ajax.reload();
          });
        } else {
          return Swal.fire(
            "Mensaje De Advertencia",
            "Lo sentimos, el nombre del usuario ya se encuentra en nuestra base de datos",
            "warning"
          );
        }
      } else {
        Swal.fire(
          "Mensaje De Error",
          "Lo sentimos, no se pudo completar el registro",
          "error"
        );
      }
    });
  }

  function Modificar_Usuario() {
    var idusuario = $("#txtidusuario").val();
    var sexo = $("#cbm_sexo_editar").val();
    var rol = $("#cbm_rol_editar").val();
    if (
      idusuario.length == 0 ||
      sexo.length == 0 ||
      rol.length == 0
    ) {
      return Swal.fire(
        "Mensaje De Advertencia",
        "Llene los campos vacios",
        "warning"
      );
    }

    $.ajax({
      url: "../Controlador/usuario/controlador_usuario_modificar.php",
      type: "POST",
      data: {
        idusuario: idusuario,
        sexo: sexo,
        rol: rol,
      },
    }).done(function (resp) {
      if (resp > 0) {
          $("#modal_editar").modal("hide");
          Swal.fire(
            "Mensaje De Confirmacion",
            "Datos actualizados correctamente",
            "success"
          ).then((value) => {
            table.ajax.reload();
          });
      } else {
        Swal.fire(
          "Mensaje De Error",
          "No se pudo completar la actualización ",
          "error"
        );
      }
    });
  }

  function LimpiarRegistro() {
    $("#txt_usu").val("");
    $("#txt_con1").val("");
    $("#txt_con2").val("");
}
