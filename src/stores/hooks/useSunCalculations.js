import { useEffect } from "react";
import useInputStore from "../inputStore";
import useSunCalcStore from "../sunSalcStore";


export const useSunCalculations = () => {
    const { date, latitude, longitude } = useInputStore();
    const { calculateSunData } = useSunCalcStore();
    
    useEffect(() => {
        calculateSunData(date, latitude, longitude);
    }, [date, latitude, longitude]);

};