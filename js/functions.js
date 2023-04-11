// полиморфный код- переиспользование кода (функция, классы)
// инкапсуляция - код не должен выполнять то, что от него не требуется
// sum (a,b){
    // console.log(a+b) -плохо
// return a+b;
// }
function createCard(pet, tag) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
   

    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add("tmp");
    }
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name;

    const cardLike = document.createElement('i');
    cardLike.className = 'like fa-heart';
    cardLike.classList.add(pet.favorite ? 'fa-solid' : 'fa-regular');
    cardLike.addEventListener("click", e => {
        // поставить лайк (является любимчик или нет)
        setLike(cardLike, pet.id, !pet.favorite);
    })
    card.append(cardImg, cardTitle, cardLike);
    tag.append(card);
    // carding.style.height = cardImg.offsetWindth + 'px';
}

function setLike (el, id, like) {
    el.classList.toggle('fa-solid');
    el.classList.toggle('fa-regular');

    fetch(path + "/update/" + id, {
        method: "put",
        // без headers на сервер придет undefined
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({favorite: like})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        pets = pets.map(p => {
            if (p.id === id) {
                p.favorite = like;
            }
            return p;
        })
        localStorage.setItem("band-cats", JSON.stringify(pets)); 
    })
}
