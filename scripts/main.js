let ids;

document.addEventListener("DOMContentLoaded", function () {
  
    const maxAnswers = 30;

    var index = new FlexSearch({

        encode: "balance",
        tokenize: "reverse",
        suggest: true,
        cache: true,
        autocomplete: false
    });


    for (var i = 0; i < qnas.length; i++) {
        if (qnas[i]) {
            index.add(i, `${qnas[i].n}  ${qnas[i].t} ${qnas[i].i} ${qnas[i].q} ${qnas[i].a}`);
        } else {
            console.log("Error comma, look after string", qnas[i - 1], i)
        }

    }


    let searchInput = document.getElementById("searchInput");
    let cardsPlace = document.getElementById("cardsPlace");

    searchInput.addEventListener("input", function () {

        showSuggestions();
    });
    function showSuggestions(randomIndexArr) {
        cardsPlace.innerHTML = "Loading..."
        cardsPlace.innerHTML = "";
        let arrIndex;
        if (!randomIndexArr) {
            arrIndex = index.search(searchInput.value, maxAnswers);
        } else {
            arrIndex = randomIndexArr;
        }

        let results = "";
        for (let i of arrIndex) {


            results += `
        <tr>
            <td class="idolName">
            ${qnas[i].n} <br> - <br> ${qnas[i].t}  <br> - <br> <a href="http://www.hello-online.org/index.php?app=helloapp&amp;CODE=article&amp;topic=${qnas[i].i}" target="_blank" >H!O: ${qnas[i].i}</a> </td>
       
            <td  class="idolQ">${(qnas[i].q)}</td>
            <td class="idolA">${qnas[i].a.join("<br>")}</td>
        </tr>`



        }
        let section = document.createElement("section");
        section.innerHTML = `<section class="container bg-dark ">
<div class="card text-center bg-dark">
    <div id="containerTable">
        <table id="tableProducts">
            <tr>
                <th class="idolName">Name and Info</th>

                <th  class="idolQ">Question</th>
                <th class="idolA">Answer</th>

            </tr>
            ${results}
        </table>

    </div>
</div>
</section>`
        cardsPlace.appendChild(section);
    }



    let tablesOptions = document.getElementById("tablesOptions");
    tablesOptions.options[0].selected = true;
    tablesOptions.addEventListener("change", function () {
        //console.log("change");
        let value = tablesOptions.options[tablesOptions.selectedIndex].value;
        //console.log(value)
        if (value === "info") {
            index.clear();
            for (var i = 0; i < qnas.length; i++) {
                index.add(i, `${qnas[i].n}  ${qnas[i].t} ${qnas[i].i}`);
            }

        } else if (value === "q") {
            index.clear();
            for (var i = 0; i < qnas.length; i++) {
                index.add(i, `${qnas[i].q}`);
            }

        } else if (value === "a") {
            index.clear();
            for (var i = 0; i < qnas.length; i++) {
                index.add(i, `${qnas[i].a}`);
            }

        } else if (value === "all") {
            index.clear();
            for (var i = 0; i < qnas.length; i++) {
                index.add(i, `${qnas[i].n}  ${qnas[i].t} ${qnas[i].i} ${qnas[i].q} ${qnas[i].a}`);
            }
        }
        showSuggestions();
    });





    //---


    ids = function () {
        let idsSet = new Set();

        qnas.forEach(element => {
            idsSet.add(element["i"]);
        });
        return ([...idsSet].sort((a, b) => a - b));
    }



    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }


    let len = qnas.length;
    let numRandomQnAs = 20;
    let randomArr = [];
    for (let i = 0; i < numRandomQnAs; i++) {
        randomArr.push(getRandomInt(0, len))
    }
    showSuggestions(randomArr)
    searchInput.focus();

});
