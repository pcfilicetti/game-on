// Geocoding===================================Geocoding===================================

[ { formattedAddress: 'New York, NY, USA',
    latitude: 40.7127753,
    longitude: -74.0059728,
    extra:
     { googlePlaceId: 'ChIJOwg_06VPwokRYv534QaPC8g',
       confidence: 0.5,
       premise: null,
       subpremise: null,
       neighborhood: 'New York',
       establishment: null },
    administrativeLevels: { level1long: 'New York', level1short: 'NY' },
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    provider: 'google' } ]

    console.log(geoResult[0].city, geoResult[0].administrativeLevels.level1long);


