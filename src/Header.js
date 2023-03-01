import './Header.css'

function Header() {
    function handleGetStarted() {
        console.log("Something Happened");
    }
    
    return (
        <div className="title">
            <div className='content'>
                <h1>Piano Visualizer</h1>
                <button onClick={handleGetStarted}>Get Started!</button>
            </div>
        </div>
    );
}

export default Header;