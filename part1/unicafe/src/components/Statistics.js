import Statistic from "./Statistic";

const Statistics = ({ clicks }) => {
    const total = clicks.good + clicks.neutral + clicks.bad;
    const avg = (clicks.good * 1 + clicks.bad * -1) / total;
    const positive = clicks.good * (100 / total);

    if (total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic name="Good" result={clicks.good} symbol="." />
                    <Statistic name="Neutral" result={clicks.neutral} symbol="." />
                    <Statistic name="Bad" result={clicks.bad} symbol="." />
                    <Statistic name="Total" result={total} symbol="." />
                    <Statistic name="Average" result={avg} symbol="." />
                    <Statistic name="Positive" result={positive} symbol="%" />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics