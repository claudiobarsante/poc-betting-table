import { Button } from '@/components/ui/button';
import classnames from 'classnames';
import { PiMedalFill } from 'react-icons/pi';
import { formatOdds } from '../utils/format-odds';
type Props = {
    price: number | undefined;
    maxPrice: number;
    lastUpdate: string | undefined;
};

const OddCellContent = ({ price, maxPrice }: Props) => {
    return (
        <div className="relative">
            <Button
                variant="outline"
                className={classnames('w-16 text-xs', {
                    'cursor-not-allowed opacity-50': !price
                })}
                disabled={!price}
            >
                {(price && formatOdds(price)) || 'N/A'}{' '}
                {price === maxPrice && (
                    <PiMedalFill className="absolute right-1 top-1 text-green-500" />
                )}
            </Button>
        </div>
    );
};

export default OddCellContent;
