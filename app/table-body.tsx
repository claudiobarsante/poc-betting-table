import { TableCell, TableRow } from '@/components/ui/table';
import { bookmakerMap } from './bookmaker-map';

type Game = {
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

type MaxOdd = {
    bookmakerKey: string;
    price: number;
};

type CellOdd = {
    bookmakerKey: string;
    homeTeamPrice: number | undefined;
    awayTeamPrice: number | undefined;
    homeTeamPricePosition: 'equal' | 'lower' | 'initial';
    awayTeamPricePosition: 'equal' | 'lower' | 'initial';
};
const TableGamesBody = ({ games }: Props) => {
    function mountOddCell(game: Game) {
        const cells: CellOdd[] = [];

        let maxOddHomeTeam: MaxOdd = {
            bookmakerKey: '',
            price: -Infinity
        };
        let maxOddAwayTeam: MaxOdd = {
            bookmakerKey: '',
            price: -Infinity
        };

        Object.entries(bookmakerMap).map(([key, value]) => {
            const bookmaker = game.bookmakers.find((b) => b.key === key);
            const h2hMarket = bookmaker?.markets.find((m) => m.key === 'h2h');
            const homeTeam = h2hMarket?.outcomes.find(
                (o) => o.name === game.home_team
            );
            const awayTeam = h2hMarket?.outcomes.find(
                (o) => o.name === game.away_team
            );
            // -- check for max odds
            const homeTeamPrice = homeTeam?.price;
            if (homeTeamPrice && homeTeamPrice > maxOddHomeTeam.price) {
                maxOddHomeTeam = {
                    bookmakerKey: key,
                    price: homeTeamPrice
                };
            }

            const awayTeamPrice = awayTeam?.price;
            if (awayTeamPrice && awayTeamPrice > maxOddAwayTeam.price) {
                maxOddAwayTeam = {
                    bookmakerKey: key,
                    price: awayTeamPrice
                };
            }

            cells.push({
                bookmakerKey: key,
                homeTeamPrice,
                awayTeamPrice,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial'
            });
        });

        return (
            <>
                <TableCell key="best">
                    <div className="flex flex-col items-start">
                        <div>
                            <span>{maxOddHomeTeam.bookmakerKey}</span>
                            <span>{maxOddHomeTeam.price}</span>
                        </div>
                        <div>
                            <span>{maxOddAwayTeam.bookmakerKey}</span>
                            <span>{maxOddAwayTeam.price}</span>
                        </div>
                    </div>
                </TableCell>
                {cells.map((cell) => (
                    <TableCell key={cell.bookmakerKey}>
                        <div className="flex flex-col items-start">
                            <div>
                                <span>{cell.homeTeamPrice || 'N/A'}</span>
                            </div>
                            <div>
                                <span>{cell.awayTeamPrice || 'N/A'}</span>
                            </div>
                        </div>
                    </TableCell>
                ))}
            </>
        );
    }

    return (
        <>
            {games.map((game) => (
                <TableRow key={game.id}>
                    <TableCell>
                        <div className="flex flex-col items-start">
                            <span>{game.home_team}</span>
                            <span>{game.away_team}</span>
                            <span>{game.commence_time}</span>
                        </div>
                    </TableCell>
                    {mountOddCell(game)}
                </TableRow>
            ))}
        </>
    );
};

export default TableGamesBody;
