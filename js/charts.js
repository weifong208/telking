var chartDom = document.getElementById('charts');
var myChart = echarts.init(chartDom);
var option;
 
var json;

option = {
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
      itemStyle : { 
          normal: {
              label : {show: true}
            }
        },
    }
  ]
};

async function gettelkingData() {
    let response = await fetch("https://edu.telking.com/api/?type=month");
    if (response.ok) {  
        json = await response.json();
        console.log("获取成功")
        console.log(json.data);
        option.series[0].data = json.data.series;
        option.xAxis.data = json.data.xAxis;
        
  //      option.series[0].data.concat(json.data.series);
        option && myChart.setOption(option);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

gettelkingData();

 



