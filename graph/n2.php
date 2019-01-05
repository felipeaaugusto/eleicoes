<?php
//RESPOSTAS SEM TRATAMENTO
$BANCO = $_SESSION['banco'];
$FINAL = $_SESSION['final'];
$INV = $_SESSION['inv'];
//lucro no banco
$LUCRO_BANCO = $BANCO - $INV;
//
$LUCRO_LIQ = $FINAL - $INV;


$LUCRO_FINAL = $LUCRO_LIQ - $LUCRO_BANCO;

?>
<body>
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <script src="code/highcharts.js"></script>
            <script src="code/modules/exporting.js"></script>
            <script src="code/modules/export-data.js"></script>


            <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>



            <script type="text/javascript">

                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Stacked column chart'
                    },
                    xAxis: {
                        categories: ['Banco', 'Lucrei', 'Você deixou de ganhar']
                    },
                    yAxis: {
                        min: 0,
                        max:<?php echo $FINAL; ?>,
                        title: {
                            text: 'Total do reajuste'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    series: [{
                            name: 'Total do Reajuste',
                            data: [<?php echo $LUCRO_BANCO; ?>,<?php echo $LUCRO_LIQ; ?>, 0]
                        }, {
                            name: 'Banco',
                            data: [<?php echo $INV; ?>,<?php echo $INV; ?>, 0]
                        }, {
                            name: 'Lucro obtido',
                            data: [0, 0,<?php echo $LUCRO_FINAL; ?>]
                        }]
                });
            </script>
        </div>
        <div class="col-md-1"></div>
    </div>
    </div>
</body>