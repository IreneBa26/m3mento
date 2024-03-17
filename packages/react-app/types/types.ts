type Product = {
    createdAt: string;
    defaultPrice: {
      id: string;
      createdAt: string;
      updatedAt: string;
      billingScheme: string;
      currency: string;
      // Include other properties from defaultPrice here if needed
    };
    defaultPriceId: string;
    description: string;
    id: string;
    images: string[];
    isActive: boolean;
    metadata: null | { [key: string]: any }; // Adjust this based on the actual structure of metadata if it's not always null
    name: string;
    publicImages: string[];
    unitLabel: null | string; // Include the type if unitLabel can have a value other than null
    updatedAt: string;
    url: null | string; // Adjust this based on the actual usage of url
    visibility: number;
  };