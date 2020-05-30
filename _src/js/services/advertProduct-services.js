const getAdvertProducts = async () => {
    try{
        const response = await fetch('https://takas-ec767.firebaseio.com/advertProduct.json');
        const data = await response.json();
        return data;
    }
    catch{console.log("API'den veri çekilirken bir hata oluştu.")}
}

