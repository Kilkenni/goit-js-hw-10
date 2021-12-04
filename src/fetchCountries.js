export function fetchCountries(name) {
    const params = new URLSearchParams({
        fields: "name,capital,population,flags,languages",
    }); //todo: fix name, flags

    if (name !== "") {
        return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            });
    }
    else {
        return {};
    }
};