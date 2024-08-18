import { Button } from '@/components/ui/button';
import { TableHead, TableRow } from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { bookmakerMap } from '../bookmaker-map';
import { formatDayOfWeek } from '../utils/date-helpers';

type Props = {
    onSchedlueClick: (direction: 'previous' | 'next') => void;
    currentGameDate: string;
};
const TableGamesHeader = ({ onSchedlueClick, currentGameDate }: Props) => {
    return (
        <TableRow>
            <TableHead>
                <div className="flex items-center justify-start">
                    <p>Scheduled</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    variant="ghost"
                                    onClick={() => onSchedlueClick('previous')}
                                >
                                    <GrCaretPrevious />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <p className="text-gray-600">
                        {currentGameDate && formatDayOfWeek(currentGameDate)}
                    </p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                {' '}
                                <Button
                                    variant="ghost"
                                    onClick={() => onSchedlueClick('next')}
                                >
                                    <GrCaretNext />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </TableHead>
            <TableHead>Best Odd</TableHead>
            {Object.entries(bookmakerMap).map((bookmaker) => (
                <TableHead key={bookmaker[0]}>
                    {bookmaker[1].name ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <figure>
                                        <Link href={`${bookmaker[1].link}`}>
                                            <Image
                                                src={`/images/bookmaker/${bookmaker[1].image}`}
                                                alt={`${bookmaker[1].name}`}
                                                width={64}
                                                height={28}
                                            />
                                        </Link>
                                    </figure>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {bookmaker[1].name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        bookmaker[1].name
                    )}
                </TableHead>
            ))}
        </TableRow>
    );
};

export default TableGamesHeader;
