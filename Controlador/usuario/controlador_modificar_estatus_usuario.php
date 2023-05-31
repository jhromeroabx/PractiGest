<?php
require '../../Modelo/modelo_usuario.php';
require '../../Utilidades/utils.php';


$MU = new Modelo_Usuario();
$idusuario = htmlspecialchars(limpiar_cadena($_POST['idusuario']), ENT_QUOTES, 'UTF-8');
$estatus = htmlspecialchars(limpiar_cadena($_POST['estatus']), ENT_QUOTES, 'UTF-8');
$consulta = $MU->Modificar_Estatus_Usuario($idusuario, $estatus);
echo $consulta;
