const unsplashApiUrl = 'https://api.unsplash.com/photos/random?client_id=cBnkZqXG2oiO2k25-sOFm99TsKpT7Mmuk6vpMjboCof4&count=1';

    function fetchAndChangeBackground(query = '') {
        const url = query ? https://api.unsplash.com/search/photos?query=${query}&client_id=AvroNTV4Zkt-Whc77t3ov8wtKoYTbh91ZLF2lTxfOfQ&per_page=1 : unsplashApiUrl;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let imageUrl;
                let title;

                if (query && data.results.length > 0) {
                    imageUrl = data.results[0].urls.full;
                    title = data.results[0].alt_description || 'Image';
                } else if (!query) {
                    imageUrl = data[0].urls.full;
                    title = data[0].alt_description || 'Random Image';
                } else {
                    throw new Error('No images found');
                }

                changeBackground(imageUrl, title);
            })
            .catch(error => {
                document.getElementById('error-message').textContent = 'Error fetching image: ' + error.message;
            });
    }

    function changeBackground(imageUrl, title) {
        document.body.style.backgroundImage = url('${imageUrl}');
        document.getElementById('image-title').textContent = title;
        document.getElementById('error-message').textContent = '';
    }

    function startAutomaticBackgroundChange() {
        fetchAndChangeBackground();
        setInterval(fetchAndChangeBackground, 6000); // Changes the background every minute
    }

    function handleSearch() {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
            fetchAndChangeBackground(query);
        } else {
            document.getElementById('error-message').textContent = 'Please enter a valid search term.';
        }
    }

    window.onload = startAutomaticBackgroundChange;