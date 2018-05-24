new Vue({
    methods:{
        loadData:function(){
            let _this =this;
            this.$axios.get("http://localhost:8080/static/shop.json",{})
            .then(function(response){
                let lists = response.data.data.list;
                console.log(response.data.data.list);
                this.data = response.data.concat(this.data)
            })
        }
    }
})