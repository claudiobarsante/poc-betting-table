'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHeader
} from '@/components/ui/table';
import { addWeeks } from 'date-fns';
import { useEffect, useState } from 'react';
import TableGamesBody, { Game } from './components/table-body';
import TableGamesHeader from './components/table-games-header';
import {
    formatDayOfWeek,
    formatToISOWithoutMilliseconds,
    getDateFromISODate
} from './utils/date-helpers';
export default function Home() {
    const [data, setData] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [gamesSchedule, setGamesSchedule] = useState<string[]>([]);
    const [currentGameDate, setCurrentGameDate] = useState<string>('');

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
                //const data: Game[] = dummy;
                const schedules = new Set<string>();
                for (let i = 0; i < data.length; i++) {
                    schedules.add(data[i].commence_time);
                }
                const schedulesArray = Array.from(schedules);
                setGamesSchedule(schedulesArray);
                setData(data);
                setCurrentGameDate(schedulesArray[0]);
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleFilterGameDate = (direction: 'previous' | 'next') => {
        console.log('handleFilterGameDate', currentGameDate);
        console.log('====>', gamesSchedule);
        const totalGames = gamesSchedule.length;
        const currentIndex = gamesSchedule.indexOf(currentGameDate);
        // -- edge case: if current game date is the first or last, do nothing
        if (direction === 'previous' && currentIndex - 1 < 0) return;
        if (direction === 'next' && currentIndex + 1 >= totalGames) return;

        const newIndex =
            direction === 'previous' ? currentIndex - 1 : currentIndex + 1;
        console.log('====', gamesSchedule[newIndex]);

        setCurrentGameDate(gamesSchedule[newIndex]);
    };
    const filtered = data.filter(
        (game) =>
            getDateFromISODate(game.commence_time) ===
            getDateFromISODate(currentGameDate)
    );
    return (
        <>
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Games odds table
            </h1>
            <div className="flex items-center gap-20">
                <Button onClick={() => handleFilterGameDate('previous')}>
                    Previous
                </Button>
                <p>{currentGameDate && formatDayOfWeek(currentGameDate)}</p>
                <Button onClick={() => handleFilterGameDate('next')}>
                    Next
                </Button>
            </div>

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
                            {data.length > 0 && (
                                <TableGamesBody games={filtered} />
                            )}
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </div>
            </main>
        </>
    );
}
