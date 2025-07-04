import Header from "../components/Home/Header";


const Home = ()=>{
    return (
        <>
            <Header />

            <div className="min-h-screen bg-primary text-text flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Welcome to EventHive
                </h1>
            </div>
        </>
    )
};

export default Home;