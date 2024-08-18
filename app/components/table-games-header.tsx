import { TableHead, TableRow } from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { bookmakerMap } from '../bookmaker-map';
const TableGamesHeader = () => {
    return (
        <TableRow>
            <TableHead>Scheduled</TableHead>
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
