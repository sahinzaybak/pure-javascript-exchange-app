// İlanları listeler -> async await ile category listesini çektik.
const getProducts = async () => {
    try{
        let response = await fetch('https://takas-ec767.firebaseio.com/adverts.json')
        const products= await response.json(); // -> Direk objeyi verir bize.
        return products;
    }
    catch{console.log("API'den veri çekerken bir hata oluştu")}

}
