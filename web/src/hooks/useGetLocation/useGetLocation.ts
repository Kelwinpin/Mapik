import { useEffect, useState } from "react";

const defaultCors = [-23.55052, -46.633308]

export default function useGetLocation(){
    const [coords, setCoords] = useState<number[] | null>(null);

    useEffect(()=>{

        function onSucess(pos: GeolocationPosition){ 
            setCoords([pos.coords.latitude, pos.coords.longitude])
          }
        function onError(){
            console.error("error on get location")
          }

        try {
          
          navigator.geolocation.getCurrentPosition(onSucess, onError);

        } catch (error) {
          setCoords(defaultCors)
        }
    },[])

    return{coords}
}