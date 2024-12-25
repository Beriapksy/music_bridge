import os
from yt_dlp import YoutubeDL
from pydub import AudioSegment
import sys

AudioSegment.converter = r"C:\\Users\\PC\\Downloads\\ffmpeg-2024-12-19-git-494c961379-essentials_build\\ffmpeg-2024-12-19-git-494c961379-essentials_build\\bin"

def download_youtube_music_playlist(playlist_url, output_path='C:\\Masaüstü\\müziky'):
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'ffmpeg_location': r'C:\Users\PC\Downloads\ffmpeg-2024-12-19-git-494c961379-essentials_build\ffmpeg-2024-12-19-git-494c961379-essentials_build\bin',
        'quiet': False,
        'no_warnings': True
    }

    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([playlist_url])

if __name__ == "__main__":
    playlist_url = sys.argv[1]  # Playlist URL'sini komut satırından alır
    download_youtube_music_playlist(playlist_url)
    print("Playlist başarıyla indirildi.")
