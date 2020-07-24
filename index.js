class ApiService{
    librosURL = 'http://localhost:3000/api/libros';
    clientesURL = 'http://localhost:3000/api/clientes';

    async getAll(){
        const response = await fetch(this.librosURL);
        return response.json();
    }

    async createCliente(pNewCliente){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(pNewCliente) 
        }
        const response = await fetch(this.clientesURL, requestOptions);
        this.respuestaRegisto = response.json();
        alert(this.respuestaRegisto);
        return response.json();
    }

    async login(pCliente){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(pCliente) 
        }
        const response = await fetch(this.clientesURL+'/login', requestOptions);
        this.token = response.json();
        alert(this.token);
        return response.json();
    }

    async create(pNewLibro){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(pNewLibro) 
        }
        const response = await fetch(`${this.librosURL}`, requestOptions);
        return response.json();
    }

    async edit(pEditLibro){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(pEditLibro) 
        }
        const response = await fetch(`${this.librosURL}/${pEditLibro.idLibro}`, requestOptions);
        return response.json();
    }

    async delete(pIdLibro){
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`${this.librosURL}/${pIdLibro}`, requestOptions);
        return response.json()
    }
}

const app = new Vue({
    el: '#app',
    data: {
        libros: [],
        masStock: {},
        cart: [],
        cartId: [],
        cartTitulo: [],
        newLibro: {},
        editLibro: {},
        apiService: null,
        cliente:{},
        respuestaRegisto: null,
        newCliente: {},
        token: {},
    },
    async created(){
       this.apiService = new ApiService(); 
       this.libros = await this.apiService.getAll();
    },
    methods: {
        addToCart(idLibro){
            this.cart.push(this.libros[idLibro-1].precio);
            this.cartId.push(this.libros[idLibro-1].idLibro);
            this.cartTitulo.push(this.libros[idLibro-1].titulo);
            console.log(this.cart);
            console.log(this.cartId);
        },
        monto(){
            let suma = 0;
            for(let i = 0; i<this.cart.length; i++){
               suma += this.cart[i];
            }
            return suma;
        },
        lista(){
            document.querySelector("lista").innerHTML = JSON.stringify(this.cartTitulo);
        },
        onClickCreateLibro: async function () {
            await this.apiService.create(this.newLibro);
            this.libros = await this.apiService.getAll();
            this.newLibro = {};
        },
        onClickEdit: async function(){
            await this.apiService.edit(this.editLibro);
            this.libros = await this.apiService.getAll();
            this.editLibro = {};
        },
        onClickEliminar: async function (pIdLibro){
            await this.apiService.delete(pIdLibro);
            this.libros = await this.apiService.getAll();
        },
        onClickCreateNewCliente: async function (newCliente) {
            await this.apiService.createCliente(newCliente)
            this.newCliente = {};
        }, 
        onClickLogin: async function(cliente){
            await this.apiService.login(cliente)   
            this.client = {};     
        },      
    }
          

});