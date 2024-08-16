import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { bookmakerMap } from '../bookmaker-map';
import { Game } from '../components/table-body';
import { formatOdds } from '../utils/format-odds';
import { getMaxOdds } from '../utils/get-max-odds';
import OddCellContent from './odd-cell-content';

type Props = {
    game: Game;
};

const TableBodyOddCells = ({ game }: Props) => {
    const { maxOddHomeTeam, maxOddAwayTeam, cells } = getMaxOdds(game);

    return (
        <>
            <TableCell key="best">
                <div className="flex flex-col items-start gap-2">
                    <div>
                        <Button variant="outline" className="w-24 text-xs">
                            <div className="flex flex-col items-center gap-1">
                                <p>{formatOdds(maxOddHomeTeam.price)}</p>
                                <p className="text-xs text-green-500">
                                    {bookmakerMap[maxOddHomeTeam.bookmakerKey]}
                                </p>
                            </div>
                        </Button>
                        {/* <span>{maxOddHomeTeam.bookmakerKey}</span> */}
                    </div>
                    <div>
                        <Button variant="outline" className="w-24 text-xs">
                            <div className="flex flex-col items-center gap-1">
                                <p>{formatOdds(maxOddAwayTeam.price)}</p>
                                <p className="text-xs text-green-500">
                                    {bookmakerMap[maxOddAwayTeam.bookmakerKey]}
                                </p>
                            </div>
                        </Button>
                        {/* <span>{maxOddAwayTeam.bookmakerKey}</span> */}
                    </div>
                </div>
            </TableCell>
            {cells.map((cell) => (
                <TableCell key={cell.bookmakerKey}>
                    <div className="flex flex-col items-start gap-3">
                        <OddCellContent
                            price={cell.homeTeamPrice}
                            maxPrice={maxOddHomeTeam.price}
                        />
                        <OddCellContent
                            price={cell.awayTeamPrice}
                            maxPrice={maxOddAwayTeam.price}
                        />
                    </div>
                </TableCell>
            ))}
        </>
    );
};

export default TableBodyOddCells;
