interface RootObject {
    listings: Listing[];
}

interface Listing {
    title: string;
    price: number;
    date: string;
    images: ListingImages;
    location: ListingLocation;
    additionalInfo: string[];
    _id: string;
    order: number;
    url: string;
}

interface ListingLocation {
    city: string;
    state: string;
    zip: string;
}

interface ListingImages {
    main: string;
    extra: string[];
}

interface Rounds {
    current: number;
    total: number;
}

interface UserGuess {
    _id: string;
    guessValue: number;
}