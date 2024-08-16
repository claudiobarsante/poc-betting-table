import { Button } from '@/components/ui/button';
import { formatOdds } from '../utils/format-odds';

type Props = {
    maxPrice: number;
    bookmakerTitle: string;
};
const BestOddCellContent = ({ maxPrice, bookmakerTitle }: Props) => {
    return (
        <div>
            <Button variant="outline" className="w-24 text-xs">
                <div className="flex flex-col items-center gap-1">
                    <p>{formatOdds(maxPrice)}</p>
                    <p className="text-xs text-green-500">{bookmakerTitle}</p>
                </div>
            </Button>
        </div>
    );
};

export default BestOddCellContent;
