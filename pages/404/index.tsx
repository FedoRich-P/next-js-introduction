import React from 'react';
import {getLayout} from "../../components/Layout/BaseLayout";
import Link from "next/link";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import s from './Error.module.scss'

const ErrorPage = () => {
    return (
        <PageWrapper>
            <h1>Error page 404</h1>
            <Link href="/" className={s.button}> Back </Link>
        </PageWrapper>
    );
};

ErrorPage.getLayout = getLayout;
export default ErrorPage;