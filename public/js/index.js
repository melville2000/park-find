const channelId = 2515899;
const apiKey = "MDS9W94XPEJ6R4TQ";



async function getData(id, key) {
    const url = `https://api.thingspeak.com/channels/${id}/feeds.json?api_key=${key}&results=30`;

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

//* SHOW API DATA OVERVIEW TO DASHBOARD
async function totalAvailable() {
    const returnedValue = await countZerosAndOnes()
    const avail = returnedValue.zeros[9] - returnedValue.zeros[8];
    const unAvail = returnedValue.ones[9] - returnedValue.ones[8];
    document.getElementById("totalAvail").textContent = returnedValue.zeros[9];
    document.getElementById("totalUsed").textContent = returnedValue.ones[9];
    document.getElementById("totalSlots").textContent = 8;
    console.log(document.getElementById('usedStat').innerHTML)
    document.getElementById('usedStat').innerHTML = `<i class="fa fa-long-arrow-down"aria-hidden="true"></i>${avail} <span>Since Last Months</span>`
    console.log(avail, unAvail)
    if (returnedValue.ones[9] < returnedValue.ones[8]) {
        document.getElementById('usedStat').innerHTML = `<i class="fa fa-long-arrow-down"aria-hidden="true"></i>${avail} <span>Since Last Months</span>`
    } else {
        document.getElementById('usedStat').innerHTML = `<i class="fa fa-long-arrow-up"aria-hidden="true"></i>${avail} <span>Since Last Months</span>`
    }
    if (returnedValue.ones[9] < returnedValue.ones[8]) {
        document.getElementById('availStat').innerHTML = `<i class="fa fa-long-arrow-up"aria-hidden="true"></i>${avail} <span>Since Last Months</span>`
    } else {
        document.getElementById('availStat').innerHTML = `<i class="fa fa-long-arrow-down"aria-hidden="true"></i>${avail} <span>Since Last Months</span>`
    }
}


//**OVERVIEW PAGE LINE CHARTS
async function homeBarChart() {
    const returnedValue = await countZerosAndOnes()
    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
            label: 'Available Parking',
            backgroundColor: 'rgba(255, 85, 130, 0.47)',
            borderColor: 'rgba(255, 85, 130, 0.82)',
            fill: true,
            data: returnedValue.zeros,
            tension: 0.4,
        }]
    };

    // Configuration for the chart
    const config = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false, // Set this to false
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Availability History'
                }
            }
        }
    };

    // Create the chart
    var myChart = new Chart(
        document.getElementById('homeOverview'),
        config
    );
}

async function homePie() {
    const returnedValue = await countZerosAndOnes()


    const data = {
        labels: ['Available', "Used"],
        datasets: [{
            label: 'My First Dataset',
            data: [returnedValue.zeros[9], returnedValue.ones[9]],
            backgroundColor: [
                'rgba(20, 116, 235, 0.8)',
                'rgba(235, 121, 20, 0.8)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            hoverOffset: 4
        }]
    };

    // Configuration for the pie chart
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Parking Availability'
                }
            }
        },
    };
    // Create the pie chart
    var myPieChart = new Chart(
        document.getElementById('homePie'),
        config
    );

}








totalAvailable()
homeBarChart()
homePie()
