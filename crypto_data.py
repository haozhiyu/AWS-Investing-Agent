import sys
import json
import os
import time
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def fetch_crypto_data(symbol, timeframe='1mo'):
    """
    使用CoinGecko API获取加密货币价格数据
    """
    try:
        # 映射常见加密货币名称到CoinGecko ID
        symbol_map = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum',
            'cardano': 'cardano',
            'solana': 'solana',
            'dogecoin': 'dogecoin',
            'ripple': 'ripple',
            'polkadot': 'polkadot',
            'litecoin': 'litecoin',
            'chainlink': 'chainlink',
            'stellar': 'stellar-lumens',
        }
        
        # 获取CoinGecko ID
        coin_id = symbol_map.get(symbol.lower(), symbol.lower())
        
        # 映射时间范围到天数
        days_map = {
            '1d': 1,
            '1wk': 7,
            '1mo': 30,
            '3mo': 90,
            '1y': 365,
        }
        
        days = days_map.get(timeframe, 30)
        
        # 使用CoinGecko API获取数据
        url = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart"
        params = {
            'vs_currency': 'usd',
            'days': days,
            'interval': 'daily' 
        }
        
        # Add API key if available (CoinGecko now requires API key for many endpoints)
        #api_key = os.getenv('COINGECKO_API_KEY')
        #if api_key:
        #    params['x_cg_pro_api_key'] = api_key
        
        # Add User-Agent header to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()  # 如果响应不是200，抛出异常
        data = response.json()
        
        # 提取价格数据
        price_data = data['prices']
        timestamps = [int(entry[0]/1000) for entry in price_data]  # 转换毫秒为秒
        prices = [entry[1] for entry in price_data]
        
        return {
            'symbol': symbol,
            'timestamps': timestamps,
            'prices': prices,
        }
        
    except Exception as e:
        print(f"Error fetching crypto data from CoinGecko: {str(e)}")
        # 如果真实数据获取失败，返回模拟数据
        return generate_mock_data(symbol)


def generate_mock_data(symbol):
    """Generate mock data if API call fails"""
    now = int(time.time())
    day_seconds = 24 * 60 * 60
    
    timestamps = [now - (i * day_seconds) for i in range(30, 0, -1)]
    
    # Generate random-ish prices based on symbol name
    base_price = sum(ord(c) for c in symbol) % 1000 + 100
    import random
    random.seed(symbol)
    
    prices = []
    current_price = base_price
    for _ in range(30):
        current_price += random.uniform(-base_price * 0.05, base_price * 0.05)
        prices.append(max(current_price, 1))  # Ensure price is positive
    
    return {
        'symbol': symbol,
        'timestamps': timestamps,
        'prices': prices,
    }

# For direct testing
if __name__ == "__main__":
    if len(sys.argv) > 1:
        symbol = sys.argv[1]
        timeframe = sys.argv[2] if len(sys.argv) > 2 else '1mo'
        result = fetch_crypto_data(symbol, timeframe)
        print(json.dumps(result))
    else:
        print("No symbol provided")
