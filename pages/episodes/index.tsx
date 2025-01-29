import React from 'react';
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";
import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {Card} from "../../components/Card/Card";
import s from './Episodes.module.scss'
import {getLayout} from "../../components/Layout/BaseLayout";
import Location from "../locations";

export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes();

    if(!episodes) return {notFound: true};
    return {
        props: {
            episodes
        }
    }
}

const Episodes = ({episodes}: EpisodesProps) => {
    return (
        <PageWrapper>
            <ul className={s.cards}>
                {episodes.results && episodes.results?.map((episode) => (
                    <Card key={episode.id} name={episode.name}>{episode.episode}</Card>
                ))}
            </ul>
        </PageWrapper>
    );
};

Episodes.getLayout = getLayout;
export default Episodes;

type EpisodesProps = {
    episodes: ResponseType<CharacterType>
}