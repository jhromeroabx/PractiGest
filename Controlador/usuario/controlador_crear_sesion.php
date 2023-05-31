<?php
require '../../Utilidades/utils.php';

$ID_USUARIO = limpiar_cadena($_POST['id_usuario']);
$NOMBRE_USUARIO = limpiar_cadena($_POST['nombre_usuario']);
$NOMBRE_ROL = limpiar_cadena($_POST['nombre_rol']);
session_start();
$_SESSION['S_ID_USUARIO'] = $ID_USUARIO;
$_SESSION['S_NOMBRE_USUARIO'] = $NOMBRE_USUARIO;
$_SESSION['S_NOMBRE_ROL'] = $NOMBRE_ROL;
