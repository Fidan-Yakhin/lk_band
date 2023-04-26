// ajax -Async JavaScript and XML
// Xhr fetch =>axios (надо подключать дополнительно)
if (!pets) {
    fetch(path + "/show")
        .then(function (res) {
            // console.log(res)
            // Если сервер вернул успешный ответ, попросить отдать данные
            // .text() => string Строка
            //. blod()
            // .json()
            return res.json();
        })
        .then(function (data) {
            if (data.length) {
                pets = data;
                localStorage.setItem('band-cats', JSON.stringify(data));
                for (let pet of data) {
                    createCard(pet, block);
                }
            }
        })
}

addBtn.addEventListener("click", e => {
    mdBox.classList.toggle("active");
})
mdClose.addEventListener("click", e => {
    mdBox.classList.remove("active");
});
mdBox.addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove("active");
    }
});




addForm.elements.favorite.addEventListener('change', e => {
    console.log(e.currentTarget.value);
    console.log(e.currentTarget.checked);
})

// addForm.elements.image.addEventListener("change", e => {
//     const prevTag = addForm.querySelector(".preview");
//     prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
// })
addForm.elements.image.addEventListener("change", e => {
    prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
})

addForm.addEventListener('submit', e => {
    e.stopPropagation();
    e.preventDefault();
    console.log(addForm);
    console.log(e.currentTarget);
    console.log(addForm.children); // обращение ко всем дочерним тегам (прямые потомки)
    console.log(addForm.elements); // элемены формы (input / button / select / textarea)
    const body = {}
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        // console.log(el.name, el.value);
        if (el.name) {
            // body[el.name] = el.value;
            if (el.name === "favorite") {
                body[el.name] = el.checked;
            } else {
                body[el.name] = el.value;
            }
        }
    }
    // console.log(body);
    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => {
            console.log(ids);
            body.id = ids[ids.length - 1] + 1;
            console.log(body);
            return fetch(path + "/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })
        .then(res => {
            if (res.status === 200) {
                addForm.reset();
                prevTag.style = null;
                mdBox.classList.remove('active');
                createCard(body, block);
                pets.push(body);
                localStorage.setItem('band-cats', JSON.stringify(pets));
            }
        })
    // .then(res => {
    //     console.log(res.status);
    //     return res.json();
})
// .then(data => {
//     console.log(data);
// })
// })






// block.addEventListener('click', e => {
//     if (e.target.classList.contains('file')) {
//         modalCat.classList.toggle('activs');
//         const petId = e.target.dataset.id;
//         loadDataForCard(petId, path + '/show/' + petId);
//     }
// });

// dc_close.addEventListener('click', e => {
//     descript.classList.remove('activs');
// });






