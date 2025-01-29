import Image, {StaticImageData} from "next/image";
import {CharacterStatusType} from "../../../assets/api/rick-and-morty-api";

export const Status = ({ src, alt = ''} : StatusProps) => {
    return <Image src={src} alt={alt} width={25} height={25}/>
};

type StatusProps = {
    // status: CharacterStatusType;
    src: StaticImageData
    alt?: string;
}