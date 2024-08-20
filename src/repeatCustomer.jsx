import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const LineChart4 = () => {
  const [data, setData] = useState({ options: {}, series: [] });
  const [dataType, setDataType] = useState("daily");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shopify-analytics-backend.onrender.com/analytics/data3"
        );
        setChartData(response.data[0]);
        updateChartData("daily", response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateChartData = (type, data) => {
    let seriesData = [];
    let categories = [];

    if (type === "daily") {
      seriesData = data.daily.map((item) => ({
        x: new Date(item.year, 0, item.day).getTime(),
        y: item.repeatCustomers,
      }));
      categories = data.daily.map((item) =>
        new Date(item.year, 0, item.day).toLocaleDateString()
      );
    } else if (type === "monthly") {
      seriesData = data.monthly.map((item) => ({
        x: new Date(item.year, item.month - 1).getTime(),
        y: item.repeatCustomers,
      }));
      categories = data.monthly.map(
        (item) => `${item.year}-${item.month.toString().padStart(2, "0")}`
      );
    } else if (type === "quarterly") {
      seriesData = data.quaterly.map((item) => ({
        x: new Date(item.year, (item.quater - 1) * 3).getTime(),
        y: item.repeatCustomers,
      }));
      categories = data.quaterly.map((item) => `Q${item.quater} ${item.year}`);
    } else if (type === "yearly") {
      seriesData = data.yearly.map((item) => ({
        x: new Date(item.year, 0).getTime(),
        y: item.repeatCustomers,
      }));
      categories = data.yearly.map((item) => item.year);
    }

    setData({
      options: {
        chart: {
          id: "time-series-chart",
          type: "line",
        },
        xaxis: {
          type: "datetime",
          categories: categories,
          title: {
            text: "Date",
          },
        },
        title: {
          text: "Number of Repeat Customers",
          align: "left",
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
          y: {
            formatter: (value) => `${value}`,
          },
        },
      },
      series: [
        {
          name: "Repeat Customers",
          data: seriesData,
        },
      ],
    });
  };

  const handleDataTypeChange = (event) => {
    const selectedType = event.target.value;
    setDataType(selectedType);
    updateChartData(selectedType, chartData);
  };

  return (
    <div>
      <select
        value={dataType}
        onChange={handleDataTypeChange}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {data.series.length > 0 ? (
        <Chart
          options={data.options}
          series={data.series}
          type="line"
          height={350}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LineChart4;
