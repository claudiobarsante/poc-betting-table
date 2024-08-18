'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHeader
} from '@/components/ui/table';
import { data as dummy } from '@/dummy-data';
import { addWeeks } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TableGamesBody, { Game } from './components/table-body';
import TableGamesHeader from './components/table-games-header';
import {
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

        // fetch(url, {
        //     method: 'GET',
        //     cache: 'no-cache'
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        const data: Game[] = dummy;
        const schedules = new Set<string>();
        for (let i = 0; i < data.length; i++) {
            schedules.add(data[i].commence_time);
        }
        const schedulesArray = Array.from(schedules);
        setGamesSchedule(schedulesArray);
        setData(data);
        setCurrentGameDate(schedulesArray[0]);
        // })
        // .catch((error) => console.error('Error:', error))
        // .finally(() => setIsLoading(false));
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
            <div className="flex items-center justify-start gap-2">
                <figure>
                    <Image
                        src={`/images/ball.png`}
                        alt={`baseball ball`}
                        width={70}
                        height={70}
                    />
                </figure>
                <h1 className="text-2xl font-bold tracking-tight">Games Odd</h1>
            </div>
            <ScrollArea className="w-full rounded-md border p-4">
                <section>
                    <div>
                        <Table>
                            <TableCaption>
                                A list of your US bookmakers
                            </TableCaption>
                            <TableHeader>
                                <TableGamesHeader
                                    onSchedlueClick={handleFilterGameDate}
                                    currentGameDate={currentGameDate}
                                />
                            </TableHeader>

                            <TableBody>
                                {data.length > 0 && (
                                    <TableGamesBody games={filtered} />
                                )}
                            </TableBody>
                            <TableFooter></TableFooter>
                        </Table>
                    </div>
                </section>
            </ScrollArea>
        </>
    );
}
