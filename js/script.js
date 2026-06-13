let products = [
    {
        name:"Pikachu EX",
        price:650000,
        image:"../assets/img/pikachuex.jpg",
        type:"card",
        desc:"Pikachu EX là lá bài Pokémon nổi bật, phù hợp cho người chơi và người sưu tầm.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Pikachu"
    },
    {
        name:"Charizard VMAX",
        price:1500000,
        image:"../assets/img/charizardVmax.jpg",
        type:"card",
        desc:"Charizard VMAX là một trong những card được yêu thích nhất.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Charizard"
    },
    {
        name:"Mewtwo GX",
        price:900000,
        image:"../assets/img/mew2gx.jpg",
        type:"card",
        desc:"Mewtwo GX có thiết kế đẹp, giá trị sưu tầm cao.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Mewtwo"
    },
    {
        name:"Lucario V",
        price:420000,
        image:"../assets/img/lucari.jpg",
        type:"card",
        desc:"Lucario V mạnh mẽ và được nhiều người chơi sử dụng.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Lucario"
    },
    {
        name:"Rayquaza VMAX",
        price:1200000,
        image:"../assets/img/rồngvmax.jpg",
        type:"card",
        desc:"Rayquaza VMAX là card rồng nổi tiếng.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Rayquaza"
    },
    {
        name:"Gengar VMAX",
        price:1100000,
        image:"../assets/img/gen.jpg",
        type:"card",
        desc:"Gengar VMAX thuộc nhóm card được nhiều người yêu thích.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Gengar"
    },
    {
        name:"Umbreon V",
        price:750000,
        image:"../assets/img/um.jpg",
        type:"card",
        desc:"Umbreon V có thiết kế đẹp và giá trị sưu tầm cao.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Umbreon"
    },
    {
        name:"Dragonite V",
        price:680000,
        image:"../assets/img/Dragonite V.jpg",
        type:"card",
        desc:"Dragonite V là Pokémon hệ rồng được yêu thích.",
        link:"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&q=Dragonite"
    },
    {
        name:"Card Sleeve",
        price:80000,
        image:"../assets/img/sleeve.jpg",
        type:"accessory",
        desc:"Sleeve dùng để bảo vệ card khỏi trầy xước.",
        link:"https://www.tcgplayer.com/search/all/product?q=card%20sleeve"
    },
    {
        name:"Binder",
        price:350000,
        image:"../assets/img/binder.jpg",
        type:"accessory",
        desc:"Binder dùng để lưu trữ và bảo quản bộ sưu tập card.",
        link:"https://www.tcgplayer.com/search/all/product?q=card%20binder"
    },
    {
        name:"Deck Box",
        price:150000,
        image:"../assets/img/deck_.jpg",
        type:"accessory",
        desc:"Deck Box dùng để đựng bộ bài Pokémon.",
        link:"https://www.tcgplayer.com/search/all/product?q=deck%20box"
    },
    {
        name:"Playmat",
        price:250000,
        image:"../assets/img/images.jpg",
        type:"accessory",
        desc:"Playmat là thảm chơi dành cho Pokémon TCG.",
        link:"https://www.tcgplayer.com/search/all/product?q=pokemon%20playmat"
    },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(){
    const cardList = document.getElementById("cardList");
    const accessoryList = document.getElementById("accessoryList");
    const searchInput = document.getElementById("searchInput");

    if(!cardList || !accessoryList) return;

    cardList.innerHTML = "";
    accessoryList.innerHTML = "";

    let keyword = "";

    if(searchInput){
        keyword = searchInput.value.toLowerCase();
    }

    products.forEach((product, index) => {
        if(!product.name.toLowerCase().includes(keyword)) return;

        const item = document.createElement("div");
        item.className = "product";

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>

            <button onclick="addToCart(${index})">
                Thêm vào giỏ hàng
            </button>

            <a href="${product.link}" target="_blank">
                Chi tiết sản phẩm
            </a>

            <button class="delete-btn" onclick="deleteProduct(${index})">
                Xóa sản phẩm
            </button>
        `;

        if(product.type === "card"){
            cardList.appendChild(item);
        }else{
            accessoryList.appendChild(item);
        }
    });
}

function addProduct(){
    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value.trim();
    const type = document.getElementById("productType").value;

    if(name === "" || price <= 0 || image === ""){
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }

    const newProduct = {
        name:name,
        price:price,
        image:"../assets/img/" + image,
        type:type,
        desc:"Sản phẩm mới được thêm vào cửa hàng.",
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
    if(confirm("Bạn có chắc muốn xóa sản phẩm này không?")){
        products.splice(index, 1);
        renderProducts();
    }
}

function addToCart(index){
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    alert("Đã thêm vào giỏ hàng!");
}

function renderCart(){
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");

    if(!cartList || !totalPrice) return;

    cartList.innerHTML = "";

    if(cart.length === 0){
        cartList.innerHTML = "<li>Giỏ hàng đang trống.</li>";
        totalPrice.textContent = "Tổng tiền: 0đ";
        return;
    }

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
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function clearCart(){
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    alert("Đã xóa toàn bộ giỏ hàng!");
}

function renderDetail(){
    const detailName = document.getElementById("detailName");

    if(!detailName) return;

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    if(isNaN(id) || !products[id]){
        detailName.textContent = "Không tìm thấy sản phẩm";
        return;
    }

    const product = products[id];

    document.getElementById("detailName").textContent = product.name;
    document.getElementById("detailImage").src = product.image;
    document.getElementById("detailImage").alt = product.name;
    document.getElementById("detailPrice").textContent =
        "Giá: " + product.price.toLocaleString("vi-VN") + "đ";
    document.getElementById("detailDesc").textContent = product.desc;
    document.getElementById("tcgLink").href = product.link;
}

renderProducts();
renderCart();
renderDetail();