const channelId = 2515899;
const apiKey = "MDS9W94XPEJ6R4TQ";



async function getData(id, key) {
    const url = `https://api.thingspeak.com/channels/${id}/feeds.json?api_key=${key}&results=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
        // console.log(data)
    } catch (error) {
        console.log('Error fetching data:', error)
        return null
    }
};


//* API DATA TO ARRAY

async function transformDataToArray() {
    const data = await getData(channelId, apiKey);
    const dataArray = [];

    if (data && data.feeds) {
        for (const entry of data.feeds) {
            const entryArray = [];
            const fieldCount = Object.keys(entry).filter(key => key.startsWith('field')).length;
            for (let i = 1; i <= fieldCount; i++) {
                const field = `field${i}`;
                if (entry[field] !== undefined) {
                    entryArray.push(parseInt(entry[field]));
                }
            }
            dataArray.push(entryArray);
        }
    }

    // console.log(dataArray)
    return dataArray;
}

// transformDataToArray();


//* COUNT ONES AND ZEROS IN ARRAY
async function countZerosAndOnes() {
    const dataArray = await transformDataToArray();
    const zeros = [];
    const ones = [];

    for (const array of dataArray) {
        let zerosCount = 0;
        let onesCount = 0;
        for (const element of array) {
            if (element === 0) {
                zerosCount++;
            } else if (element === 1) {
                onesCount++;
            }
        }
        zeros.push(zerosCount);
        ones.push(onesCount);
        const currentZeros = zerosCount[zerosCount.length - 1]
    }

    // console.log('Zeros:', zeros);
    // console.log('Ones:', ones);
    return { zeros, ones };
}

// countZerosAndOnes();  //* free parking spots


async function totalAvailable() {
    const returnedValue = await countZerosAndOnes()
    document.getElementById("totalAvail").textContent = returnedValue.zeros[9];
    document.getElementById("totalUsed").textContent = returnedValue.ones[9];
    document.getElementById("totalSlots").textContent = 8;

    

}










totalAvailable()

