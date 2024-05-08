function Header({ username }) {
    return(
        <section className="header">
            <p>logged on as {username}</p>
            <h1>Northcoders News</h1>
        </section>
    )
}
export default Header;