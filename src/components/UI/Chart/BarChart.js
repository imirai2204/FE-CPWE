import React from "react";
import { Bar } from "react-chartjs-2";

const initialData = {
    listComment: [0],
    listDept: [""],
    listIdea: [0],
};

const BarChart = (props) => {
    return (
        <div className='chart'>
            <Bar
                data={{
                    type: "bar",
                    labels: initialData.listDept,
                    datasets: [
                        {
                            label: "total ideas of department",
                            data: initialData.listIdea,
                            backgroundColor: ["#0052CC"],
                        },
                        {
                            label: "total comments of department",
                            data: initialData.listComment,
                            backgroundColor: ["#f02c2c"],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Bar chart of total ideas in each department",
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
            <label className='chart-title'>Bar chart of total ideas in each department</label>
        </div>
    );
};

export default BarChart;
