var app = new Vue({
  el: "#book",

  data: {
    url: "https://api.npoint.io/906c14ba38db9ecc9e8d",
    searched: [],
    books: [],
  },
  methods: {
    getData() {
      fetch(this.url)
        .then(data => data.json())
        .then(myData => (app.books = myData.books));
    },
  },
  // computed está atento a cualquier cambio y ejecuta.
  computed: {
    filterBooks() {
      var searchedBooks = [];
      // si la variable searched esta vacia , devuelve books.
      if (this.searched == "") {
        return this.books;
      } else {
        // si no declaramos la longitud de books
        for (var i = 0; i < this.books.length; i++) {
          if (
            // si books es igual a titulo o a descripción, añadimos esa busqueda a la variable
            // searched (lo devolvemos en minúsculas)
            this.books[i].title
              .toLowerCase()
              .includes(this.searched.toLowerCase()) ||
            this.books[i].description
              .toLowerCase()
              .includes(this.searched.toLowerCase())
          ) {
            // si no hay resultados de busqueda mostramos 'noResult', si no, mostramos books
            document.getElementById("noResult").style.display = "none";
            searchedBooks.push(this.books[i]);
          } else if (searchedBooks.length === 0) {
            document.getElementById("noResult").style.display = "block";
          }
        }
        return searchedBooks;
      }
    },
  },

  created() {
    this.getData();
    document.getElementById("noResult").style.display = "none";
  },
});
