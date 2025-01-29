import React from 'react';
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {ResponseType} from '../../assets/api/rick-and-morty-api'
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import s from './Characters.module.scss'
import {getLayout} from "../../components/Layout/BaseLayout";

export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters();

    return {
        props: {
            characters
        }
    }
}

const Characters = ({characters}: CharactersProps) => {
    return (
        <PageWrapper>
            <ul className={s.cards}>
                {characters.results && characters.results?.map((character) => (
                    <CharacterCard key={character.id} character={character}/>))
                }
            </ul>
        </PageWrapper>
    );
};
Characters.getLayout = getLayout;
export default Characters;

type CharactersProps = {
    characters: ResponseType<CharacterType>
}