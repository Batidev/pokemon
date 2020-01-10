// pour monter ou descendre les pages
var page = 1
    // variables qui vont permettres de récuperer des valeur sur le serveur API 
var ajout = ""
var inverse = ""


// récupération des données API
var recup = document.getElementById('insert')
recup.addEventListener('click', function() { pokemon() })

function pokemon() {
    var cadabra = document.getElementById("affiche")
    var bradaca = document.getElementById("back")
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                // initialisation des varibles pour qu'elles récuperent les les données de next et de prévious 
                ajout = data.next
                inverse = data.previous
                if (ajout == null) {
                    bradaca.className = 'mask'
                }
                if (inverse == null) {
                    bradaca.className = 'mask'
                }
                document.getElementById('pokemon').innerHTML = ""
                for (let i = 0; i <= 19; i++) {
                    // solution 1 :
                    var tr = document.createElement('tr')
                    var p = document.getElementById('pokemon')
                    p.appendChild(tr)

                    var td1 = document.createElement('td')
                    td1.innerHTML = data.results[i].name
                    tr.appendChild(td1)

                    var td2 = document.createElement('td')
                    td2.innerHTML = "Voir le détail"
                    td2.addEventListener('click', function() { dex(data.results[i].name) })
                    tr.appendChild(td2)

                    // ou solution 2 ci dessous :
                    // document.getElementById('pokemon').innerHTML += '<tr><td>' + data.results[i].name + '</td> <td onclick="dex()" id= "td">' + data.results[i].url + '</td></tr>'
                }
            }
        )
        .catch(
            function(error) {
                alert("Erreur :" + error)
            }
        )
}

// afficher le détail des pokémons dans 2éme section de la page
function dex(name) {
    // variable qui permet d'afficher la section cacher
    var cadabra = document.getElementById("affiche")
    cadabra.className = 'show'
    fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(
            function(response) {
                return response.json()
            })
        // On va créer, ajouter et afficher le détail du pokémon avec les valeurs disponibles ou choisies
        .then(
            function(data) {
                var parent = document.getElementById("pokemondesc")
                parent.innerHTML = " "
                var idt = document.createElement("h3")
                idt.innerHTML = "Id"
                parent.appendChild(idt)
                var id = document.createElement("p")
                id.innerHTML = data.id
                parent.appendChild(id)
                var nomt = document.createElement("h3")
                nomt.innerHTML = "Nom"
                parent.appendChild(nomt)
                var nom = document.createElement("p")
                nom.innerHTML = data.name
                parent.appendChild(nom)
                var hauteurt = document.createElement("h3")
                hauteurt.innerHTML = "Taille"
                parent.appendChild(hauteurt)
                var hauteur = document.createElement("p")
                hauteur.innerHTML = data.height
                parent.appendChild(hauteur)
                var imaget = document.createElement("h3")
                imaget.innerHTML = "Image"
                parent.appendChild(imaget)
                var image = document.createElement("img")
                image.setAttribute("src", data.sprites.front_default)
                parent.appendChild(image)
            })
}

// boutton suivant clickable
var ntop = document.getElementById('next')
ntop.addEventListener('click', function() { affichagePlus() })
    // ajout fonction 20 pokemon suivant
function affichagePlus() {
    var cadabra = document.getElementById("back")
    cadabra.className = 'show'
    var bradaca = document.getElementById("next")
    page++
    fetch(ajout)
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                ajout = data.next
                inverse = data.previous
                if (ajout == null) {
                    bradaca.className = 'mask'
                }
                document.getElementById('pokemon').innerHTML = ""
                for (let i = 0; i < 19; i++) {
                    var tr = document.createElement('tr')
                    var p = document.getElementById('pokemon')
                    p.appendChild(tr)

                    var td1 = document.createElement('td')
                    td1.innerHTML = data.results[i].name
                    tr.appendChild(td1)

                    var td2 = document.createElement('td')
                    td2.innerHTML = "Voir le détail"
                    td2.addEventListener('click', function() { dex(data.results[i].name) })
                    tr.appendChild(td2)
                }
            }
        )
}

// bouton précédent clickable
var nflop = document.getElementById('back')
nflop.addEventListener('click', function() { affichageMoins() })

function affichageMoins() {
    var cadabra = document.getElementById("next")
    cadabra.className = 'show'
    var bradaca = document.getElementById("back")
    page--
    fetch(inverse)
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                inverse = data.previous
                ajout = data.next
                if (inverse == null) {
                    bradaca.className = 'mask'
                }
                document.getElementById('pokemon').innerHTML = ""
                for (let i = 0; i < 19; i++) {
                    var tr = document.createElement('tr')
                    var p = document.getElementById('pokemon')
                    p.appendChild(tr)

                    var td1 = document.createElement('td')
                    td1.innerHTML = data.results[i].name
                    tr.appendChild(td1)

                    var td2 = document.createElement('td')
                    td2.innerHTML = "Voir le détail"
                    td2.addEventListener('click', function() { dex(data.results[i].name) })
                    tr.appendChild(td2)
                }
            }
        )
}