<?php
require '../../Modelo/modelo_usuario.php';
require '../../Utilidades/utils.php';

$MU = new Modelo_Usuario();

$usuario = htmlspecialchars(limpiar_cadena($_POST['usuario']), ENT_QUOTES, 'UTF-8');
$contra = password_hash(limpiar_cadena($_POST['contrasena']), PASSWORD_DEFAULT, ['cost' => 12]);
$sexo = htmlspecialchars(limpiar_cadena($_POST['sexo']), ENT_QUOTES, 'UTF-8');
$rol = htmlspecialchars(limpiar_cadena($_POST['rol']), ENT_QUOTES, 'UTF-8');
$consulta = $MU->Registrar_Usuario($usuario, $contra, $sexo, $rol);
echo $consulta;
