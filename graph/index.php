<?php
session_start();

?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <script src="js/bootstrap.js" type="text/javascript"></script>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-reboot.min.css" rel="stylesheet" type="text/css"/>   
    </head>
  
    <style>
        .highcharts-background{fill:#fff;}
        .highcharts-title,
        .highcharts-exporting-group
        {display:none!important}
        .valuegraph{
            background-color: transparent!important;
            border: 0!important;
            font-size: 30px!important;
        }
        label{
            color: #888!important;
        }
        .highcharts-stack-labels text{
            fill: #424242!important;
            font-size: 24px!important;
        }
        .btngraph{
            color: #fff;
            background-color: #1fbf5b;
            border-color: #1fbf5b;
        }
        .btngraph:hover{background-color#262626;border-color:#262626;}
        input[type=range] {
            /*removes default webkit styles*/
            -webkit-appearance: none;
            /*fix for FF unable to apply focus style bug */
            border: 1px solid white;
            /*required for proper track sizing in FF*/
            width: 300px;
        }
        .highcharts-axis-labels text{
            font-family: 'Oswald',sans-serif!important;
            font-size: 16px!important;
        }
        .highcharts-color-1{
            fill: #262626!important;
        }

        .highcharts-color-0,
        .highcharts-color-2{
            fill: #1fbf5b!important;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 300px;
            height: 5px;
            background: #ddd;
            border: none;
            border-radius: 3px;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #1FBF5B;
            margin-top: -4px;
        }

        input[type=range]:focus,
        .form-control:focus {
            outline: none;
            box-shadow:none;
        }

        input[type=range]:focus::-webkit-slider-runnable-track {
            background: #ccc;
        }

        input[type=range]::-moz-range-track {
            width: 300px;
            height: 5px;
            background: #ddd;
            border: none;
            border-radius: 3px;
        }

        input[type=range]::-moz-range-thumb {
            border: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: goldenrod;
        }


        /*hide the outline behind the border*/

        input[type=range]:-moz-focusring {
            outline: 1px solid white;
            outline-offset: -1px;
        }

        input[type=range]::-ms-track {
            width: 300px;
            height: 5px;
            /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
            background: transparent;
            /*leave room for the larger thumb to overflow with a transparent border */
            border-color: transparent;
            border-width: 6px 0;
            /*remove default tick marks*/
            color: transparent;
        }

        input[type=range]::-ms-fill-lower {
            background: #777;
            border-radius: 10px;
        }

        input[type=range]::-ms-fill-upper {
            background: #ddd;
            border-radius: 10px;
        }

        input[type=range]::-ms-thumb {
            border: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #1FBF5B;
        }

        input[type=range]:focus::-ms-fill-lower {
            background: #888;
        }

        input[type=range]:focus::-ms-fill-upper {
            background: #ccc;
        }
    </style>
    <body style="overflow: hidden;">
        <!--INICIO DO FORM-->
        <defs>
    <pattern id="pattern1"
             x="10" y="10" width="20" height="20"
             patternUnits="userSpaceOnUse" >

        <circle cx="10" cy="10" r="10" style="stroke: none; fill: #0000ff" />

    </pattern>
    </defs>
    <div class="cointainer-fluid">
        <div class="row">

            <div class="col-md-12">
                <div class="jumbotron" style="background-color: #fff;">
                    <form method="post" action="processa.php">                              
                        <div class=" row">
                            <div class="col-md-3">
                                <label>Selecione a forma de negociação</label>                          
                                <div class="input-group">
                                    <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" name="tipo">
                                        <option selected value="0">Selecione</option>
                                        <option value="1.0855">Banco</option>
                                        <option value="1.1140">Conservador</option>
                                        <option value="1.1282500" selected="selected">Moderado</option>
                                        <option value="1.1757500">Agressivo</option>
                                    </select>
                                </div>
                            </div>                                                   

                            <div class="col-md-3">
                                <label>Investimento Inicial</label>

                                <div class="col-md-10">
                                    <p id="resultado1" class="valuegraph form-control">2500000</p>
                                </div>
                                <div class="col-md-10">
                                    <input type="range" id="price" class="valuegraph form-control" min="100000" max="5000000" step="100000" value="2500000" name="inv"/>
                                </div>
                            </div>                                
                            <div class="col-md-3">                                  
                                <label>Periodo</label>
                                <div class="col-md-10">
                                    <p id="resultado2" class="valuegraph form-control">5</p>
                                </div>
                                <div class="col-md-10">
                                    <input type="range" id="year" class="valuegraph form-control"  min="1" max="10" step="1" value="5" name="periodo" />
                                </div>          
                            </div>
                            <div class="col-md-3">

                                <button type="submit" class="btngraph btn btn-primary" style="margin-top: 30px;">Calcular</button>
                            </div>
                            <?php
                            if (isset($_GET['ok'])) {
                               require 'n2.php';
                                
                            } else {
                                require 'n1.php';
                            }
                            ?>

                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
<!--FIM DO FORM-->
</body>




<!--SCRIPT DOS INPUTS RANGER-->
<script src="js/jquery.min.js" type="text/javascript"></script>
<script>
        var p = document.getElementById("price"),
                res1 = document.getElementById("resultado1");

        p.addEventListener("input", function () {
            res1.innerHTML = "" + p.value;
        }, false);

        var d = document.getElementById("year"),
                res2 = document.getElementById("resultado2");

        d.addEventListener("input", function () {
            res2.innerHTML = "" + d.value;
        }, false);
</script>


</body>
</html>
