# How to Transcode Videos

## Install ffmpeg via homebrew (http://brew.sh/)
```sh
brew install ffmpeg --with-libvorbis --with-theora --with-libvpx
```

## Convert videos.

The following is a sample snippet of code (replace interview-1.mp4 with your video):

```sh
for f in interview-1.mp4; do
   echo $f
   vid="${f%.*}"
   ffmpeg -i $f -acodec libvorbis -qscale:v 7 -aq 5 -ac 2 -qmax 25  -threads 4 ${vid}.ogg
   ffmpeg -i $f -acodec libvorbis -qscale:v 7 -aq 5 -ac 2 -qmax 25  -threads 4 ${vid}.webm 
done
```
