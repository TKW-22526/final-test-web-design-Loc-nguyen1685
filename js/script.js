let products = [
    {
        name:"Pikachu EX",
        price:650000,
        image:"../assets/img/pikachuex.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Pikachu"
    },
    {
        name:"Charizard VMAX",
        price:1500000,
        image:"../assets/img/charizardVmax.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Charizard"
    },
    {
        name:"Mewtwo GX",
        price:900000,
        image:"../assets/img/mew2gx.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Mewtwo"
    },
    {
        name:"Lucario V",
        price:420000,
        image:"../assets/img/lucari.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Lucario"
    },
    {
        name:"Rayquaza VMAX",
        price:1200000,
        image:"../assets/img/rồngvmax.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Rayquaza"
    },
    {
        name:"Gengar VMAX",
        price:1100000,
        image:"../assets/img/gen.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Gengar"
    },
    {
        name:"Umbreon V",
        price:750000,
        image:"../assets/img/um.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Umbreon"
    },
    {
        name:"Dragonite V",
        price:680000,
        image:"../assets/img/dragonite V.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Dragonite"
    },
    {
        name:"Eevee GX",
        price:390000,
        image:"../assets/img/Eevee GX.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Eevee"
    },
    {
        name:"Snorlax V",
        price:520000,
        image:"../assets/img/Snorlax V.jpg",
        type:"card",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Snorlax"
    },
    {
        name:"Card Sleeve",
        price:80000,
        image:"../assets/img/sleeve.jpg",
        type:"accessory",
        link:"https://www.tcgplayer.com/search/all/product?q=card%20sleeve"
    },
    {
        name:"Binder",
        price:350000,
        image:"../assets/img/binder.jpg",
        type:"accessory",
        link:"https://www.tcgplayer.com/search/all/product?q=card%20binder"
    },
    {
        name:"Deck Box",
        price:150000,
        image:"../assets/img/deck_.jpg",
        type:"accessory",
        link:"https://www.tcgplayer.com/search/all/product?q=deck%20box"
    },
    {
        name:"Playmat",
        price:250000,
        image:"../assets/img/images.jpg",
        type:"accessory",
        link:"https://www.tcgplayer.com/search/all/product?q=pokemon%20playmat"
    }
];

let cart = [];

function renderProducts(){
    const cardList = document.getElementById("cardList");
    const accessoryList = document.getElementById("accessoryList");

    if(!cardList || !accessoryList) return;

    cardList.innerHTML = "";
    accessoryList.innerHTML = "";

    products.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "product";

        item.innerHTML = `
            <img src="../img/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
            <button onclick="addToCart(${index})">Thêm vào giỏ hàng</button>
            <a href="${product.link}" target="_blank">Chi tiết sản phẩm</a>
            <button class="delete-btn" onclick="deleteProduct(${index})">Xóa sản phẩm</button>
        `;

        if(product.type === "card"){
            cardList.appendChild(item);
        }else{
            accessoryList.appendChild(item);
        }
    });
}

function addProduct(){
    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value;
    const type = document.getElementById("productType").value;

    if(name === "" || price <= 0 || image === ""){
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }

    const newProduct = {
        name:name,
        price:price,
        image:image,
        type:type,
        link:"https://www.tcgplayer.com/search/all/product?q=" + encodeURIComponent(name)
    };

    products.push(newProduct);

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";

    renderProducts();

    alert("Đã thêm sản phẩm mới!");
}

function deleteProduct(index){
    const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không?");

    if(confirmDelete){
        products.splice(index, 1);
        renderProducts();
    }
}

function addToCart(index){
    cart.push(products[index]);
    renderCart();
    alert("Đã thêm " + products[index].name + " vào giỏ hàng!");
}

function renderCart(){
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");

    if(!cartList || !totalPrice) return;

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price.toLocaleString("vi-VN")}đ
            <button class="delete-btn" onclick="removeCartItem(${index})">Xóa</button>
        `;

        cartList.appendChild(li);
    });

    totalPrice.textContent = "Tổng tiền: " + total.toLocaleString("vi-VN") + "đ";
}

function removeCartItem(index){
    cart.splice(index, 1);
    renderCart();
}

function clearCart(){
    cart = [];
    renderCart();
    alert("Đã xóa toàn bộ giỏ hàng!");
}

renderProducts();
renderCart();