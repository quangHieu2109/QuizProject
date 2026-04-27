import { useEffect, useState } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(3000)
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    }
    useEffect(() => {
        if (count === 0) {
            props.onTimeUP();
            return;
        }
        const timer = setInterval(() => { // chạy vô hạn

            setCount(count - 1);

        }, 1000) // sau 1s call function 1 lần
        // setTimeout(() => { //chạy 1 lần duy nhất
        //     clearInterval(timer);
        // }, 5000)
        //chèn logic giữa các lần render của react, func sẽ được thực thi trước
        //khi render lại giao diện
        return () => {
            clearInterval(timer);
        }
    }, [count])
    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown;