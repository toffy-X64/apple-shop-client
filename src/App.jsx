import Header from "@components/layout/Header/index";
import Footer from "@components/layout/Footer/Footer";

import Router from '@components/common/Router/Router';

const App = () => {
    return (
        <div className="app">
            <Header />
            <main>
                <Router />
            </main>
            <Footer />
        </div>
    );
}

export default App;