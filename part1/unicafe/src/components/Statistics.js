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
                    <Statistic name="Good" result={clicks.good} />
                    <Statistic name="Neutral" result={clicks.neutral} />
                    <Statistic name="Bad" result={clicks.bad} />
                    <Statistic name="Total" result={total} />
                    <Statistic name="Average" result={avg} />
                    <Statistic name="Positive" result={positive} symbol="%" />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics