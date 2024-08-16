import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHeader
} from '@/components/ui/table';
import { data } from '@/dummy-data';
import TableGamesBody from './components/table-body';
import TableGamesHeader from './components/table-games-header';

export default function Home() {
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
                            <TableGamesBody games={data} />
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </div>
            </main>
        </>
    );
}
