// Data all item
const allObj = () => {
    return [
        {
            id: "c-001",
            category: 0,
            name: "Espresso",
            price: 10000,
            image: "espresso.jpg"
        },
        {
            id: "c-002",
            category: 0,
            name: "Coffee Latte",
            price: 15000,
            image: "latte.jpg"
        },
        {
            id: "c-003",
            category: 0,
            name: "Cappucino",
            price: 5000,
            image: "Cappuccino.jpg"
        },
        {
            id: "c-004",
            category: 0,
            name: "Red Velvet Latte",
            price: 33000,
            image: "velvet.jpeg"
        },
        {
            id: "f-001",
            category: 0,
            name: "Choco Rhum",
            price: 28000,
            image: "choco_rhum.jpg"
        },
        {
            id: "f-002",
            category: 0,
            name: "Black Forest",
            price: 30000,
            image: "black_forest.jpg"
        },
        {
            id: "f-003",
            category: 0,
            name: "Chicken Katsu Dabu-dabu",
            price: 60000,
            image: "chicken_katsu.jpg"
        },
        {
            id: "f-004",
            category: 0,
            name: "Salmon Truffle Teriyaki",
            price: 60000,
            image: "truffle.jpg"
        },
        {
            id: "f-005",
            category: 0,
            name: "Wiener Schnitzel",
            price: 69000,
            image: "wiener.jpg"
        }
    ]
}

// Make number to rupiah
const rupiahisasi = (number) => {
    return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(",00", ",-").replace("Rp", "Rp.")
}

// Sidebar Toggler
const toggleSidebar = () => {
    if ($("#sideBar").hasClass("col-0-5")) {
        $("#sideBar").removeClass("col-0-5")
        $("#sideBar").addClass("col-lg-2 col-md-3 col-4")
        $(".textSidebar").addClass("show")
        $(".textSidebar").removeClass("hide")
        $("#iconSideBar").html(`<i class="lni lni-close"></i>`)
        vueInitSidebar.expand = true
    } else {
        $("#sideBar").removeClass("col-lg-2 col-md-3 col-4")
        $("#sideBar").addClass("col-0-5")
        $(".textSidebar").removeClass("show")
        $(".textSidebar").addClass("hide")
        $("#iconSideBar").html(`<i class="lni lni-menu"></i>`)
        vueInitSidebar.expand = false
    }
}

// Cart Toggler
const toggleCart = (id) => {
    const index = vueInitCart.dataCart.filter(el => el.indexOf(id) > -1)
    const indexOfDelete = vueInitCart.dataCart.indexOf(id)
    $(`#card-${id}`).toggleClass("selected")
    if (index <= 1) {
        vueInitCart.dataCart.push(id)
    } else {
        vueInitCart.dataCart.splice(indexOfDelete, 1);
    }
    changePrice(id)
}

// Event for changing price
const changePrice = (id) => {
    $(document).ready(() => {
        const amount = Number($(`#amount-${id}`).val())
        const itemPrice = allObj().filter(el => el.id.indexOf(id) > -1)[0].price
        const find = vueInitCart.priceOnCart.findIndex((o) => o.id == id)
        if (find !== -1) {
            vueInitCart.priceOnCart.splice(find, 1)
        }
        if (amount > 0) {
            vueInitCart.priceOnCart.push({ id: id, amount: amount, totalPrice: (amount * itemPrice) })
        }
        $(`#price-${id}`).html(rupiahisasi(amount * itemPrice))
        $(`#priceModal-${id}`).html(rupiahisasi(amount * itemPrice))
    })
}

// Increment amount of item
const increment = (id) => {
    let valOfAmount = $(`#amount-${id}`).val()
    const limit = 100
    if (Number(valOfAmount) < limit) {
        $(`#amount-${id}`).val(Number(valOfAmount) + 1)
        $(`#amountModal-${id}`).val(Number(valOfAmount) + 1)
    }
    return changePrice(id)
}

// Decrement amount of item
const decrement = (id) => {
    let valOfAmount = $(`#amount-${id}`).val()
    const limit = 1
    if (Number(valOfAmount) > limit) {
        $(`#amount-${id}`).val(Number(valOfAmount) - 1)
        $(`#amountModal-${id}`).val(Number(valOfAmount) - 1)
    }
    return changePrice(id)
}

// Function Cancel order(s)
const cancel = () => {
    // SweetAlert2
    Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to delete item(s) on cart?`,
        showCancelButton: true,
        icon: 'question',
        confirmButtonText: `Sure!`,
        denyButtonText: `Cancel Deletion!`,
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        }
    })
}

// Transit between two initialization vue data
const getCartData = () => {
    return vueInitCart.dataCart
}

// Vue initialisation of cart element
const vueInitCart = new Vue({
    el: "#cart",
    data: {
        hello: "Hello Worlds",
        allFromObj: allObj(),
        dataCart: [],
        priceOnCart: [],
        rupiahisasi: rupiahisasi,
        cancel: cancel,
    },
    methods: {
        price: (arrLoop) => {
            return arrLoop.reduce((a, b) => { return a + b.totalPrice }, 0)
        }
    },
})

// Vue initialisation of sidebar element
const vueInitSidebar = new Vue({
    el: "#sideBar",
    data: {
        cart: getCartData(),
        expand: false
    }
})

// Vue initialization of content (menu) element
const vueInitContent = new Vue({
    el: "#content",
    data: {
        object: allObj(),
        rupiahisasi: rupiahisasi,
        dataCart: getCartData(),
        toggleCart: toggleCart
    }
})

// Transit between two initialization vue data
const getPriceOnCart = () => {
    return vueInitCart.priceOnCart
}

// Vue initialization of checkout element 
const vueInitCheckOut = new Vue({
    el: "#checkOut",
    data: {
        dataCart: vueInitCart.dataCart,
        allFromObj: allObj(),
        cart: getPriceOnCart(),
        rupiahisasi: rupiahisasi
    }, methods: {
        sumPrice: (arr) => {
            return (arr.reduce((a, b) => { return a + b.totalPrice }, 0))
        },
        ppnCheck: (totalPrice) => {
            return (totalPrice / (10))
        }
    }
})

// Badge counter element length
const vueInitBadgeCart = new Vue({
    el: "#badgeCart",
    data: {
        dataCart: getCartData()
    }
})

// Function for preventing redirect if cart is'nt empty
const preventRedirect = (url) => {
    if (getCartData().length > 0) {
        Swal.fire({
            title: `Your cart is'nt empty!`,
            text: `Are you sure you want to delete item(s) on cart and continue on that page?`,
            showCancelButton: true,
            icon: "question",
            confirmButtonText: `Force Redirect!`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `${url}`;
            }
        })
    } else {
        window.location.href = `${url}`;
    }
}
