import React from 'react';
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {QueryClient} from "@tanstack/query-core";
import s from './Locations.module.scss'
import {Card} from "../../components/Card/Card";
import {getLayout} from "../../components/Layout/BaseLayout";;

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location/', {
        method: 'GET',
    }).then(res => res.json());
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    queryClient.fetchQuery(['locations'])

    const locations = await getLocations();

    return {
        props: {
            dehydrateState: dehydrate(queryClient)
        }
    };
}

const Location = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null;

    return (
        <PageWrapper>
            <ul className={s.cards}>
                {locations.results?.map((location) => (
                    <Card key={location.id} name={location.name}>{location.dimension}</Card>))
                }
            </ul>
        </PageWrapper>
    );
};
Location.getLayout = getLayout;
export default Location;

// type LocationProps = {
//     location: ResponseType<CharacterType>
// }