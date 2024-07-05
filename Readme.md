Link Utama https://sanber-be-57-final-project-acep-production.up.railway.app

1. Register
   link https://sanber-be-57-final-project-acep-production.up.railway.app/api/auth/register
   {
   "fullName":"kicep tn",
   "username":"kicept",
   "email":"aceptaufik07@gmail.com",
   "password":"12341234"
   }

2. Login
   link https://sanber-be-57-final-project-acep-production.up.railway.app/api/auth/login
   {
   "email":"aceptaufik07@gmail.com",
   "password":"12341234"
   }

3. order barang
   link https://sanber-be-57-final-project-acep-production.up.railway.app/api/orders
   untuk order barang tinggal memasukan nama barag yang sudah ada di product
   untuk Grand Total sudah automatis terhitung
   {
   "orderItems": [
   {
   "name": "Kemeja Variant 2",
   "quantity": 5
   }
   ]
   }
4. Untuk fitur Get menampilkan order hanya menggunakan
   link https://sanber-be-57-final-project-acep-production.up.railway.app/api/orders dengan method GET
