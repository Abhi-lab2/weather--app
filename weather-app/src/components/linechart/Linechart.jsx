import React from 'react'
import { LineChart, Line, XAxis } from "recharts";


const Linecharts = ({ sunData }) => {
    return (
        <div>
            <LineChart
                width={400}
                height={200}
                data={sunData}
                style={{ margin: "auto" }}
            >
                <XAxis dataKey="name" />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#eccb87"
                    strokeWidth={2}
                    label={3}
                    name={3}
                />
            </LineChart>
            {/* <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer> */}
        </div>
    )
}

export default Linecharts