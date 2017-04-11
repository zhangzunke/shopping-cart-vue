var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct:{}
    },
    filters: {
        formatMoney: function (value) {
            return "$ " + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            let _this = this;
            this.$http.get("/static/data/cartData.json").then(res => {
                this.productList = res.data.result.list;
                //this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuentity++;
            } else {
                if (product.productQuentity < 2) {
                    product.productQuentity = 1;
                } else {
                    product.productQuentity--;
                }
            }

            this.calcTotalPrice();
        },
        selectedProduct: function (product) {
            if (typeof product.checked == "undefined") {
                //Vue.set(item, "checked", true);
                this.$set(product, "checked", true);
            } else {
                product.checked = !product.checked;
            }

            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == "undefined") {
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked =  _this.checkAllFlag;
                }
            });

            this.calcTotalPrice();
        },
        calcTotalPrice: function(){
            var _this = this;
            var totalPrice = 0;
            this.productList.forEach(function (item, index) {
                if(item.checked){
                   totalPrice += item.productPrice * item.productQuentity;
                }
            });
            _this.totalMoney = totalPrice;
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function(){
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});

Vue.filter("money", function (value, type) {
    return "$ " + value.toFixed(2) + " " + type;
});