import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
	const URL =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

	const [coins, setCoins] = useState([]);
	const [serch, setSerch] = useState('');

	useEffect(() => {
		axios
			.get(URL)
			.then((res) => {
				setCoins(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleCange = (e) => {
		setSerch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(serch.toLocaleLowerCase())
	);

	return (
		<div className="coin-app">
			<div className="coin-search">
				<h1 className="coin-text">Busca tu Crypto</h1>
				<form>
					<input
						type="text"
						className="coin-input"
						placeholder="Busca la tuya Miliooooo"
						onChange={handleCange}
					/>
				</form>
				{filteredCoins.map((coin) => {
					return (
						<Coin
							key={coin.id}
							name={coin.name}
							image={coin.image}
							symbol={coin.symbol}
							marketcap={coin.market_cap}
							price={coin.current_price}
							priceChange={coin.price_change_percentage_24h}
							volume={coin.total_volume}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
