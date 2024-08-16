import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import classnames from 'classnames';
import { PiMedalFill } from 'react-icons/pi';
import { bookmakerMap } from '../bookmaker-map';
import { Game } from '../components/table-body';
import { formatOdds } from '../utils/format-odds';
import { getMaxOdds } from '../utils/get-max-odds';

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
                        <div className="relative">
                            <Button
                                variant="outline"
                                className={classnames('w-16 text-xs', {
                                    'cursor-not-allowed opacity-50':
                                        !cell.homeTeamPrice
                                })}
                                disabled={!cell.homeTeamPrice}
                            >
                                {(cell.homeTeamPrice &&
                                    formatOdds(cell.homeTeamPrice)) ||
                                    'N/A'}
                            </Button>
                            {cell.homeTeamPrice === maxOddHomeTeam.price && (
                                <PiMedalFill className="absolute right-1 top-1 text-green-500" />
                            )}
                        </div>
                        <div className="relative">
                            <Button
                                variant="outline"
                                className={classnames('w-16 text-xs', {
                                    'cursor-not-allowed opacity-50':
                                        !cell.homeTeamPrice
                                })}
                                disabled={!cell.homeTeamPrice}
                            >
                                {(cell.awayTeamPrice &&
                                    formatOdds(cell.awayTeamPrice)) ||
                                    'N/A'}{' '}
                                {cell.awayTeamPrice ===
                                    maxOddAwayTeam.price && (
                                    <PiMedalFill className="absolute right-1 top-1 text-green-500" />
                                )}
                            </Button>
                            {/* <span>{cell.awayTeamPrice || 'N/A'}</span> */}
                        </div>
                    </div>
                </TableCell>
            ))}
        </>
    );
};

export default TableBodyOddCells;
