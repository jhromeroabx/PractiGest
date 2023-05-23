<?php
    $pass = password_hash('123456',PASSWORD_DEFAULT,['cost'=>12]);

    echo $pass;
?>