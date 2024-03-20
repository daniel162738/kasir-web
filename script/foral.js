var newItemAddBtn = document.querySelector('.addItemBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    form = document.querySelector('form'),

    fNama = document.getElementById("fNama"),
    fModal = document.getElementById("fModal"),
    fQty = document.getElementById("fQty"),
    fKode = document.getElementById("fKode"),
    fHarga = document.getElementById("fHarga"),
    fWaktu = document.getElementById("fWaktu"),

    entries = document.querySelector(".showEntries"),
    tabSize = document.getElementById("table_size"),
    userInfo = document.querySelector(".userInfo")


let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]
    
let isEdit = false, editId


var arrayLength = 0
var tableSize = 10
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0

showInfo()


newItemAddBtn.addEventListener('click', ()=> {
    submitBtn.innerHTML = "submit"
    modalTitle.innerHTML = "Tambahkan barang masuk"
    popupFooter.style.display = "block"




    darkBg.classList.add('active')
    popupForm.classList.add('active')

})


crossBtn.addEventListener('click', ()=> {
    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()
})



function preLoadCalculations(){
    array = getData
    arrayLength = array.length
    maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
}


function displayIndexBtn(){
    preLoadCalculations()

    const pagination = document.querySelector('.pagination')

    pagination.innerHTML = ""

    pagination.innerHTML = '<button onclick="prev()" class="prev"> < </button>'

    for(let i=1; i<=maxIndex; i++){
        pagination.innerHTML += '<button onclick=paginationBtn('+i+') index="'+i+'">'+i+'</button>'
    }

    pagination.innerHTML += '<button onclick="next()" class="next"> > </button>'

    highlightIndexBtn()
}


function highlightIndexBtn(){
    startIndex = ((currentIndex - 1) * tableSize) + 1
    endIndex = (startIndex + tableSize) - 1

    if(endIndex > arrayLength){
        endIndex = arrayLength
    }

    if(maxIndex >= 2){
        var nextBtn = document.querySelector(".next")
        nextBtn.classList.add("act")
    }

    entries.textContent = `${startIndex} - ${endIndex} (Total ${arrayLength} barang)`

    var paginationBtns = document.querySelectorAll('.pagination button')

    paginationBtns.forEach(btn => {
        btn.classList.remove('active')
        if(btn.getAttribute('index') === currentIndex.toString()){
            btn.classList.add('active')
        }
    })



    showInfo()

}






function showInfo(){
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    var tab_start = startIndex - 1
    var tab_end = endIndex

    if(getData.length > 0){
        for(var i=tab_start; i<tab_end; i++){
            var staff = getData[i]


            if(staff){
                let createElement = `<tr class="employeeDetails">
                <td>${i+1}</td>
                <td>${staff.fNamaVal}</td>
                <td>${staff.fModalVal}</td>
                <td>${staff.fQtyVal}</td>
                <td>${staff.fKodeVal}</td>
                <td>${staff.fHargaVal}</td>
                <td>${staff.fWaktuVal}</td>
                <td>
                    <button onclick="readInfo('${staff.fNamaVal}', '${staff.fModalVal}', '${staff.fQtyVal}',
                    '${staff.fKodeVal}', '${staff.fHargaVal}', '${staff.fWaktuVal}')"
                    ><i class="fa-regular fa-eye"></i></button>
                    
                    <button "editInfo('${i}', '${staff.fNamaVal}', '${staff.fModalVal}', '${staff.fQtyVal}',
                    '${staff.fKodeVal}', '${staff.fHargaVal}', '${staff.fWaktuVal}')"
                    ><i class="fa-regular fa-pen-to-square"></i></button>

                    <button onclick="deleteInfo(${i})"
                    ><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`

            userInfo.innerHTML += createElement
            }
        }
    }

    else{
        userInfo.innerHTML = `<tr class="employeeDetails">
        <td class="empty" colspan="11" align="center">.</td></tr>`
    }
}


showInfo()



form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        id: Date.now(),
        fNamaVal: fNama.value,
        fModalVal: fModal.value,
        fQtyVal: fQty.value,
        fKodeVal: fKode.value,
        fHargaVal: fHarga.value,
        fWaktuVal: fWaktu.value
    }

    if(!isEdit){
        originalData.unshift(information)
    }
    else{
        originalData[editId] = information
    }
    getData = [...originalData]
    localStorage.setItem('userProfile', JSON.stringify(originalData))

    submitBtn.innerHTML = "submit"
    modalTitle.innerHTML = "Tambahkan barang masuk"

    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()

    highlightIndexBtn()
    displayIndexBtn()
    showInfo()

    var nextBtn = document.querySelector(".next")
    var prevBtn = document.querySelector(".prev")
    if(Math.floor(maxIndex) > currentIndex){
        nextBtn.classList.add("act")
    }
    else{
        nextBtn.classList.remove("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }
})




function next(){
    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    if(currentIndex <= maxIndex - 1){
        currentIndex++
        prevBtn.classList.add("act")

        highlightIndexBtn()
    }

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove("act")
    }
}

function prev(){
    var prevBtn = document.querySelector('.prev')

    if(currentIndex > 1){
        currentIndex--
        prevBtn.classList.add("act")
        highlightIndexBtn()
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}




function paginationBtn(i){
    currentIndex = i

    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    highlightIndexBtn()

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove('acts')
    }
    else{
        nextBtn.classList.add("act")
    }

    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}




tabSize.addEventListener('change', ()=> {
    var selectedValue = parseInt(tabSize.value)
    tableSize = selectedValue
    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})




displayIndexBtn()


















window.onload = () => {
    let header = document.querySelector('header');
    header.classList.add('sticky');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');



