'use client';

import { ProdutoCarousel } from "./ProdutoCarousel";

type ProdutoDestaqueProps = {
    title: string;
}

export const ProdutoDestaque = ({ title }: ProdutoDestaqueProps) => {

    return (
        <>
            <h2 className="font-bold font text-4xl m-[20px] text-center" data-testid="destaque-title">{title}</h2>
            <ProdutoCarousel destaque={true} />
        </>
    );
};