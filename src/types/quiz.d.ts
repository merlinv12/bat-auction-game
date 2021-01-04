interface RootObject {
    listings: Listing[];
}

interface Listing {
    title: string;
    price: number;
    date: string;
    listingImages: ListingImages;
    listingLocation: ListingLocation;
    additionalInfo: string[];
    id: number;
    listingUrl: string;
}

interface ListingLocation {
    city: string;
    zip: number;
}

interface ListingImages {
    main: string;
    extra: string[];
}

interface Rounds {
    current: number;
    total: number;
}