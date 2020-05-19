// Kateogorileri listeler -> async await ile category listesini çektik.
const getCategory = async () => {
    let category;
    try{
        const response = await fetch ('https://takas-ec767.firebaseio.com/categories.json');
        category = await response.json(); // -> Direk objeyi verir bize.
    }
    catch {console.log("API'den veri çekerken bir hata oluştu !")}
    return category;
}
