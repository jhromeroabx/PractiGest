<?php
class conexion
{
    private $servidor;
    private $usuario;
    private $contrasena;
    private $basedatos;
    public $conexion;
    public function __construct()
    {
        $this->servidor = "127.0.0.1:3307";
        $this->usuario = "root";
        $this->contrasena = "";
        $this->basedatos = "practigest";
    }
    function conectar()
    {
        $this->conexion = new mysqli($this->servidor, $this->usuario, $this->contrasena, $this->basedatos);
        $this->conexion->set_charset("utf8");
    }
    function cerrar()
    {
        $this->conexion->close();
    }
}
?>