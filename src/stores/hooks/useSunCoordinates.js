import { useEffect} from "react";
import useSunCalcStore from "../sunSalcStore";
import useRenderStore from "../renderStore";

export const useSunCoordinates = () => {
    const { sunPosition } = useSunCalcStore();
    const { convertSunCoordinates } = useRenderStore();
    useEffect(() => {
        convertSunCoordinates(sunPosition);
    }, [sunPosition]);
}