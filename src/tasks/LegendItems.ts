import LegendItem from "./LegendItem"

const legendItems = [
    new LegendItem(
        "21+",
        "#741f1f",
        (cases) => cases >= 21,
        "white"
    ),
    new LegendItem(
        "16 - 20",
        "#9c2929",
        (cases) => cases >= 16 && cases < 21,
        "white"
    ),
    new LegendItem(
        "11 - 15",
        "#c57f7f",
        (cases) => cases >= 11 && cases < 16,
        "black"
    ),
     new LegendItem(
        "6 - 10",
        "#d8aaaa",
        (cases) => cases >= 6 && cases < 11,
        "black"
    ),
     new LegendItem(
        "1 - 5",
        "#ebd4d4",
        (cases) => cases > 0 && cases < 6,
        "black"
    ),
    new LegendItem(
        "0",
        "#ffffff",
        () => true,
        "black"
    ),
    
];

export default legendItems;