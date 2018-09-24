$(document).ready(function () {

    // ALL THE HIDDEN ITEMS
    $("#resultsDiv").hide();
    $("#gameSportsRow").hide();
    $("#createEventDiv").hide();
    $("#dynamicDiv").hide();
    $("#findEventDiv").hide();
    $('.datepicker').hide();

    function createLogo() {
        var logo = $("<img>", {
            src: "./logo.png",
            id: "logo",
            alt: "logo image",
            class: "logoImage slide-in-blurred-bottom"
        });
        $("#logoDiv").append(logo);
    }
    createLogo();

    function createFindGroup() {
        var findGroup = $("<button>", {
            class: "btn-large slide-in-blurred-left",
            id: "findGroup",
            text: "Find an event near you!"
        });
        $("#findDiv").append(findGroup);
    }
    createFindGroup();

    function createCreateGroup() {
        var createGroup = $("<button>", {
            class: "btn-large slide-in-blurred-right",
            text: "Create an event!",
            id: "createGroup"
        });
        $("#createDiv").append(createGroup);
    }
    createCreateGroup();

    function createSearchDiv() {
        $("#findGroup").click(function () {
            $("#findDiv").empty();
            $("#createDiv").empty();
            // show - hide
            $("#dynamicDiv").show();
            $("#findEventDiv").show();
            // $("#resultsDiv").show();
            $("#gameSportsRow").show();
            $("#submitBtnRow").show();
        });
    }
    createSearchDiv();

    function createEventInfo() {
        $("#createGroup").click(function () {
            $("#findDiv").empty();
            $("#createDiv").empty();
            $('.datepicker').show();
            // show - hide
            $("#createEventDiv").show();
            $("#dynamicDiv").show();
        });
    }
    createEventInfo();
    // create:
    // name X
    // address X
    // email X
    // sports or gaming X
    // title X
    // description X
    // date and time
    // submit button X

    // particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);

    var submit = $("#submitCreateDiv");

    submit.on("click", function (event) {

        event.preventDefault();

        var title = $("#title").val();
        var address = $("#address").val();
        var zip = parseInt($("#zip").val());
        var contact = $("#email").val();
        var desc = $("#description").val();
        var date = $("#datepicker").val();

        if (!title || !address || !zip || !contact || !desc || !date) {
            window.alert("Please complete each data field.");
            return false;
        }

        if ($("#sportRadio").prop('checked')) {
            firebase.database().ref('events/sports/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date
            });
            window.alert("Event submitted!");
        } else if ($("#gameRadio").prop("checked")) {
            firebase.database().ref('events/gaming/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date
            });
            window.alert("Event submitted!");
        }
    });

    // BELOW CODE IS FOR TESTING................
    // var submit = $("#submitCreateDiv");

    // submit.on("click", function (event) {

    //     event.preventDefault();


    //     if ($("#gameRadio").prop('checked') && $("#image").val() == 0) {
    //         var image = "https://i.amz.mshcdn.com/VN4DYfj6y_-7pAft3TwiTbipdFg=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F664750%2F8fcbb4ea-e47d-453b-9eda-46d8c333ae80.jpg";
    //     }
    //     else if ($("#sportRadio").prop('checked') && $("#image").val() == 0) {
    //         var image = "https://www.michaelgleibermd.com/news/wp-content/uploads/2015/01/year-round-sports.jpg";
    //     } else {
    //         var image = $("#image").val();
    //     }

    //     var newGame = {
    //         zip: parseInt($("#zip").val()),
    //         image: image,
    //         title: $("#title").val(),
    //         address: $("#address").val(),
    //         desc: $("#description").val(),
    //         dateTime: $("#datepicker").val(),
    //         contactInfo: $("#email").val(),
    //     };

    //     if ($("#sportRadio").prop('checked')) {

    //         $.post("/data/goSports", newGame);

    //     } else if ($("#gameRadio").prop("checked")) {

    //         $.post("/data/goGames", newGame);
    //     }
    // });


    // //...............END OF ABOVE TEST

    // $("#submitBtnFind").on("click", function () {

    //     var cards = $("#results");

    //     if (sports = true) {

    //         // /data/goGames is a TEST.  will need to CHANGE TO FIREBASE GET
    //         $.get("/data/goGames", function (data) {
    //             for (var i = 0; i < data.length; i++) {
    //                 cards.append(createCard(data[i]));
    //             }

    //             function createCard(card) {

    //                 var cardContent = `
    //             <div class="col m4">
    //                 <div class="card medium">
    //                     <div class="card-image">
    //                         <img src="${card.image}">
    //                         <span class="card-title">${card.title}</span>
    //                     </div>
    //                     <div class="card-content">
    //                       <p>${card.address}</p>
    //                       <p>${card.description}</p>
    //                       <p>${card.dateTime}</p>
    //                       <p>${card.contactInfo}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             `
    //                 console.log(cardContent);

    //                 // return newCard.append(cardContent);
    //                 return cardContent;
    //             }
    //         });
    //     }

    //     if (games = true) {

    //         // /data/goSports is a TEST.  will need to CHANGE TO FIREBASE GET

    //         $.get("/data/goSports", function (data) {
    //             for (var i = 0; i < data.length; i++) {
    //                 cards.append(createCard(data[i]));
    //             }

    //             function createCard(card) {

    //                 var cardContent = `
    //             <div class="col m4">
    //                 <div class="card medium">
    //                     <div class="card-image">
    //                         <img src="${card.image}">
    //                         <span class="card-title">${card.title}</span>
    //                     </div>
    //                     <div class="card-content">
    //                       <p>${card.address}</p>
    //                       <p>${card.description}</p>
    //                       <p>${card.dateTime}</p>
    //                       <p>${card.contactInfo}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             `
    //                 console.log(cardContent);

    //                 // return newCard.append(cardContent);
    //                 return cardContent;
    //             }
    //         });
    //     }
    // });

    // This is the code for querying the zip codes to return actual coherent data
    var findSubmit = $("#submitBtnFind");
    var sportsBoo = false;
    var gameBoo = false;
    var results = [];
    var result;
    $("#sportsBtn").on("click", function (event) {
        event.preventDefault();
        sportsBoo = !sportsBoo;
        if (sportsBoo && gameBoo) {
            gameBoo = !gameBoo;
        }
    });
    $("#gamingBtn").on("click", function (event) {
        event.preventDefault();
        gameBoo = !gameBoo;
        if (gameBoo && sportsBoo) {
            sportsBoo = !sportsBoo;
        }
    });
    findSubmit.on("click", function (event) {
        var zipCode = $("#zipCode").val();
        var upZip = '' + parseInt(parseInt(zipCode) + 5);
        var botZip = '' + parseInt(parseInt(zipCode) - 5);
        if (sportsBoo) {
            firebase.database().ref('events/sports').on('value', function (snap) {
                results.push(snap.val());
            });
        } else if (gameBoo) {
            firebase.database().ref('events/gaming').on('value', function (snap) {
                results.push(snap.val());
            });
        }
        setTimeout(function () {
            for (var i in results[0]) {
                if (parseInt(i) > upZip || parseInt(i) < botZip) {
                    delete results[0][i];
                }
                console.log('for in ran');
            }
            result = results[0];
            console.log(result);
            var resultAdd, resultTitle, resultContact, resultDateTime, resultDate, resultTime, resultDesc;
            var today = new Date();
            for (var i in result) {
                for (var j in result[i]) {
                    resultAdd = result[i][j].address;
                    resultTitle = j;
                    resultContact = result[i][j].contactInfo;
                    resultDateTime = new Date(result[i][j].dateTime);
                    resultDate = dateFormat(resultDateTime, "dddd, mmmm dS, yyyy");
                    resultTime = dateFormat(resultDateTime, "h:MM TT");
                    resultDesc = result[i][j].description;
                    console.log(resultTitle, resultAdd, resultContact, resultDate, resultTime, resultDesc);
                    if (today > resultDateTime) {
                        delete result[i][j];
                        if (jQuery.isEmptyObject(result[i])) {
                            delete result[i];
                        }
                        console.log(result);
                    }
                }
            }
        }, 1000);
    });
}); //end document.ready