// İlanları listeler -> async await ile category listesini çektik.
const getProducts = async () => {
    let products;
    try{
        let response = await fetch('https://takas-ec767.firebaseio.com/adverts.json')
        products= await response.json(); // -> Direk objeyi verir bize.
    }
    catch{console.log("API'den veri çekerken bir hata oluştu")}
    return products;
}
