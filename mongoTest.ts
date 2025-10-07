const sendData = async () =>{
        
        const data = [
            {
                userId: "123",
            recentlyListened: [
                {artistId: "a1", country: "UK"},
                {artistId: "a2", country: "US"},
                ]
            },
            {
                userId: "456",
            recentlyListened: [
                {artistId: "a4", country: "AU"},
                {artistId: "a5", country: "NZ"},
                {artistId: "a7", country: "Yugoslavia"}
                ]
            }
        ]

        const json = {list: data}
        const body = JSON.stringify(json);

        const response = await fetch("http://localhost:3000/load", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body
        });

        const resp = await response.json();

        console.log(resp.message);
    }


const receiveData = async (id: string) => {
    const userId = id;
    const json = {userId: userId};
    const body = JSON.stringify(json);

    const response = await fetch ("http://localhost:3000/get", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body
    });

    const data = await response.json();

    console.log(data);

}

//sendData();
receiveData("123")