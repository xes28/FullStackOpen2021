const Header = ({ text, errorMsg, successMsg }) => (
    <div>
        {errorMsg ?
            <div className="error">
                {errorMsg}
            </div>
            : ""}
        {successMsg ?
            <div className="success">
                {successMsg}
            </div>
            : ""}
        <h2>{text}</h2>
    </div>
)

export default Header