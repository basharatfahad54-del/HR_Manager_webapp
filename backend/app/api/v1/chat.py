from fastapi import APIRouter, Depends
from ...services.ai_chat import chat_ai
from ...schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    response = chat_ai(request.message)
    return ChatResponse(response=response)
