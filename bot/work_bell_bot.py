import os
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
WORK_BELL_WEBHOOK_URL = os.getenv("WORK_BELL_WEBHOOK_URL")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

def fetch_today_work():
    today = datetime.now(timezone.utc).date().isoformat()
    query = {
        "filter": {
            "and": [
                {
                    "property": "予定日",
                    "date": {
                        "equals": today
                    }
                },
                {
                    "property": "名前",
                    "title": {
                        "contains": "日々のワーク"
                    }
                }
            ]
        }
    }
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    res = requests.post(url, headers=HEADERS, json=query)
    res.raise_for_status()
    return res.json().get("results", [])

def format_work_message(results):
    if not results:
        return None
    messages = []
    for page in results:
        title = page["properties"]["名前"]["title"]
        name = title[0]["plain_text"] if title else "（タイトルなし）"
        messages.append(f"🔔 今日のワークは「{name}」です。\nワークが出来たら記録をとって、共有しよう！")
    return "\n\n".join(messages)

def post_to_discord(message):
    if not message:
        return
    payload = { "content": message }
    res = requests.post(WORK_BELL_WEBHOOK_URL, json=payload)
    res.raise_for_status()

def main():
    try:
        results = fetch_today_work()
        message = format_work_message(results)
        post_to_discord(message)
        print("✅ Discord（ワークの鐘）へ投稿しました")
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")

if __name__ == "__main__":
    main()
