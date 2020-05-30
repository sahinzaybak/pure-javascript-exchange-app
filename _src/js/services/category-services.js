// Kateogorileri listeler -> async await ile category listesini çektik.
const getCategory = async () => {
    try{
        const response = await fetch ('https://takas-ec767.firebaseio.com/categories.json');
        const category = await response.json(); // -> Direk objeyi verir bize.
        return category;
    }
    catch {console.log("API'den veri çekerken bir hata oluştu !")}
  
}
