// полиморфный код- переиспользование кода (функция, классы)
// инкапсуляция - код не должен выполнять то, что от него не требуется
// sum (a,b){
// console.log(a+b) -плохо
// return a+b;
// }
function createCard(pet, tag = box) {
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
    const cardInfo = document.createElement('div');


    const cardDel = document.createElement('i');
    cardDel.className = "del fa-solid fa-trash trash";
    cardDel.addEventListener('click', e => {
        e.stopPropagation();
        deleteCard(pet.id, card);
    })

    const cardFile = document.createElement("i");
    cardFile.className = "file fa-solid fa-file ";
    cardFile.dataset.id = pet.id;
    cardFile.addEventListener("click", e => {
        if (e.target.classList.contains('file')) {
            modalCat.classList.toggle('activs');
            const petId = e.target.dataset.id;
            loadDataForCard(petId, path + '/show/' + petId);
        }
    })

    const cardPen = document.createElement("i");
    cardPen.className = "pen fa-solid fa-pen";
    cardPen.addEventListener("click", e => {

        cardPen.dataset.id = pet.id;
    })

    card.append(cardImg, cardTitle, cardLike, cardInfo, cardDel, cardFile, cardPen);

    tag.append(card);
}


function setLike(el, id, like) {
    el.classList.toggle('fa-solid');
    el.classList.toggle('fa-regular');

    fetch(path + "/update/" + id, {
        method: "put",
        // без headers на сервер придет undefined
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ favorite: like })
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

function deleteCard(id, el) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "delete"
        })

            .then(res => {
                if (res.status === 200) {
                    el.remove();
                    pets = pets.filter(pet => pet.id !== id)
                    localStorage.setItem('band-cats', JSON.stringify(pets));
                }
            })
            .catch(error => console.log(error));
    }
}

// function loadDataForCard(id, el) {
//     console.log(id);
  
//     fetch(path + `/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(el),
//     }).then((res) => {
//       if (res.status == 200) {
//         location.reload();
//       }
//     });
//   }

