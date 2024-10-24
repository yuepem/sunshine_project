import { create } from 'zustand';
import moment from 'moment-timezone';


const useTimeStore = create((set, get) => ({
    currentTime: new Date(),
    intervalId: null,

    updateTime: () => set(() => ({
        currentTime: new Date()
    })),


    startUpdateTime: () => {
        const { updateTime, intervalId } = get()
        if (!intervalId) {
            const newIntervalId = setInterval(updateTime, 500)
            set({ intervalId: newIntervalId })
        }
    },

    stopUpdateTime: () => {
        const { intervalId } = get()
        if (intervalId) {
            clearInterval(intervalId)
            set({ intervalId: null })
        }
    },

    // this is a simple version for sun's data 
    // Format using Moment.js
    formatTime: (date, timeZone) => {
        if (!date) return "N/A";
        return moment(date).tz(timeZone).format('HH:mm:ss');
    },

    // this is a complicated version for current time
    formatTimeZone: (date, timeZone) => {
        if (!date) return "N/A";
        const momentDate = moment(date).tz(timeZone).format('dddd, DD MMMM YYYY');
        const momentTime = moment(date).tz(timeZone).format('HH:mm:ss');
        const momentZone = moment(date).tz(timeZone).format('z');
        const momentFullDate = moment(date).tz(timeZone).format('YYYY MM DD dddd hh:mm:ss A z');

        return {
            fullDate: momentFullDate,
            date: momentDate,
            time: momentTime,
            zone: momentZone
        }

    },
}))

export default useTimeStore;