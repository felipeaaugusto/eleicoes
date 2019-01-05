<?php
//recebe informação do form/post
$TIPO = $_POST['tipo'];
$INV = $_POST['inv'];
$PERIOD = $_POST['periodo'];
//FIM DO RECEBIMENTO
//FAZ CALCULO BASE
$BANCO = $INV * pow(1.0855, $PERIOD);
//FIM CALCULO BASE

//FAZ CALCULO DO MODO SELECIONADO
$FINAL = $INV * pow($TIPO, $PERIOD);
//FIM CALCULO 

//INICIA SESSAO COM OS DADOS CALCULADOS
session_start();
$_SESSION['final'] = $FINAL;
$_SESSION['banco'] = $BANCO;
$_SESSION['inv'] = $INV;


//ENVIA PRA PAGINA DO GRAFICO COM 
header('location:index.php?ok');




