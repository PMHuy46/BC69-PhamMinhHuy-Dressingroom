
let arrItem = [
    {
        idelement: "bikinitop",
        type: "topclothes"
    },
    {
        idelement: "bikinibottom",
        type: "botclothes"
    },
    {
        idelement: "feet",
        type: "shoes"
    },
    {
        idelement: "handbag",
        type: "handbags"
    },
    {
        idelement: "necklace",
        type: "necklaces"
    },
    {
        idelement: "hairstyle",
        type: "hairstyle"
    },
    {
        idelement: "background",
        type: "background"
    }




]

async function fetchData() {
    try {
        const response = await fetch('../data/Data.json');
        const data = await response.json();
        return data.tabPanes;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function useFetchData() {
    try {
        const data = await fetchData();
        let arr = filToWork(data)
        render(arr)
    } catch (error) {
        console.error(error);
    }
}

useFetchData()

const filToWork = (arr1 = [], ob = arrItem[0]) => {
    const arrFilter = arr1.filter(item => item.type == ob.type)
    return [arrFilter, ob.idelement]
}

// render
const render = (arr) => {
    let content = `<div class="row ">`
    for (item of arr[0]) {
        let { name, imgSrc_jpg, imgSrc_png } = item
        content += `
            <div class="col-3">
              <img src="${imgSrc_jpg}" alt="">
              <p>${name}</p>
              <button onclick="tryClo('${arr[1]}','${imgSrc_png}')">thử đồ</button>
            </div>`
    }
    content += `</div>`
    document.querySelector(`.well`).innerHTML = content
}

//thử đồ
const tryClo = (id, src) => {
    document.querySelector(`.${id}`).innerHTML = `<img src="${src}" alt="">`
}

// thêm click
document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll("#tab_clo li");

    links.forEach(function (option) {
        option.addEventListener("click", function (event) {
            event.preventDefault();
            let current = document.querySelector("#tab_clo .active");
            current.classList.remove("active")
            this.classList.add("active")
            let id = this.id
            const renderClick = async () => {
                try {
                    const data = await fetchData()
                    console.log(id)
                    obtofil = arrItem.find(item => item.idelement == id)
                    console.log(obtofil)
                    let arr = filToWork(data, obtofil)
                    render(arr)
                } catch (error) {

                }
            }
            renderClick()
        })
    })
})



