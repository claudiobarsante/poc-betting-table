'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHeader
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
//import { data } from '@/dummy-data';
import { addWeeks } from 'date-fns';
import TableGamesBody from './components/table-body';
import TableGamesHeader from './components/table-games-header';
import { formatToISOWithoutMilliseconds } from './utils/format-to-iso-without-milliseconds';
export default function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const today = new Date();
        const todayISO = formatToISOWithoutMilliseconds(today);
        // Add one week to the current date
        const nextWeek = addWeeks(today, 1);
        const nextWeekISO = formatToISOWithoutMilliseconds(nextWeek);

        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_ENDPOINT}`);

        let params = new URLSearchParams(url.search);
        params.append('apiKey', `${process.env.NEXT_PUBLIC_ODDS_API_KEY}`);
        params.append('regions', 'us');
        params.append('markets', 'h2h');
        params.append('dateFormat', 'iso');
        params.append('oddsFormat', 'american');
        params.append('commenceTimeFrom', todayISO);
        params.append('commenceTimeTo', nextWeekISO);

        url.search = params.toString();

        setIsLoading(true);
        fetch(url, {
            method: 'GET',
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Games odds table
            </h1>

            <main className="m-5">
                <div className="p-2">
                    <Table>
                        <TableCaption>
                            A list of your US bookmakers
                        </TableCaption>
                        <TableHeader>
                            <TableGamesHeader />
                        </TableHeader>

                        <TableBody>
                            {data.length > 0 && <TableGamesBody games={data} />}
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </div>
            </main>
        </>
    );
}
