import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { data } from '@/dummy-data';

const bookmakerMap: Record<string, string> = {
	betonlineag: 'BetOnline.ag ',
	betmgm: 'BetMGM',
	betrivers: 'BetRivers',
	betus: 'BetUS',
	bovada: 'Bovada',
	williamhill_us: 'Caesars',
	draftkings: 'DraftKings',
	fanduel: 'FanDuel',
	lowvig: 'LowVig.ag',
	mybookieag: 'MyBookie.ag',
	superbook: 'SuperBook',
	unibet_us: 'Unibet',
	wynnbet: 'WynnBET',
};

export default function Home() {
	return (
		<>
			<h1 className='text-3xl font-medium text-zinc-900 dark:text-zinc-100'>Table</h1>

			<main className='m-5'>
				<div className='border-zinc-200 rounded-lg border p-2'>
					<Table>
						<TableCaption>A list of your US bookmakers</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Scheduled</TableHead>
								{Object.entries(bookmakerMap).map(bookmaker => (
									<TableHead key={bookmaker[0]}>{bookmaker[1]}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map(game => (
								<TableRow key={game.id}>
									<TableCell>
										<div className='flex flex-col items-start'>
											<span>{game.home_team}</span>
											<span>{game.away_team}</span>
											<span>{game.commence_time}</span>
										</div>
									</TableCell>

									{Object.entries(bookmakerMap).map(([key, value]) => {
										const bookmaker = game.bookmakers.find(b => b.key === key);
										const h2hMarket = bookmaker?.markets.find(m => m.key === 'h2h');
										const homeTeam = h2hMarket?.outcomes.find(o => o.name === game.home_team);
										const awayTeam = h2hMarket?.outcomes.find(o => o.name === game.away_team);
										return (
											<TableCell key={key}>
												<div className='flex flex-col items-start'>
													<span>{bookmaker?.title}</span>
													<span>{homeTeam?.price || 'N/A'}</span>
													<span>{awayTeam?.price || 'N/A'}</span>
												</div>
											</TableCell>
										);
									})}
								</TableRow>
							))}
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
				</div>
			</main>
		</>
	);
}
