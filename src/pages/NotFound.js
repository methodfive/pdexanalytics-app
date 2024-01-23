import {Helmet} from "react-helmet-async";

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 Not Found | Polkadex Analytics</title>
            </Helmet>
            <div id="content" className="content subpage first-container">
                <div className="container">
                    <div className="content-box">
                        <h1>404 Not found</h1>
                        <p style={{marginBottom:"800px"}}>The file you were looking for could not be found!</p>
                    </div>
                </div>
            </div>
        </>
    );
}