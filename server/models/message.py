from dataclasses import dataclass
from datetime import datetime

@dataclass
class Message:
    author: str
    text: str
    sender: str
    created_at: datetime
    display_name: str | None = None
