// Sidebar toggler
const toggleSidebar = () => {
    if ($("#sideBar").hasClass("col-0-5")) {
        $("#sideBar").removeClass("col-0-5")
        $("#sideBar").addClass("col-lg-2 col-md-2")
        $(".textSidebar").addClass("show")
        $(".textSidebar").removeClass("hide")
        $("#iconSideBar").html(`<i class="lni lni-close"></i>`)

        vueInitSidebar.expand = true
    } else {
        $("#sideBar").removeClass("col-lg-2 col-md-2")
        $("#sideBar").addClass("col-0-5")
        $(".textSidebar").removeClass("show")
        $(".textSidebar").addClass("hide")
        $("#iconSideBar").html(`<i class="lni lni-menu"></i>`)
        vueInitSidebar.expand = false
    }
}

// All data in array of objects
const objOrder = () => {
    return [
        {
            invoice: "#10928",
            cashier: "Cashier 1",
            date: "6 October 2019",
            order: ["Ice Tea", "Salad With Peanut Sauce"],
            amount: 120000,
        },
        {
            invoice: "#10929",
            cashier: "Cashier 1",
            date: "6 October 2019",
            order: ["Chicken Katsu Dabu-dabu", "Salmon Truffle Teriyaki", "Red Velvet Latte"],
            amount: 153000,
        },
    ]
}

// Vue initialization for sidebar element
const vueInitSidebar = new Vue({
    el: "#sideBar",
    data: {
        expand: false,
    }
})

// Vue initialization for content element
const vueInitReportContent = new Vue({
    el: "#reportContent",
    data: {
        orders: objOrder(),
        todayIncome: 1000000,
        order: 3270,
        yearIncome: 100000000000
    },
    methods: {
        // Number to rupiah
        toRupiah: (number) => {
            return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(",00", ",-").replace("Rp", "Rp.")
        },
        // Number separator
        toSeparateNumber: (number) => {
            return number.toLocaleString().replace(",", ".")
        }
    }
})