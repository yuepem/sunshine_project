import { create } from 'zustand'

const useInputStore = create((set, get) => ({
    date: new Date(),
    latitude: 59.36769,
    longitude: 17.82157,
    address: 'Stockholm, Sweden',
    isLoading: false,
    error: null,

    setDate: (date) => set({ date }),

    setLocation: (latitude, longitude) => {
        set({ latitude, longitude });
        get().fetchAddress();
    },

    resetToDefaults: () => {
        set({
            date: new Date(),
            latitude: 59.36769,
            longitude: 17.82157,
            address: 'Stockholm, Sweden',
        });
        
    },

    setAddress: (address) => set({ address }),

    setIsLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    fetchAddress: async () => {
        const { latitude, longitude, setAddress, setIsLoading, setError } = get();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            const { city, town, village, state, country, postcode, road, house_number } = data.address;
            const locality = city || town || village || '';
            const simplifiedAddress = [road, house_number, postcode, locality, state, country]
                .filter(Boolean)
                .join(', ');

            setAddress(simplifiedAddress);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    },
}))

export default useInputStore