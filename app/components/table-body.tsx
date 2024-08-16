import { TableCell, TableRow } from '@/components/ui/table';
import { FaBaseball, FaBaseballBatBall } from 'react-icons/fa6';
import { MdOutlineStadium } from 'react-icons/md';
import TableBodyOddCells from './table-body-odd-cells';

export type Game = {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: {
        key: string;
        title: string;
        last_update: string;
        markets: {
            key: string;
            last_update: string;
            outcomes: {
                name: string;
                price: number;
            }[];
        }[];
    }[];
};

type Props = {
    games: Game[];
};

const TableGamesBody = ({ games }: Props) => {
    return (
        <>
            {games.map((game) => (
                <TableRow key={game.id}>
                    <TableCell>
                        <>
                            <div className="flex flex-col items-center justify-center border border-red-400">
                                <div className="flex items-center gap-3">
                                    <FaBaseballBatBall className="text-blue-600" />
                                    <span>{game.home_team}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaBaseball className="text-green-600" />{' '}
                                    <span>{game.away_team}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>{game.commence_time}</span>
                                <MdOutlineStadium />
                            </div>
                        </>
                    </TableCell>
                    <TableBodyOddCells game={game} />
                </TableRow>
            ))}
        </>
    );
};

export default TableGamesBody;
