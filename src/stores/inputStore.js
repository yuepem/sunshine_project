import { create } from 'zustand'

const useInputStore = create((set, get) => ({
    date: new Date( ),
    latitude: 59.36769,
    longitude: 17.82157,
    address: 'Stockholm, Sweden',
    isLoading: false,
    error: null,
    
    setDate: (date) => set({ date }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
    setAddress: (address) => set({ address }),

    getAddress: () => {
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

     toDMS () {
        const { latitude, longitude } = get();
        let latDirection = latitude >= 0 ? 'N' : 'S';
        let lonDirection = longitude >= 0 ? 'E' : 'W';
      
        let latDegrees = Math.floor(Math.abs(latitude));
        let latMinutes = Math.floor((Math.abs(latitude) - latDegrees) * 60);
        let latSeconds = Math.round((((Math.abs(latitude) - latDegrees) * 60) - latMinutes) * 60);
      
        let lonDegrees = Math.floor(Math.abs(longitude));
        let lonMinutes = Math.floor((Math.abs(longitude) - lonDegrees) * 60);
        let lonSeconds = Math.round((((Math.abs(longitude) - lonDegrees)   
       * 60) - lonMinutes) * 60);
      
        let latDMS = `${latDegrees}° ${latMinutes}' ${latSeconds}" ${latDirection}`;
        let lonDMS = `${lonDegrees}° ${lonMinutes}' ${lonSeconds}" ${lonDirection}`;
      
        return { latitude: latDMS, longitude: lonDMS };
      }
      
}))

export default useInputStore;