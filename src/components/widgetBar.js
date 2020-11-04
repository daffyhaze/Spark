import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, charts, FusionTheme);

function widgetBar(props) {
    
       
    const chartConfigs = {
        type: "bar2d", // The chart type
        width: "100%", // Width of the chart
        height: "300", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            xAxisName: "Country",           //Set the x-axis name
            yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
            bgColor: "#2a2a2a",
            numberSuffix: "K",
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
      };

    
    return (
        <div>
            <div className='widgetWrap'>
                    <div className='widgetTitle'>
                        {props.Title}
                    </div>
                    <div className='widgetValue'>
                        <ReactFC {...chartConfigs} />
                    </div>
                </div>
        </div>
    )
}

export default widgetBar;