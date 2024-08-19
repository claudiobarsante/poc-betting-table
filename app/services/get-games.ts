import { data } from '@/dummy-data';
import { Game } from '../components/table-body';

type GetGamesReponse = Game;

type GetGamesParams = {
    apiKey: string;
    regions: 'us' | 'us2' | 'uk' | 'au' | 'eu';
    markets:
        | 'h2h'
        | 'spreads'
        | 'totals'
        | 'outrights'
        | 'h2h_lay'
        | 'outrights_lay';
    dateFormat: 'iso' | 'unix';
    oddsFormat: 'american' | 'decimal';
    commenceTimeFrom: string;
    commenceTimeTo: string;
};
export async function getGames({
    apiKey,
    regions,
    markets,
    dateFormat,
    oddsFormat,
    commenceTimeFrom,
    commenceTimeTo
}: GetGamesParams): Promise<GetGamesReponse[]> {
    //? the response is working, but is commented to not consume credits of the odds-api
    //     const response = await api.get<GetGamesReponse[]>('', {
    //         params: {
    //             apiKey,
    //             regions,
    //             markets,
    //             dateFormat,
    //             oddsFormat,
    //             commenceTimeFrom,
    //             commenceTimeTo
    //         }
    //     });

    //     return response.data;

    return data;
}
