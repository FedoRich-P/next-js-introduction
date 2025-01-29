import {CharacterType} from "../../../assets/api/rick-and-morty-api";
import {getLayout} from "../../../components/Layout/BaseLayout";
import {CharacterCard} from "../../../components/Card/CharacterCard/CharacterCard";
import {PageWrapper} from "../../../components/PageWrapper/PageWrapper";
import {API} from "../../../assets/api/api";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () =>{
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map((character) => ({
        params: {id: character.id.toString()},
    }) )

    return {
        paths,
        fallback: true
        // Если страница ещё не сгенерирована, она будет создана на сервере при первом запросе.
        // fallback: 'blocking',
        // Если страницы нет (например, её нет в paths), Next.js вернёт 404.
        // fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string);

    if (!character) return {notFound: true};
    return {
        props: {character}
    }
}

const Character = ({character}: CharacterProps) => {
    const router = useRouter();
    if(router.isFallback) return <h1>Loading ...</h1>

    const characterId = router.query.id;

    const goToCharacters = () => router.push(`/characters`);

    const goToMainPage = () =>  router.push(`/`);

    return (
        <PageWrapper>
            <Button onClick={goToCharacters}>To Characters</Button>
            <Button onClick={goToMainPage}>To main page</Button>
            <IdText>Id: {characterId}</IdText>
            <CharacterCard character={character}/>
        </PageWrapper>
    );
};
Character.getLayout = getLayout;
export default Character;

type CharacterProps = {
    character: CharacterType
}

const IdText = styled.h2`
    font-size: 40px;
`

const Button  = styled.button`
    width: 330px;
    height: 60px;
    border-radius: 4px;
    border: 2px solid brown;
    text-transform: uppercase;
    font-weight: bold;
    background-color: transparent ;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(.95);
    }
`