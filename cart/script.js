  const products = [
        {
          id: 1,
          name: "Hertfoid Upholstered Chair",
          price: 101,
          image: "/cart/1.png",
          slug: "hertfoid-upholstered-chair",
        },
        {
          id: 2,
          name: "Abingdon Upholstered Chair Swivel",
          price: 151,
          image: "/cart/2.png",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 3,
          name: "Jeses Minimore Modern Style Etta",
          price: 181,
          image: "/cart/3.png",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 4,
          name: "JJeses Minimore Modern Style",
          price: 201,
          image: "/cart/4.png",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 5,
          name: "Bolanle Upholstered Armchair",
          price: 251,
          image: "/cart/5.png",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 6,
          name: "Jaqueze Upholstered Armchair",
          price: 111,
          image: "/cart/6.png",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 7,
          name: "Leston Wide Upholstered Fabric",
          price: 121,
          image: "/cart/7.png",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 8,
          name: 'Stephanny 27.5" Wide Tufted',
          price: 220,
          image: "/cart/8.png",
          slug: "stephanny-275-wide-tufted-armchair",
        },
      ];
      let cart =[];
      function searchProducts(){
        let query=document.getElementById("search").value.toLowerCase();

        let filtered=products.filter(product =>{
           return product.name.toLowerCase().includes(query);
        });
     displayProducts(filtered);

      }
        function displayProducts(filtered = products){
            let productDiv = document.getElementById("products");
            productDiv.innerHTML = "";
            filtered.forEach((product) =>{
             let productcontainer=document.createElement("div");
             productcontainer.classList.add("product");
             productcontainer.innerHTML=`<img class="img1" src="${product.image}" alt=""/>
              <p class="p1">${product.name}</p>
               <p class="p2">${product.price}</p>
               <button class="add"onclick="addToCart(${product.id})">Add To Cart</button>`;

            productDiv.appendChild(productcontainer);
            });

        };
        function addToCart(id){
        let selectedProduct=products.find((product)=> product.id ===id);
        let existingItem=cart.find((item)=> item.id ===id);
        if(existingItem){
            existingItem.quantity++;
        }else{
            cart.push({...selectedProduct,quantity:1});
        }
       
        
       
        updateCart();
        };
        function updateCart(){
            let cardDiv=document.getElementById("cart-c");
            cardDiv.innerHTML="";
            let totalAmount=0;
            if(cart.length===0){
                cardDiv.innerHTML="<p>Your Cart is Empty<p>";
                document.getElementById("total").textContent="Total:$0";
                localStorage.removeItem("cart");
                return;
            }
            cart.forEach((item,index)=>{
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-p");

                totalAmount+=item.price * item.quantity;

                cartItem.innerHTML = `
                 <img src="${item.image}" alt="">
                <p>${item.name} - ${item.price}</p>
                <input type="number" min="1" value="${item.quantity}" onchange="quantityUpdate(${index},this.value)" />
                <button onclick="remove(${index})">Remove</button>
                `;
                cardDiv.appendChild(cartItem);

            });
            document.getElementById("total").textContent=`Total:${totalAmount}`;
            localStorage.setItem("cart",JSON.stringify(cart));
        };
        window.addEventListener("DOMContentLoaded",()=>{
            const storedCart=localStorage.getItem("cart");
            if(storedCart){
                cart=JSON.parse(storedCart);
                updateCart();
            }
        })
        function remove(index){
            cart.splice(index, 1);
            updateCart();

        }
        function quantityUpdate(index,quantity){
               cart[index].quantity=Math.max(1, quantity);
               
               updateCart();


        }
        displayProducts();

        function toggleCart(){
          const cart=document.querySelector(".cart");
          const toggleBtn=document.getElementById("toggle");
          

          cart.classList.toggle("open");
        }