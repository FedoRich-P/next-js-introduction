import {Card} from "../Card";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import aliveStatus from "public/statuses/alive.png";
import deadStatus from "public/statuses/dead.png";
import unknownStatus from "public/statuses/unknown.png";
import {CharacterType} from '../../../assets/api/rick-and-morty-api';
import {log} from "next/dist/server/typescript/utils";
import {Logger} from "sass";
import {Status} from "./Status";

const statusImages = {
    Alive: aliveStatus,
    Dead: deadStatus,
    unknown: unknownStatus,
};

type PropsType = {
    character: CharacterType;
};

export const CharacterCard = (props: PropsType) => {
    const {id, name, image, status} = props.character;

    const src = status === 'Alive' ? '/statuses/alive.png' : status === 'Dead' ? '/statuses/dead.png' : '/statuses/unknown.png';

    return (
        <Card name={name}>
            <Status src={statusImages[status]}/>
            <Image src={`/statuses/${status}.png`} alt={name} width={30} height={30}/>
            <Image src={src} width={30} height={30} alt={name}/>
            <Link href={`/characters/${id}`}>
                <ImageBlock src={image} alt={name} width={250} height={300} priority/>
            </Link>
        </Card>
    );
};

const ImageBlock = styled(Image)`
    object-fit: cover;
`;
