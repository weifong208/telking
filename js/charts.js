var optionLine = {
    title: {
        text: '曲线图数据展示',
        left: 'center'
    },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    
    axisLabel:{
        formatter: '{value} 人'
    },
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: 'rgba(0, 0, 256, 0.1)'
      },
      itemStyle : { 
          normal: {
              label : {show: true}
            }
        },
    }
  ]
};

var optionPie = {
    title: {
        text: '饼状图数据展示',
        left: 'center'
    },
    series: [
      {
        type: 'pie',
        data: []
      }
    ]
};

var optionBar = {
    title: {
        text: '柱状图数据展示',
        left: 'center'
    },
    xAxis: {
      data: []
    },
    yAxis: {
        name: '商品数',
        nameLocation: 'end',
    },
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        data: []
      }
    ]
};
 
window.onload = function(){
 
    fetch('https://edu.telking.com/api/?type=month')
        .then(response => response.json())
        .then(json => {
            var chartDom = document.getElementById("middle-chart-line");
            var myChart = echarts.init(chartDom);
            optionLine.series[0].data = json.data.series;
            optionLine.xAxis.data = json.data.xAxis;
            optionLine && myChart.setOption(optionLine);
        })

    fetch("https://edu.telking.com/api/?type=week")
        .then(response => response.json())
        .then(json => {
            var chartDom = document.getElementById("middle-chart-pie");
            var myChart = echarts.init(chartDom);
  
            for (var i in json.data.series) {
                var pieData = {}
                pieData.value = json.data.series[i];
                pieData.name = json.data.xAxis[i];
                optionPie.series[0].data.push(pieData);
           
            }
            
            optionPie && myChart.setOption(optionPie);
        })

    fetch("https://edu.telking.com/api/?type=week")
        .then(response => response.json())
        .then(json => {
            var chartDom = document.getElementById("middle-chart-bar");
            var myChart = echarts.init(chartDom);
 
            optionBar.series[0].data = json.data.series;
            optionBar.xAxis.data = json.data.xAxis;
           
            optionBar && myChart.setOption(optionBar);
        })        
}
