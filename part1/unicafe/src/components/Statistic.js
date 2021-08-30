const Statistic = ({ name, result, symbol }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{result}{symbol}</td>
        </tr>
    )
}

export default Statistic