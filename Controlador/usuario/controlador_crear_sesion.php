<?php
$ID_ACCESO = $_POST['id_acceso'];
$NOMBRE_USUARIO = $_POST['nombre_usuario'];
$NIVEL_ACCESO = $_POST['nivel_acceso'];
session_start();
$_SESSION['S_ID_ACCESO']=$ID_ACCESO;
$_SESSION['S_NOMBRE_USUARIO']=$NOMBRE_USUARIO;
$_SESSION['S_NIVEL_ACCESO']=$NIVEL_ACCESO;
?>