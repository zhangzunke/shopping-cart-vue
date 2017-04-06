var vm = new Vue({
    el: "#app",
    data:{
       totalMoney : 0,
       productList:[]
    },
    filters:{
       formatMoney: function(value){
          return "$ " + value.toFixed(2);
       }
    },
    mounted:function(){
       this.$nextTick(function(){
           this.cartView();
       });       
    },
    methods:{
        cartView: function(){
            let _this = this;
            this.$http.get("/static/data/cartData.json").then(res=>{
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function(product, way){
            if(way > 0){
                product.productQuentity++;
            }else{
                if(product.productQuentity < 2){
                    product.productQuentity = 1;
                }else{
                    product.productQuentity--;
                }
            }
        },
        selectedProduct: function(product){
            if(typeof product.checked == "undefined" ){
                //Vue.set(item, "checked", true);
                this.$set(product, "checked", true);
            }else{
                product.checked = !product.checked;
            }
        }
    }
});

Vue.filter("money", function(value, type){
    return "$ " + value.toFixed(2) +" "+ type;
});