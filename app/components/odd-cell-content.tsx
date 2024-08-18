import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import classnames from 'classnames';
import { PiMedalFill } from 'react-icons/pi';
import { TbClockHour3 } from 'react-icons/tb';
import { formatLastUpdate } from '../utils/date-helpers';
import { formatOdds } from '../utils/format-odds';

type Props = {
    price: number | undefined;
    maxPrice: number;
    lastUpdate: string | undefined;
};

const OddCellContent = ({ price, maxPrice, lastUpdate }: Props) => {
    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className={classnames('w-16 text-sm', {
                                'cursor-not-allowed opacity-50': !price
                            })}
                            disabled={!price}
                        >
                            {(price && formatOdds(price)) || 'N/A'}{' '}
                            {price === maxPrice && (
                                <PiMedalFill className="absolute right-1 top-1 text-green-500" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="flex items-center gap-1">
                            <TbClockHour3 />
                            <span className="text-xs">{` Last update: ${formatLastUpdate(lastUpdate!)}`}</span>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default OddCellContent;
