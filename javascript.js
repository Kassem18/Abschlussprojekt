/* welcome popup */
document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("popup");

    setTimeout(function () {
        popup.classList.add("popup-show");
    }, 6000); // Add a delay of seconds (6000 milliseconds)

    var closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", function () {
        popup.classList.remove("popup-show");
    });
});



/* URLS */
function openPage(url) {
    if (url) {
        window.location.href = url;
    }
}



/* namenspeicher page */
$(document).ready(function () {
    $("#myForm").submit(function (event) {
        event.preventDefault();
        var formData = $(this).serialize();

        $.ajax({
            method: "POST",
            url: "submit.php",
            data: formData,
            success: function (response) {
                $("#result").html(response);
                $("#result").show(); // Show the #result element
            },
            error: function () {
                alert("Achtung Achtung!! Fehler beim Senden des Formulars!");
            }
        });
    });
});



/* drag and drop page */
$(document).ready(function () {
    $(".draggable").click(function () {

        $(this).animate({
            borderRadius: "50%",
            rotate: '+=360deg'
        }, 2000);

        $(this).effect("explode", {
            pieces: 500,
            duration: 2000,
            origin: ["center"],
            scale: 1,
        });

        // Additional cool effects
        $(this).fadeOut(500).fadeIn(500);
        $(this).animate({
            opacity: 0.1,
            borderWidth: "10px",
            borderRadius: "50%",
        }, 1000).animate({
            opacity: 1,
            borderWidth: "0px",
            borderRadius: "20%",
        }, 1000);
    });
});


//when you drag and drop
$(function () {
    $(".draggable").draggable({
        drag: function (event, ui) {
            var draggable = $(this);
            draggable.animate({
                top: "9rem",
                left: "20rem"
            }, 1000, function () {
                draggable.fadeOut(300);
            });
            var text = draggable.text();
            draggable.fadeOut(500, function () {
                draggable.remove();
                $("<div>")
                    .text(text)
                    .appendTo(".droppable");
            });
        },
    });

    $(".droppable").droppable({
        drop: function (event, ui) {
            var draggable = $(ui.draggable);
            draggable.addClass("dropped");
        },
    });

    $("#deleteButton").click(function () {
        var rowNumber = parseInt($("#rowNumber").val());
        if (!isNaN(rowNumber)) {
            $(".droppable div").eq(rowNumber - 1).remove();
        }
    });
});







/* heutschenspiel page */

/* tooltip */
$(document).ready(function () {
    $("<img>").tooltip();

});

/*  Shell Game */

$(document).ready(function () {
    var clickCount = 0;
    var maxClicks = 1; // Set maximum number of clicks to 1
    var goldAppeared = false; // Track if the .gold image has appeared
    var gameWon = false; // Track if the game has been won


    $("#startGame2").click(function () {
        var images = [
            $(".imageVader1"),
            $(".imageVader2"),
            $(".imageVader3")
        ];
        $(".container").empty();
        shuffle(images);
        for (var i = 0; i < images.length; i++) {
            $(".container").append(images[i]);
        }
        $(".gold").remove();

        $(".imageVader1, .imageVader2, .imageVader3").effect("shake", { distance: 10, times: 3 }, 500);
    });

    $(".container").on("click", ".imageVader1, .imageVader2, .imageVader3", function () {
        var $this = $(this);
        $this.fadeTo(1000, 0.1, function () {
            clickCount++;
            if (clickCount >= maxClicks && !goldAppeared) {
                var randomIndex = Math.floor(Math.random() * 3);
                if (randomIndex === 0) {
                    var $selectedImage = $(this);
                    $selectedImage.replaceWith('<img src="./img/gold.png" alt="" class="gold" title="Gold gefunden!">');
                    $(".gold").fadeIn();
                    goldAppeared = true;
                    gameWon = true;
                }
            }

            if (gameWon) {
                alert("Herzlichen Glückwunsch! Du hast das Bitcoin gefunden!");
            } else {
                alert("Du hast verloren! Das Bitcoin wurde nicht gefunden.");
            }
        });
    });

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }
});



/* responsive ui page */

$(function () {
    var crypto = [
        "Bitcoin",
        "Ethereum",
        "Ripple",
        "StormX",
        "Litecoin",
        "Cardano",
        "Polkadot",
        "Stellar",
        "Dogecoin"
    ];

    $("#cryptoSorte").autocomplete({
        source: crypto,
        minLength: 2
    });

    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });

    $("#cryptoSorte").on("autocompleteselect", function (event, ui) {
        var selectedCoin = ui.item.value;
        if (selectedCoin === "Cardano" || selectedCoin === "Polkadot") {
            $("#dialog").dialog("open");
        }
    });
});



/* the Gameover popup */
$(document).ready(function () {
    $(".submit-button").click(function () {
        var $this = $(".ui-widget");
        $this.animate({ opacity: 0.5 }, 500); // First effect: Reduce opacity to 0.5
        $this.fadeOut(1000).delay(3000).fadeIn(0, function () {
            // Third effect: Disappear for 3 seconds and reappear
            var $gameOverImage = $('<img>').attr('src', 'img/deathstar.jpg').css({
                width: '100%',
                height: '100vh',
                opacity: 0.9, // Set initial opacity to 0 (fully transparent)
            });

            $this.empty().append($gameOverImage).fadeIn(1000, function () {
                $gameOverImage.animate({ opacity: 0 }, 1000); // Set the opacity to 1
            });

            var popup = document.getElementById("popup2");

            setTimeout(function () {
                popup.classList.add("popup-show2");
            }, 1000); // Add a delay of 1 seconds (5000 milliseconds) 

        });
    });
});





document.addEventListener("DOMContentLoaded", function () {
    var music = document.getElementById("music");
    music.volume = 0.5; // Adjust the volume if needed
    music.play();
});




$(document).ready(function () {
    // Fetch cryptocurrency data
    function fetchCryptoData() {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/simple/price",
            method: "GET",
            data: {
                ids: "bitcoin,ethereum,ripple,cardano,chainlink,polkadot",  // Specify the cryptocurrency IDs you want to track
                vs_currencies: "eur"  // Specify the currency for conversion
            },
            success: function (response) {
                // Update the ticker with the retrieved data
                $("#ticker").html(
                    `Bitcoin: Euro ${response.bitcoin.eur.toFixed(2)} |
                     Ethereum: Euro ${response.ethereum.eur.toFixed(2)} |
                     Cardano: Euro ${response.cardano.eur.toFixed(2)} |
                     Polkadot: Euro ${response.polkadot.eur.toFixed(2)} |
                     Chainlink: Euro ${response.chainlink.eur.toFixed(2)} |
                     Ripple: Euro ${response.ripple.eur.toFixed(2)}`
                );
            },
            error: function (error) {
                console.log("Error fetching cryptocurrency data:", error);
            }
        });
    }

    // Fetch data initially
    fetchCryptoData();

    // Fetch data every 10 seconds (adjust as needed)
    setInterval(fetchCryptoData, 10000);
});
