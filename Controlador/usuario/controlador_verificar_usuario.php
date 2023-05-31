<?php
require '../../Modelo/modelo_usuario.php';

$MU = new Modelo_Usuario();
$usuario = htmlspecialchars(limpiar_cadena($_POST['user']), ENT_QUOTES, 'UTF-8');
$contra = htmlspecialchars(limpiar_cadena($_POST['pass']), ENT_QUOTES, 'UTF-8');
$consulta = $MU->VerificarUsuario($usuario, $contra);
$data = json_encode($consulta);
if (count($consulta) > 0) {
    echo $data;
} else {
    echo 0;
}
