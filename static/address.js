new Vue({
    el: '.container',
    data:{
       limitNum: 3,
       addressList:[],
       currentIndex: 0,
       shippingMethod: 1
    },
    mounted: function(){
        this.$nextTick(function(){
            this.getAddressList();
        })
    },
    methods:{
        getAddressList: function(){
            var _this = this;
           this.$http.get("/static/data/address.json").then(function(response){
              var res = response.data;
              if(res.status == "0"){
                  _this.addressList = res.result;
              }
           });
        },
        loadMore : function(){
            this.limitNum = this.addressList.length;
        },
        setDefault: function(item){
            this.addressList.forEach(function(address, index){
                if(address.addressId == item.addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            });
        }
    },
    computed:{
        filterAddress: function(){
            return this.addressList.slice(0, this.limitNum);
        }
    }
});