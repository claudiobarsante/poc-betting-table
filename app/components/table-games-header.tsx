import { TableHead, TableRow } from '@/components/ui/table';
import { bookmakerMap } from '../bookmaker-map';

const TableGamesHeader = () => {
    return (
        <TableRow>
            <TableHead>Scheduled</TableHead>
            <TableHead>Best Odd</TableHead>
            {Object.entries(bookmakerMap).map((bookmaker) => (
                <TableHead key={bookmaker[0]}>{bookmaker[1]}</TableHead>
            ))}
        </TableRow>
    );
};

export default TableGamesHeader;
