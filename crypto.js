//states = { page : 0, 
//          users : [, // to identify which users account it is
//              {username: "Zeynep", balance: "1000", day : "2", dolar: "1000", wallet : {name: "", amount: ""} } }
//              ...
//                  ]
//

//IMPORTANT
//page: 0 // 0 is for users page
//page: 1 //prompt page (for user to enter account username)
//page : 2 //crypto showing page
$(function() {
let statesCrypto = {}
let currentUser = ""

let dataStored = localStorage.getItem("statesCrypto")
statesCrypto = dataStored ? JSON.parse(dataStored) : { page: 0, users : []}
renderPage()

 
function update() {
    renderPage()
    localStorage.setItem("statesCrypto", JSON.stringify(statesCrypto))
}

function renderPage() {
    if (statesCrypto.page === 0) {
        $("#root").html(`
                <main class="usersPage">
                    <p id="ctis"><span>CTIS</span> Crypto Trading Information System</p>
                    <nav>
                        ${renderUsers()}
                    </nav>
                    <button type="button" id="new-profile-btn"><span>+</span> New Profile</button>
                </main>
            `)
    } else if (statesCrypto.page === 1) {
        
        $("#root").html(`
            <main class="usersPage"> 
                    <p id="ctis"><span>CTIS</span> Crypto Trading Information System</p>
                    <nav>
                        ${renderUsers()}
                        ${renderPrompt()}
                    </nav>
                    <button type="button" id="new-profile-btn"><span>+</span> New Profile</button>
            </main>
        `)
    } else if (statesCrypto.page === 2) {
        statesCrypto.balance = 1000;
        $("#root").html(`
                <main class="cryptoPage">
                    <div class="header">
                        <p id="ctis"><span>CTIS</span> Crypto Trading Information System</p>
                        <div class="userAndLogOut">
                            <div class="personName">&#x1F464; ${currentUser}</div>
                            <div id="logout">Logout</div>
                        </div>
                    </div>

                    <div id="days"></div>
                    <div id="coins"></div>
                    <div id="trading"></div>
                </main>
            `)
    }
}

// F007
function renderUsers() {
    let out = ""
    if (statesCrypto.users.length === 0) {
        out += "<div class='empty'><empty>Empty</empty></div>"
    } else {
        for (let i = 0; i < statesCrypto.users.length; i++) {
            out += `
                <div class='userProfiles'>
                    <div class="user">
                        <section class="user-icon-and-name">
                            <p class="icon">&#x1F464;</p>
                            <p class="name">${statesCrypto.users[i].username}</p>
                        </section>
                        <section class="plusBtnInUserDivs">
                            <div id="xbtn">x</div>
                        </section>
                    </div>
                </div>
            `
        }
    }
    return out            
}

function renderPrompt() {
    let out = ""
    out += `<div id="prompt">
        <p>New Profile</p>
        <input type="text" id="enterusername" placeholder="Enter new profile...">
        <div id="addDiv">
            <button type="button" id="addbtn">Add</button>
        </div>
    </div>`
    return out
}

$("#root").on("click", "#new-profile-btn", function() {
    statesCrypto.page = 1
    $(this).parent().toggleClass(".opacity")
    renderPage()
    update()
})

$("#root").on("click","#addbtn" ,function(e) {
    let nameofuser = $("#enterusername").val() 
    statesCrypto.users.push({ username:nameofuser , balance: "1000", day : "2", dolar: "1000"})
    $("#enterusername").val("")
    statesCrypto.page = 0
    renderPage()
    update()
})


$("#root").on("click", ".userProfiles",function() {
    statesCrypto.page = 2
    currentUser = $(this).find(".name").text()
    renderPage()
    update()
    location.reload();
})

$("#root").on("click", ".plusBtnInUserDivs", function(e) {
    e.stopPropagation()
    let idx = $(this).parent().parent().index()
    statesCrypto.users.splice(idx, 1)
    renderPage()
    update()
})

$("#root").on("click","#logout", function() {
    // alert("pls work pls pls pls")
    statesCrypto.page = 0
    renderPage()
    update()
})

var daysPast = [120];
var selected;
var counter=1;
var balance = 0;
var name;
var size = [110, 2.6, 0.005, 480, 0.07, 120, 12, 1900, 100]
var curDate = market[counter].date.split("-");
const monthNames=["January","February","March",
    "April","May","June","July","August","September",
    "October","November","December"];
    console.log(curDate);

    $('div#days').html(
    `
    <h1>Day ${counter+1}</h1>
    <h2> ${curDate[0]} ${monthNames[Number(curDate[1])-1]}
     ${curDate[2]} </h2>
     <div id="buttons">
    <button type="button" id="btnNextDay"> <i class="fa-solid fa-forward"></i> Next Day </button>
    <button type="button" id="btnPlay"> <i class="fa-solid fa-play"></i> Play </button>
    </div>
     ` 
    )

    function incCounter(){
        if(counter<364)
        {
            counter++;
        
        if(counter<121)
            daysPast.push(counter);
        else{
            daysPast.shift();
            daysPast.push(counter);
        }
        curDate = market[counter].date.split("-");
        console.log(curDate);
        $('h1').text(`Day ${counter+1}`);
        $('h2').text(` ${curDate[0]} ${monthNames[Number(curDate[1])-1]}
        ${curDate[2]}`);
        if(selected != null)
            drawChart(selected);
        }
    }

    let timer = null ;
    $("#btnPlay").on("click", function(){
    if ( timer === null) {
    timer = setInterval(incCounter, 100) ;
    $(this).html(`<i class="fa-solid fa-pause"></i> Pause`)
    } else {
    clearInterval(timer)
    $(this).html(`<i class="fa-solid fa-play"></i> Play`)
    timer = null ;
    }
    })

    $("#btnNextDay").on("click", incCounter);

    $('div#coins').html(
        `
        <div id="list"> </div>

        <div id="title"> <span></span> </div>

        <div id="chart"> </div>
        `
    )

    let str = "";
    for( let coin of coins)
        str+=`<img src="./images/${coin.image}" class="selected" id="${coin.code}"></img>`;
    $("div#list").html(str);
    $("img").css("width", "30px");

    $("img").on("click", function(){
        
        selected = $(this).attr("id");
        drawChart(selected);
        name = findName(selected);
        $("img").removeClass("selected");

        $("img").removeClass("selected");
        $(this).addClass("selected");
        $("img").finish();

        function animatePulse() {
            $(this).animate({width: "50px"}, 500).animate({width: "30px"}, 500, function() {
                if($(this).hasClass("selected"))
                    animatePulse.call(this);
            });
        }
        animatePulse.call(this);

        $("div#title").html(
            `
            <img src="./images/${selected}.png" style="width:30px"><p>${name}</p><p id="info"></p>
            `
        )
    })

    function findName(id){
        for(let value of coins)
            if (value.code == id)
                return value.name;
    }

    function findIndex(id){
        for(let i=0;i<coins.length;i++)
            if(coins[i].code == id)
                return i;   
    }

    function drawChart(selected){
        let otp = "";
        let x = 0;
        let curSize = size[findIndex(selected)];
        var cl;
        var lineHeight;
        var minVal;
        var maxVal;
        for(let value of daysPast)
        {
            let obj = market[value-1];
            let coinObj = obj.coins.find(coin => coin.code === selected);
            let entry = coinObj.open
            let exit = coinObj.close;
            let min = coinObj.low;
            let max = coinObj.high;
            let stickHeight = (max - min) * curSize;  // height of black stick
            var barHeight = Math.abs(entry - exit) * curSize // height of green/red bar
            var barPos = Math.min(entry, exit)  * curSize // from the bottom 
            let color = entry < exit ? "green" : "red" ;
            x += 9.82 ;
            otp+=`<div class='stick' style='height:${stickHeight}px; bottom:${min*curSize}px; left:${x}px'></div>`
            otp+=`<div id="${value}" class='bar' style='background:${color}; bottom:${barPos}px; left:${x-3}px; height: ${barHeight}px;'></div>`

            if(daysPast.length == daysPast.indexOf(value)+1)
            {  
                cl = exit;
                lineHeight = barPos+barHeight;
                minVal = min;
                maxVal = max;
            }
        }
        
        $("div#chart").html(otp + `<div id="line" style="bottom:${lineHeight}px"><div id="cl">$${cl}</div></div>` + `<div id="min">$${minVal}</div>` + `<div id="max">$${maxVal}</div>`);
    }

    $("#trading").html(`<div class="h1Balance"><h1>$${balance}</h1></div><section class="TradingAndWallet">
        <div class="trading">
            <h2>Trading</h2>
            <div class="buyAndSell">
                <div id="buy" class="selectedTrading">Buy</div>
                <div id="sell" class="notselected">Sell</div>
            </div>
            <div class="calcAmount">
                 <input type="text" id="amount" placeholder="Amount">
                 <p class="showMoney"> =$</p>
            </div>
            <button type="button" id="buyBtn">Buy <span></span></button>
        </div>
        <div class="wallet"></div>
        <div class="wallet">
        <h2>Wallet</h2>
        <table>
            <tr>
                <th>Coin</th>
                <th>Amount</th>
                <th>Subtotal</th>
                <th>Last Close</th>
            </tr>
            <tr>
                <td>Dolar</td>
                <td>$<span id="dolarAmount">1000.00</span></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div></section>`)

    $("#amount").on("change", function() {
        let amo = parseFloat($(this).text());
        let price = parseFloat($("#cl").text().replace("$", ""));
        let x = amo * price;

        $("p#showMoney").text(`= $ ${x}`);
    })

    $("#buy").on("click", function(){
        if($(this).hasClass("notSelected"))
            {
                $(this).removeClass("notSelected");
                $("div").removeClass("selectedTrading");
                $(this).addClass("selectedTrading");
                console.log("a");
            }
    })

    $("#sell").on("click", function(){
        if($(this).hasClass("notSelected"))
            {
                $(this).removeClass("notSelected");
                $("div").removeClass("selectedTrading");
                $(this).addClass("selectedTrading");
            }
    })

    $("#buyBtn").on("click", function() {
        
        let price = parseFloat($("#cl").text().replace("$", ""));
        console.log(price);
        let amo = $("#amount").val();
        console.log(amo);
        let x = amo * price;
        console.log(x)

        $("p.showMoney p").text(`= $${x}`);
        
        $("tr:last").after(`
                <td><p><img src="./images/${selected}.png" style="width:30px">${name}</p><p id="info"></p></td>
                <td>${amo}</td>
                <td>${x}</td>
                <td>${price}</td>
        `)
        balance+=x;
    })

    $("div.bar").hover(function(){
        let pos=$(this).id;
        let count = daysPast[pos];
        let obj =market[count];
        let date = obj.date;
        let coinObj = obj.coins.find(coin => coin.code === selected);
        let entry = coinObj.open
        let exit = coinObj.close;
        let min = coinObj.low;
        let max = coinObj.high;
        console.log(`Date: ${date} Open: $${entry} Close: $${exit} High: $${max} Low: $${min}`);
        $("#info").text(`Date: ${date} Open: $${entry} Close: $${exit} High: $${max} Low: $${min}`);
    })

    
    function findCurUserIndex(usersNam) {
        let ind
        for (let i = 0; i < statesCrypto.users.length; i++) {
            if (usersNam === statesCrypto.users.name) {
                ind = i
            }
        }
        return ind
    }

    if(counter==363)
    {
       $(".h1Balance").animatePulse();
       $(".trading").html("");
    }
    
    //console.log(currentUser)
    //console.log(findCurUserIndex[currentUser])

    // statesCrypto.users[findCurUserIndex(currentUser)].day = counter
    // console.log(statesCrypto.users[findCurUserIndex(currentUser)].name)

})