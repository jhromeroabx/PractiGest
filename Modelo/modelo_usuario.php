<?php
class Modelo_Usuario
{
    private $conexion;
    function __construct()
    {
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    function VerificarUsuario($usuario, $contra)
    {
        $sql = "call VERIFICAR_USUARIO('$usuario')";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                if (password_verify($contra, $consulta_VU["contrasena"])) {
                    $arreglo[] = $consulta_VU;
                }
            }
            $this->conexion->cerrar();
            return $arreglo;
        }
    }

    function listar_usuario(){
        $sql = "call LISTAR_USUARIO()";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                $arreglo["data"][]=$consulta_VU;

            }
            $this->conexion->cerrar();
            return $arreglo;
        }
    }

    function listar_combo_rol(){
        $sql = "call LISTAR_COMBO_ROL()";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[] = $consulta_VU;
            }
            $this->conexion->cerrar();
            return $arreglo;
        }
    }
    
    function Modificar_Estatus_Usuario($idusuario,$estatus){
        $sql = "call MODIFICAR_ESTATUS_USUARIO('$idusuario','$estatus')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
            return 0;
        }
    }

    function Modificar_Datos_Usuario($idusuario,$sexo,$rol){
        $sql = "call MODIFICAR_DATOS_USUARIO('$idusuario','$sexo','$rol')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
            return 0;
        }
    }

    function Registrar_Usuario($usuario,$contra,$sexo,$rol){
        $sql = "call REGISTRAR_USUARIO('$usuario','$contra','$sexo','$rol')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
    }

}
?>