const args = process.argv.slice(2);
const method = args[0];
const path = args[1] || "";

// Funcion para pedirle uno o mas productos a la API
async function getProducts(id = "") {
  const url = `https://fakestoreapi.com/products/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(`Ocurrió un error: ${error}`);
  }
}

// Funcion para crear un nuevo producto
async function postProducts(title, price, category) {
  const url = 'https://fakestoreapi.com/products';
  const product = { title, price, category };
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log('Subiste el siguiente producto:', data);
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
}

// Funcion para eliminar un producto
async function deleteProduct(id = "") {
  const url = `https://fakestoreapi.com/products/${id}`;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    console.log('Eliminaste el siguiente producto:', data);
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
}

// Logica para el metodo GET
if (method === 'GET') {
  if (path === 'products') {
    getProducts();
  } else if (path.startsWith('products/')) {
    const id = path.split('/')[1];
    if (id) {
      getProducts(id);
    } else {
      console.log("Error: Tenes que proporcionar un ID");
    }
  }
}

// Logica para el metodo POST
if (method === 'POST') {
  if (args[2] && args[3] && args[4]) {
    const title = args[2];
    const price = args[3]
    const category = args[4];
    postProducts(title, price, category);
  } else {
    console.error('Para hacer uso del metodo POST tenes que proporcionar un titulo, un precio, y una categoria.')
  }
}

// Logica para el metodo DELETE
if (method === 'DELETE') {
  if (path.startsWith('products/')) {
    const id = path.split('/')[1];
    if (id) {
      deleteProduct(id);
    } else {
      console.log('No pasaste un id o el id proporcionado no es valido.')
    }
  } else {
    console.log('Para hacer uso del metodo DELETE tenes que proporcionar un id.');
  }
}