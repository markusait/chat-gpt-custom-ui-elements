from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChatMessageSerializer
from .chat import chat_completion

@api_view(['POST'])
def chat_view(request):
    serializer = ChatMessageSerializer(data=request.data)
    if serializer.is_valid():
        message = serializer.validated_data['message']
        response_message = chat_completion(message)
        return Response({'response': response_message})
    return Response(serializer.errors, status=400)