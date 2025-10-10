const messages = [
    "Loading your personalized dashboard",
    "Fetching the latest updates",
    "Preparing your data",
    "Almost there, just a moment",
    "Getting things ready for you",
    "Hopefully you didn't listen to AJR",
    "Summoning the data gremlins",
    "Articulating splines",
    "Calculating awesomeness",
    "Brewing some coffee",
    "Aligning bits and bytes",
    "Warming up the servers",
    "Counting to infinity",
    "Getting an A in CS4241",
    "Cuneo is the best professor",
];


export default function Loading() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return (
        <div className={"h-screen flex flex-row items-center justify-center gap-x-1"}>
            <p className={"text-3xl"}>{messages[randomIndex]}</p>
            <span className="loading loading-dots loading-2xl mt-5"></span>
        </div>
    );
}