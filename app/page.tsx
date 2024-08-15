import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { data } from '@/dummy-data';
import { bookmakerMap } from './bookmaker-map';
import TableGamesBody from './components/table-body';

export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Table
            </h1>

            <main className="m-5">
                <div className="p-2">
                    <Table>
                        <TableCaption>
                            A list of your US bookmakers
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Scheduled</TableHead>
                                <TableHead>Best Odd</TableHead>
                                {Object.entries(bookmakerMap).map(
                                    (bookmaker) => (
                                        <TableHead key={bookmaker[0]}>
                                            {bookmaker[1]}
                                        </TableHead>
                                    )
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableGamesBody games={data} />
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </div>
            </main>
        </>
    );
}
