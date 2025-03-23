import os
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

def fetch_today_schedule():
    today = datetime.now(timezone.utc).date().isoformat()
    query = {
        "filter": {
            "property": "予定日",
            "date": {
                "equals": today
            }
        }
    }
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    res = requests.post(url, headers=HEADERS, json=query)
    res.raise_for_status()
    results = res.json().get("results", [])
    return results

def format_schedule(results):
    if not results:
        return "📭 今日の予定はありません。"

    messages = ["📅 今日のワーク予定:"]
    for page in results:
        title = page["properties"]["名前"]["title"]
        name = title[0]["plain_text"] if title else "（タイトルなし）"
        messages.append(f"・{name}")
    return "\n".join(messages)

def post_to_discord(message):
    payload = {
        "content": message
    }
    res = requests.post(DISCORD_WEBHOOK_URL, json=payload)
    res.raise_for_status()

def main():
    try:
        results = fetch_today_schedule()
        message = format_schedule(results)
        post_to_discord(message)
        print("✅ Discordへ投稿しました")
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")

if __name__ == "__main__":
    main()
