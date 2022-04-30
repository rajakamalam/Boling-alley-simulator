import './Styles/navBar.css'

export default function NavBar() {
    return (
        <div>
            <header id="nav-wrapper">
                <nav id="nav">
                    <div className="nav left">
                        <span className="gradient skew"><h1 className="logo un-skew"><a href="#home">Bowling alley score simulator</a></h1></span>
                    </div>
                    <div className="nav right">
                        <a href="/" className="nav-link active"><span className="nav-link-span"><span className="u-nav">Home</span></span></a>
                    </div>
                </nav>
            </header>
        </div>
    )
}

