'use strict'
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)


// function get total

function getTotal(){ 
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040"
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}


// function create product
// save localstorage
let dataPro;
if(localStorage.product != null){
dataPro = JSON.parse(localStorage.product)
}else{
dataPro = [];
}



// create object to enter the inputs data in
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100 ){
    if (mood === 'create'){
    if(newPro.count > 1){
        for(let i = 0; i < newPro.count ; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'
    }
        clearData();
}
    localStorage.setItem('product' , JSON.stringify(dataPro))

    showData();
}

// clear inputs after i create new product


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.value = '';
    count.value = '';
    category.value = '';
}

// read the products that u created

    function showData()
    {
        getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length ; i++){
    table += `
<tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id ="update" >update </button></td>
    <td><button onclick="deleteData(${i})" id ="delete" >delete </button></td>
</tr>
    `
    }


document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteAll')
if(dataPro.length > 0){
btnDelete.innerHTML = `
<button onclick="deleteAll()" id ="delete" >Delete All  (${dataPro.length})</button>
`
}else{
    btnDelete.innerHTML = '';
}
}
showData();



// delete [delete only one product]
// i have to pass the product that i need to delete



function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0);
    showData();
}
// now it's time to make delete all button

// count -- make many products 









// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;

    count.style.display = 'none';
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior: 'smooth'
    })


getTotal();
}







// count " make many product from one click"
// seacrh

let seacrhMood = 'title';
let seacrh = document.getElementById('search');

function getSearchMood(id){
if(id == 'searchTitle'){
    seacrhMood = 'title';
    seacrh.placeholder = ' Search By Title'

}else {
    seacrhMood = 'category'
    seacrh.placeholder = ' Search By Category'

}
// seacrh.placeholder = 'Search By '+ searchMood;
seacrh.focus()
seacrh.value = '';
showData();
}









function searchData(value){
    let table = '';
    if (seacrhMood == 'title')
    {
        for(let i = 0; i < dataPro.length; i++)
        {
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
<tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id ="update" >update </button></td>
    <td><button onclick="deleteData(${i})" id ="delete" >delete </button></td>
</tr>
    `
    }
}
}



    else{
                for(let i = 0; i < dataPro.length; i++)
        {
            if (dataPro[i].category.includes(value.toLowerCase())){
                table += `
<tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id ="update" >update </button></td>
    <td><button onclick="deleteData(${i})" id ="delete" >delete </button></td>
</tr>
    `
    }
}
    }




document.getElementById('tbody').innerHTML = table;

        }



// i can make just one loop btw to make my code clean and  small


// clean data

