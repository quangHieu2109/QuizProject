import "./DashBoard.scss";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';
const DashBoard = (props) => {
    const data = [
        {
            name: 'A',
            uv: 400,
            pv: 240,
            amt: 2400,
        },
        {
            name: 'B',
            uv: 300,
            pv: 456,
            amt: 2400,
        },
        {
            name: 'C',
            uv: 300,
            pv: 139,
            amt: 2400,
        },
        {
            name: 'D',
            uv: 200,
            pv: 980,
            amt: 2400,
        },
        {
            name: 'E',
            uv: 278,
            pv: 390,
            amt: 2400,
        },
        {
            name: 'F',
            uv: 189,
            pv: 480,
            amt: 2400,
        },
    ];
    const isAnimationActive = true;
    return (
        <div className="dashboard-container">
            <div className="title">
                Analytics dashboard
            </div>
            <div className="content">
                <div className="c-left">
                    <div className="child">Total Users</div>
                    <div className="child">Total Quizzes</div>
                    <div className="child">Total Questions</div>
                    <div className="child">Total Answer</div>
                </div>
                <div className="c-right">
                    <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" isAnimationActive={isAnimationActive} />
                        <Bar dataKey="uv" fill="#82ca9d" isAnimationActive={isAnimationActive} />
                        {/* <RechartsDevtools /> */}
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;